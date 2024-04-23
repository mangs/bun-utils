/**
 * @file Filesystem-related utilities.
 */

// External Imports
import { access, constants, readdir, unlink } from 'node:fs/promises';
import { file } from 'bun';
import { resolve } from 'node:path';

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
 * Create and append to a new temporary file that is automatically deleted when its `using` variable
 * falls out of scope. Customize its target path with the optional `path` parameter.
 * @param path Target path to use for temporary file creation.
 * @returns    Object with an `append` and async `Symbol.asyncDispose` method.
 * @example
 * ```ts
 * await using file = usingTemporaryFile();
 * await file.append('test data 42\n');
 * // sometime later...
 * await file.append('holy data, batman\n');
 *
 * // file auto-deletes at the end of its execution scope
 * ```
 */
function usingNewTemporaryFile(path = `/tmp/tempFile${Date.now()}`) {
  const writer = file(path).writer();

  return {
    /**
     * Append string contents to the target temporary file.
     * @param appendContents Contents to append to the file.
     * @param shouldFlush    Whether or not to flush to disk every time this append operation occurs.
     */
    async append(appendContents: string, shouldFlush = true) {
      writer.write(appendContents);
      if (shouldFlush) {
        await writer.flush();
      }
    },

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
