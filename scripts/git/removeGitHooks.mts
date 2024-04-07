#!/usr/bin/env bun

/**
 * @file Shell script to remove all installed Git hooks.
 */

// External Imports
import { readdir, unlink } from 'node:fs/promises';

// Internal Imports
import { isDirectoryAccessible } from '../../utils/filesystemUtils.mts';
import { printInfo, printSuccess } from '../../utils/consoleUtils.mts';

// Local Variables
const gitHooksPath = '.git/hooks';

// Local Functions
/**
 * Script entrypoint.
 */
async function main() {
  // Do nothing in a continuous integration environment
  if (process.env.CI === 'true') {
    printInfo(
      'Skipping hooks install because this is a continuous integration environment ("CI" environment variable is set to "true")',
    );
    return;
  }

  const isPathAccessible = await isDirectoryAccessible(gitHooksPath);
  if (!isPathAccessible) {
    // Skip silently because there is no .git directory, thus likely executing inside node_modules
    return;
  }

  printInfo('Removing Git hooks...');
  const hookFileNames = await readdir(gitHooksPath, { withFileTypes: true });
  const hookFileNamesFiltered = hookFileNames
    .filter((file) => file.isSymbolicLink())
    .map((file) => file.name);
  await Promise.all(
    hookFileNamesFiltered.map((fileName) => {
      console.info(`- ${fileName}`);
      return unlink(`${gitHooksPath}/${fileName}`);
    }),
  );
  const count = hookFileNamesFiltered.length;
  printSuccess(`Successfully removed ${count} hook symlink${count === 1 ? '' : 's'}`);
}

// BEGIN EXECUTION
await main();
