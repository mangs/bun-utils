#!/usr/bin/env bun

// External Imports
import { readdir, symlink } from 'node:fs/promises';

// Internal Imports
import { isDirectoryAccessible } from '../../utils/filesystemUtils.mts';
import { printError, printInfo, printSuccess } from '../../utils/consoleUtils.mts';

// Type Imports
import type { PackageJson } from 'type-fest';

// Local Variables
const gitHooksDestinationPath = '.git/hooks';
const gitHooksSourcePath = 'scripts/git/hooks';

// Local Functions
async function main() {
  // Do nothing in a continuous integration environment
  if (process.env.CI === 'true') {
    printInfo(
      'Skipping hooks install because this is a continuous integration environment ("CI" environment variable is set to "true")',
    );
    return;
  }

  const isDestinationPathAccessible = await isDirectoryAccessible(gitHooksDestinationPath);
  if (!isDestinationPathAccessible) {
    // Skip silently because there is no .git directory, thus likely executing inside node_modules
    return;
  }
  const isSourcePathAccessible = await isDirectoryAccessible(gitHooksSourcePath);
  if (!isSourcePathAccessible) {
    const { name: packageName } = (await import('../../package.json')) as unknown as PackageJson;
    printError(
      `ERROR: Git hooks symlink to package ${packageName} missing, so the following path is unreachable: ${gitHooksSourcePath}`,
    );
    process.exitCode = 1;
    return;
  }

  printInfo('Installing Git hooks...');
  const hookFileNames = await readdir(gitHooksSourcePath);
  process.chdir(gitHooksDestinationPath); // Create symlinks with a relative path
  await Promise.all(
    hookFileNames.map((fileName) => {
      console.info(`- ${fileName}`);
      return symlink(`../../${gitHooksSourcePath}/${fileName}`, fileName);
    }),
  );
  const count = hookFileNames.length;
  printSuccess(`Successfully created ${count} hook symlink${count === 1 ? '' : 's'}`);
}

// BEGIN EXECUTION
await main();
