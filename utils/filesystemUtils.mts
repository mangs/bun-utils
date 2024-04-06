// External Imports
import { access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import fs from 'node:fs';

// Local Variables
const fileSizeUnits = ['B', 'KiB', 'MiB', 'GiB'] as const;

async function getFilesRecursive(
  targetDirectory: string,
  ignore = ['node_modules'],
): Promise<string[]> {
  const directoryPathAbsolute = resolve(targetDirectory);
  const directoryEntries = await readdir(directoryPathAbsolute, { withFileTypes: true });
  const recursiveEntries = await Promise.all(
    directoryEntries.map((entry) => {
      if (ignore.includes(entry.name)) {
        return '';
      }
      const pathAbsolute = resolve(directoryPathAbsolute, entry.name);
      return entry.isDirectory() ? getFilesRecursive(pathAbsolute) : pathAbsolute;
    }),
  );
  return recursiveEntries.flat(Number.POSITIVE_INFINITY).filter(Boolean) as string[];
}

function getHumanReadableFilesize(filesize: number, localeOverride?: string) {
  let divisionCount = 0;
  const divisor = 1_024;
  let humanReadableFilesize = filesize;
  while (humanReadableFilesize >= divisor) {
    humanReadableFilesize /= divisor;
    divisionCount += 1;
  }
  const localizedSize = humanReadableFilesize.toLocaleString(localeOverride, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  return `${localizedSize} ${fileSizeUnits[divisionCount]}`;
}

async function isDirectoryAccessible(path: string) {
  try {
    // eslint-disable-next-line no-bitwise -- following the documentation for fs constants: https://nodejs.org/docs/latest/api/fs.html#fspromisesaccesspath-mode
    await access(path, fs.constants.R_OK | fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

// Module Exports
export { getFilesRecursive, getHumanReadableFilesize, isDirectoryAccessible };
