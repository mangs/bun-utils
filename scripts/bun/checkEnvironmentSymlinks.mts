#!/usr/bin/env bun

// External Imports
import { lstat } from 'node:fs/promises';
import { realpathSync } from 'node:fs';

// Internal Imports
import { getFilesRecursive } from '../../utils/filesystemUtils.mts';
import { getPerformanceLabel, printError, printSuccess } from '../../utils/consoleUtils.mts';

// Local Functions
async function main() {
  const startTime = Bun.nanoseconds();

  const brokenSymlinkPaths = [];
  const filePaths = getFilesRecursive('.');
  const fileStatList = await Promise.all(filePaths.map((path) => lstat(path)));
  for (const [index, fileStats] of fileStatList.entries()) {
    if (fileStats.isSymbolicLink()) {
      const path = filePaths[index]!;
      try {
        realpathSync(path);
      } catch {
        brokenSymlinkPaths.push(path);
      }
    }
  }

  if (brokenSymlinkPaths.length > 0) {
    process.exitCode = 1;
    printError('The following symlinks point to a non-existant file:');
    for (const path of brokenSymlinkPaths) {
      printError(`\t- ${path}`);
    }
    return;
  }
  const performanceLabel = getPerformanceLabel(startTime);

  // Success!!!
  printSuccess(`Environment symlinks valid ${performanceLabel}`);
}

// BEGIN EXECUTION
await main();
