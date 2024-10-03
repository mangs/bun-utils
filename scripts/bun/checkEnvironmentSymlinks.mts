#!/usr/bin/env bun

/**
 * @file Shell script to check all project environment symlinks to verify they're not broken.
 */

// External Imports
import { nanoseconds } from 'bun';
import { lstat, realpath } from 'node:fs/promises';
import nodePath from 'node:path';

// Internal Imports
import { getPerformanceLabel, printError, printSuccess } from '../../src/consoleUtils.mts';
import { getPathsRecursive } from '../../src/filesystemUtils.mts';

// Local Types
interface PathError {
  path: string;
}

// Local Functions
/**
 * Script entrypoint.
 */
async function main() {
  const startTime = nanoseconds();

  const filePaths = await getPathsRecursive('.');
  const fileStatList = await Promise.all(filePaths.map((path) => lstat(path)));
  const pathPromises: Promise<string>[] = [];
  for (const [index, fileStats] of fileStatList.entries()) {
    if (fileStats.isSymbolicLink()) {
      const path = filePaths[index]!;
      pathPromises.push(
        realpath(path).catch((error: PathError) => {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal -- simplified logic to extract broken symlink file paths
          throw error.path;
        }),
      );
    }
  }

  const brokenSymlinkPaths = [];
  for (const result of await Promise.allSettled(pathPromises)) {
    if (result.status === 'rejected') {
      brokenSymlinkPaths.push(result.reason as string);
    }
  }

  if (brokenSymlinkPaths.length > 0) {
    process.exitCode = 1;
    printError('The following symlinks point to a non-existant file:');
    for (const path of brokenSymlinkPaths) {
      printError(`\t- ${nodePath.relative('.', path)} ${getPerformanceLabel(startTime)}`);
    }
    return;
  }

  // Success!!!
  printSuccess(`Environment symlinks valid ${getPerformanceLabel(startTime)}`);
}

// BEGIN EXECUTION
await main();
