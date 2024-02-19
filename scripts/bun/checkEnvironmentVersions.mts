#!/usr/bin/env bun

// External Imports
import { access, readdir } from 'node:fs/promises';
import fs, { readFileSync } from 'node:fs';

// Internal Imports
import { getPerformanceLabel, printError, printSuccess } from '../../utils/consoleUtils.mts';

// Type Imports
import type { PackageJson } from 'type-fest';

// Local Variables
const filePaths = {
  githubWorkflowsDirectory: './.github/workflows/',
  packageJson: './package.json',
} as const;
const packageJson = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' })) as PackageJson;

// Local Types
interface EnvironmentVersions {
  [key: string]: string | Record<string, unknown>;
  bun: {
    engineVersion: string;
    githubVersion: string;
  };
  packageManager: string;
}

interface VersionContainer {
  actualVersions: EnvironmentVersions;
  expectedVersions: EnvironmentVersions;
}

// Local Functions
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

async function findMissingPaths() {
  const targetFilesPromises = Object.values(filePaths).map((filePath) =>
    access(filePath, fs.constants.R_OK),
  );
  const missingPaths: string[] = [];
  for (const promiseMetadata of await Promise.allSettled(targetFilesPromises)) {
    if (promiseMetadata.status === 'rejected') {
      missingPaths.push((promiseMetadata.reason as Record<string, string>).path!);
    }
  }
  return missingPaths;
}

function hasMatchingVersions({ actualVersions, expectedVersions }: VersionContainer) {
  return Object.keys(actualVersions).every((key) => {
    switch (key) {
      case 'bun':
        return (
          Bun.semver.satisfies(
            actualVersions.bun.engineVersion,
            expectedVersions.bun.engineVersion,
          ) &&
          Bun.semver.satisfies(actualVersions.bun.githubVersion, expectedVersions.bun.githubVersion)
        );

      default:
        return actualVersions[key] === expectedVersions[key];
    }
  });
}

async function getGitHubWorkflowBunVersions(workflowsDirectory: string) {
  const bunVersionRegex = /\bbun-version:\s*"([^"]+)"/;
  const workflowVersions = new Set();
  const workflowFileNames = await readdir(workflowsDirectory);
  await Promise.all(
    workflowFileNames.map((fileName) =>
      Bun.file(`${workflowsDirectory}/${fileName}`)
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

async function getEnvironmentVersions() {
  // Build the output
  const bunVersionExpected = packageJson?.engines?.bun ?? 'ERROR';
  const packageManagerVersionExpected = packageJson?.packageManager ?? 'ERROR';
  const githubBunVersions = await getGitHubWorkflowBunVersions(filePaths.githubWorkflowsDirectory);
  const actualVersions = buildObjectDeepSorted({
    bun: {
      engineVersion: Bun.version,
      githubVersion: githubBunVersions.join(', '),
    },
    packageManager: `bun@${Bun.version}`,
  });
  const expectedVersions = buildObjectDeepSorted({
    bun: {
      engineVersion: bunVersionExpected,
      githubVersion: bunVersionExpected,
    },
    packageManager: packageManagerVersionExpected,
  });
  return { actualVersions, expectedVersions } as VersionContainer;
}

async function main() {
  const startTime = Bun.nanoseconds();

  // Check that all expected files exist
  const missingPaths = await findMissingPaths();
  if (missingPaths.length > 0) {
    process.exitCode = 1;
    printError(`The following paths don't exist:\n\t- ${missingPaths.join('\n\t- ')}`);
    return;
  }

  // Check that all expected environment versions match the actual versions
  const environmentVersions = await getEnvironmentVersions();
  if (!hasMatchingVersions(environmentVersions)) {
    process.exitCode = 1;
    printError(
      'One or more environment version mismatches occurred:\n' +
        `ACTUAL:   ${JSON.stringify(environmentVersions.actualVersions, undefined, 2)}\n` +
        `EXPECTED: ${JSON.stringify(environmentVersions.expectedVersions, undefined, 2)}`,
    );
    return;
  }
  const performanceLabel = getPerformanceLabel(startTime);

  // Success!!!
  printSuccess(`Environment versions valid ${performanceLabel}`);
}

// BEGIN EXECUTION
await main();
