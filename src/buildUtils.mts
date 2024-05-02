/**
 * @file Build- and bundler-related utilities.
 */

// External Imports
import { relative } from 'node:path';
import { build, file, nanoseconds, stringWidth } from 'bun';

// Internal Imports
import {
  cyan,
  dim,
  getPerformanceLabel,
  printError,
  printInfo,
  printSuccess,
  yellow,
} from './consoleUtils.mts';
import { getHumanReadableFilesize } from './filesystemUtils.mts';

// Type Imports
import type { BuildArtifact, BuildConfig, BuildOutput } from 'bun';

// Local Types
type BuildArtifactMetadata = Record<BuildArtifact['kind'], { count: number; size: number }>;
interface BuildConfiguration extends BuildConfig {
  outdir: string;
}

// Local Functions
/**
 * Build code using `Bun.build` and a provided build configuration object.
 * @param buildConfiguration Configuration object used to build the code.
 * @returns                  Number corresponding to the desired process exit code.
 * @example
 * ```ts
 * import { buildAndShowMetadata } from '@mangs/bun-utils/build';
 * import type { BuildConfiguration } from '@mangs/bun-utils/build';
 *
 * const buildConfiguration = {
 *   entrypoints: ['./src/index.mts'],
 *   minify: true,
 *   outdir: './dist',
 * } satisfies BuildConfiguration;
 * process.exitCode = await buildAndShowMetadata(buildConfiguration);
 * ```
 */
async function buildAndShowMetadata(buildConfiguration: BuildConfiguration) {
  const startTime = nanoseconds();
  printInfo('Building application artifacts...\n');
  const buildOutput = await build(buildConfiguration);
  const performanceLabel = getPerformanceLabel(startTime);

  if (!buildOutput.success) {
    printError(`Build error occurred ${performanceLabel}`);
    for (const error of buildOutput.logs) {
      console.error(error);
    }
    return 1;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define -- functions get hoisted
  printBuildMetadata(buildOutput, buildConfiguration.outdir);
  printSuccess(`Build success ${performanceLabel}`);
  return 0;
}

/**
 * Format and print to the command line the provided build metadata.
 * @param buildOutput          The return value of `Bun.build()`.
 * @param buildOutputDirectory The output directory when building.
 */
function printBuildMetadata(buildOutput: BuildOutput, buildOutputDirectory: string) {
  let maxFilenameLength = 0;
  const buildArtifactMetadata: BuildArtifactMetadata = {
    asset: { count: 0, size: 0 },
    chunk: { count: 0, size: 0 },
    'entry-point': { count: 0, size: 0 },
    sourcemap: { count: 0, size: 0 },
  };
  const buildArtifactsSorted = buildOutput.outputs
    .map(({ kind, path }) => {
      const pathRelative = relative(buildOutputDirectory, path);
      const { size } = file(path);
      buildArtifactMetadata[kind].size += size;
      buildArtifactMetadata[kind].count += 1;
      if (stringWidth(pathRelative) > maxFilenameLength) {
        maxFilenameLength = stringWidth(pathRelative);
      }
      return { kind, pathRelative, size };
    })
    .toSorted((a, b) => {
      const nameA = a.pathRelative.toUpperCase();
      const nameB = b.pathRelative.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  let fileCount = 0;
  const labelLength = buildArtifactsSorted.length.toString().length;
  const gutterWidth = labelLength + 2;
  for (const { kind, pathRelative, size } of buildArtifactsSorted) {
    fileCount += 1;
    const countColumn = dim(`${fileCount.toString().padStart(labelLength, ' ')})`);
    const filenameColumn = pathRelative.padEnd(maxFilenameLength, ' ');
    const sizeColumn = yellow(getHumanReadableFilesize(size));
    const categoryColumn = dim(`[${kind.slice(0, 1).toUpperCase()}]`);
    console.log(`${countColumn} ${filenameColumn}  ${sizeColumn}\t${categoryColumn}`);
  }
  console.log(); // Add spacing between file metadata and size total rows

  // Total sizes for each category
  const countPadWidth = Object.values(buildArtifactMetadata)
    // eslint-disable-next-line unicorn/no-array-reduce -- concise way to compute a value
    .reduce((maxCount, { count }) => (count > maxCount ? count : maxCount), 0)
    .toString().length;
  const labelColumnWidth = gutterWidth + maxFilenameLength;
  const gutter = ' '.repeat(gutterWidth);
  for (const [label, { count, size }] of Object.entries(buildArtifactMetadata)) {
    if (size === 0) {
      // eslint-disable-next-line no-continue -- skip printing build artifact totals equaling zero
      continue;
    }
    const labelTitleCase = label.charAt(0).toUpperCase() + label.slice(1).replace('-', ' ');
    const pluralSuffix = count === 1 ? '' : 's';
    const countLabel = count.toString().padEnd(countPadWidth, ' ');
    const labelColumn = `${gutter}${countLabel} ${labelTitleCase}${pluralSuffix}`.padEnd(
      labelColumnWidth,
      ' ',
    );
    const valueColumn = getHumanReadableFilesize(size);
    console.log(dim(cyan(`${labelColumn}  ${valueColumn}`)));
  }

  // Total size for all categories in aggregate
  const totalSizeAggregate = Object.values(buildArtifactMetadata).reduce(
    (sum, { size }) => sum + size,
    0,
  );
  const labelColumn = `${gutter}TOTAL SIZE`.padEnd(labelColumnWidth, ' ');
  const valueColumn = getHumanReadableFilesize(totalSizeAggregate);
  console.log(cyan(`${labelColumn}  ${valueColumn}\n`));
}

// Module Exports
export { buildAndShowMetadata, printBuildMetadata };
export type { BuildConfiguration };
export type { BuildOutput } from 'bun';
