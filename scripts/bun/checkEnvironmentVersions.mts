#!/usr/bin/env bun

/**
 * @file Shell script to check that all project environment binary versions match the expected values.
 */

// External Imports
import { file, nanoseconds, semver, version as bunVersion } from 'bun';
import { readdir } from 'node:fs/promises';

// Internal Imports
import { findMissingPaths } from '../../src/filesystemUtils.mts';
import { getPerformanceLabel, printError, printSuccess } from '../../src/consoleUtils.mts';

// Type Imports
import type { PackageJson } from 'type-fest';

// Local Variables
const filePaths = {
  githubWorkflowsDirectory: './.github/workflows/',
  packageJson: './package.json',
} as const;
const packageJson = JSON.parse(await file('./package.json').text()) as PackageJson;

// Local Types
interface EnvironmentVersions {
  [key: string]: string | Record<string, unknown>;
  bun: {
    engineVersion: string;
    githubVersion: string;
  };
  packageManager: string;
}

// Local Functions
/**
 * Recursively deep sort the keys of an object.
 * @param targetValue The value to deep sort.
 * @returns           The deep-sorted object.
 */
function buildObjectDeepSorted<T extends object>(targetValue: T): T {
  const newObject = {} as T;
  for (const key of Object.keys(targetValue).sort((a, b) => a.localeCompare(b, 'en'))) {
    const keyWithCast = key as keyof T;
    const value = targetValue[keyWithCast];
    const isObjectLiteral = typeof value === 'object' && value !== null && !Array.isArray(value);
    newObject[keyWithCast] = isObjectLiteral ? (buildObjectDeepSorted(value) as T[keyof T]) : value;
  }
  return newObject;
}

/**
 * Get the list of all Bun binary versions mentioned in GitHub Actions workflow files.
 * @param workflowsDirectory The directory where GitHub Actions workflow files are stored.
 * @returns                  An array containing all Bun binary versions mentioned in GitHub Actions
 *                           workflow files.
 */
async function getGitHubWorkflowBunVersions(workflowsDirectory: string) {
  const bunVersionRegex = /\bbun-version:\s*"([^"]+)"/;
  const workflowVersions = new Set();
  const workflowFileNames = await readdir(workflowsDirectory);
  await Promise.all(
    workflowFileNames.map((fileName) =>
      file(`${workflowsDirectory}/${fileName}`)
        .text()
        .then((workflowContents) => {
          const match = workflowContents.match(bunVersionRegex);
          const version = match?.[1] ?? 'FORMAT_ERROR';
          workflowVersions.add(version);
        }),
    ),
  );
  return [...workflowVersions];
}

/**
 * Build the actual and expected environment version objects.
 * @returns An object containing the actual and expected environment version objects.
 */
async function buildEnvironmentVersionObjects() {
  // Build the output
  const bunVersionExpected = packageJson?.engines?.bun ?? 'ERROR';
  const packageManagerVersionExpected = packageJson?.packageManager ?? 'ERROR';
  const githubBunVersions = await getGitHubWorkflowBunVersions(filePaths.githubWorkflowsDirectory);
  const actualVersions = buildObjectDeepSorted({
    bun: {
      engineVersion: bunVersion,
      githubVersion: githubBunVersions.join(', '),
    },
    packageManager: `bun@${bunVersion}`,
  }) satisfies EnvironmentVersions;
  const expectedVersions = buildObjectDeepSorted({
    bun: {
      engineVersion: bunVersionExpected,
      githubVersion: bunVersionExpected,
    },
    packageManager: packageManagerVersionExpected,
  }) satisfies EnvironmentVersions;
  return { actualVersions, expectedVersions };
}

/**
 * Determine if the actual and expected binary versions match.
 * @param actualVersions   Object describing actual binary versions found in the project environment.
 * @param expectedVersions Object describing expected binary versions found in the project environment.
 * @returns                Boolean representing whether or not all actual and expected versions match.
 */
function hasMatchingVersions(
  actualVersions: EnvironmentVersions,
  expectedVersions: EnvironmentVersions,
) {
  return Object.keys(actualVersions).every((key) => {
    switch (key) {
      case 'bun':
        return (
          semver.satisfies(actualVersions.bun.engineVersion, expectedVersions.bun.engineVersion) &&
          semver.satisfies(actualVersions.bun.githubVersion, expectedVersions.bun.githubVersion)
        );

      default:
        return actualVersions[key] === expectedVersions[key];
    }
  });
}

/**
 * Script entrypoint.
 */
async function main() {
  const startTime = nanoseconds();

  // Check that all expected files exist
  const missingPaths = await findMissingPaths(Object.values(filePaths));
  if (missingPaths.length > 0) {
    process.exitCode = 1;
    printError(
      `The following paths don't exist:\n\t- ${missingPaths.join('\n\t- ')} ${getPerformanceLabel(startTime)}`,
    );
    return;
  }

  // Check that all expected environment versions match the actual versions
  const { actualVersions, expectedVersions } = await buildEnvironmentVersionObjects();
  if (!hasMatchingVersions(actualVersions, expectedVersions)) {
    process.exitCode = 1;
    printError(
      'One or more environment version mismatches occurred:\n' +
        `ACTUAL:   ${JSON.stringify(actualVersions, undefined, 2)}\n` +
        `EXPECTED: ${JSON.stringify(expectedVersions, undefined, 2)} ${getPerformanceLabel(startTime)}`,
    );
    return;
  }

  // Success!!!
  printSuccess(`Environment versions valid ${getPerformanceLabel(startTime)}`);
}

// BEGIN EXECUTION
await main();
