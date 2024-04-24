/**
 * @file Filesystem-related utilities.
 */

// External Imports
import { access, constants, readdir, unlink } from 'node:fs/promises';
import { file } from 'bun';
import { resolve } from 'node:path';

// Type Imports
import type { BunFile } from 'bun';

// Local Types
interface TemporaryFileOptions {
  path?: string;
  writerOptions?: Parameters<BunFile['writer']>[0];
}

// Local Variables
const fileSizeUnits = ['B', 'KiB', 'MiB', 'GiB'] as const;

/**
 * Compile a list of all inaccessible file paths, then return it. If all paths are valid, the list
 * will be empty.
 * @param paths List of file and/or directory paths.
 * @returns     The list of inaccessible paths, if any.
 */
async function findMissingPaths(paths: string[]) {
  const targetFilesPromises = paths.map((path) => access(path, constants.R_OK));
  const missingPaths: string[] = [];
  for (const promiseMetadata of await Promise.allSettled(targetFilesPromises)) {
    if (promiseMetadata.status === 'rejected') {
      missingPaths.push((promiseMetadata.reason as Record<string, string>).path!);
    }
  }
  return missingPaths;
}

/**
 * Recursively build a list of paths starting at a target directory. Ignore any paths that match
 * values in the included ignore list.
 * @param rootDirectory The root directory of the search.
 * @param ignore        The list of path segment names to match and ignore.
 * @returns             A list of paths.
 */
async function getPathsRecursive(
  rootDirectory: string,
  ignore = ['node_modules'],
): Promise<string[]> {
  const directoryPathAbsolute = resolve(rootDirectory);
  const directoryEntries = await readdir(directoryPathAbsolute, { withFileTypes: true });
  const recursiveEntries = await Promise.all(
    directoryEntries.map((entry) => {
      if (ignore.includes(entry.name)) {
        return '';
      }
      const pathAbsolute = resolve(directoryPathAbsolute, entry.name);
      return entry.isDirectory() ? getPathsRecursive(pathAbsolute) : pathAbsolute;
    }),
  );
  return recursiveEntries.flat(Number.POSITIVE_INFINITY).filter(Boolean) as string[];
}

/**
 * Get a human readable filesize given its numeric value and an optional locale.
 * @param filesize       A file's size represented as a number.
 * @param localeOverride An optional locale value to override the default set by the operating system.
 * @returns              A localized string representing a file size.
 */
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

/**
 * Determine if the provided path can be successfully accessed.
 * @param path Path whose permissions to check.
 * @returns    Boolean indicating whether or not the path is accessible.
 */
async function isDirectoryAccessible(path: string) {
  try {
    // eslint-disable-next-line no-bitwise -- following the documentation for fs constants: https://nodejs.org/docs/latest/api/fs.html#fspromisesaccesspath-mode
    await access(path, constants.R_OK | constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create a new temporary file with an
 * [`await using` variable declaration](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management)
 * then append to it with a
 * [`FileSink`](https://bun.sh/docs/api/file-io#incremental-writing-with-filesink) instance.
 * Automatically delete the file when its variable falls out of scope. Customize file behavior with
 * an optional options object as follows:
 * ```ts
 * {
 *   path?: string;                                    // Target path to use for temporary file creation.
 *   writerOptions?: Parameters<BunFile['writer']>[0]; // Options object to customize `Bun.file().writer()` behavior
 * }
 * ```
 * .
 * @param options Options object to customize temporary file behavior.
 * @returns       Temporary file instance object.
 * @example
 * ```ts
 * import { usingNewTemporaryFile } from '@mangs/bun-utils/filesystem';
 *
 * await using file = usingNewTemporaryFile();
 * await file.append('test data 42\n');
 * // sometime later...
 * await file.append('holy data, batman\n');
 *
 * // file auto-deletes at the end of its execution scope
 * ```
 */
function usingNewTemporaryFile(options?: TemporaryFileOptions) {
  const { path = `/tmp/tempFile${Date.now()}`, writerOptions } = options ?? {};
  const writer = file(path).writer(writerOptions);

  return {
    /**
     * Append string contents to the target temporary file.
     * @param appendContents   Contents to append to the file.
     * @param shouldForceFlush Whether or not to force a flush to disk when appending.
     */
    async append(appendContents: string, shouldForceFlush = false) {
      writer.write(appendContents);
      if (shouldForceFlush) {
        await writer.flush();
      }
    },

    /**
     * Asynchronous automatic disposal function.
     */
    async [Symbol.asyncDispose]() {
      await writer.end();
      await unlink(path);
    },
  };
}

// Module Exports
export {
  findMissingPaths,
  getHumanReadableFilesize,
  getPathsRecursive,
  isDirectoryAccessible,
  usingNewTemporaryFile,
};
