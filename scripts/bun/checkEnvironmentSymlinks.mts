#!/usr/bin/env bun

// External Imports
import { lstat, realpath } from 'node:fs/promises';
import { nanoseconds } from 'bun';
import { relative } from 'node:path';

// Internal Imports
import { getFilesRecursive } from '../../utils/filesystemUtils.mts';
import { getPerformanceLabel, printError, printSuccess } from '../../utils/consoleUtils.mts';

// Local Types
interface PathError {
  path: string;
}

// Local Functions
async function main() {
  const startTime = nanoseconds();

  const filePaths = await getFilesRecursive('.');
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

  const performanceLabel = getPerformanceLabel(startTime);
  if (brokenSymlinkPaths.length > 0) {
    process.exitCode = 1;
    printError('The following symlinks point to a non-existant file:');
    for (const path of brokenSymlinkPaths) {
      printError(`\t- ${relative('.', path)}`);
    }
    printError(performanceLabel);
    return;
  }

  // Success!!!
  printSuccess(`Environment symlinks valid ${performanceLabel}`);
}

// BEGIN EXECUTION
await main();
