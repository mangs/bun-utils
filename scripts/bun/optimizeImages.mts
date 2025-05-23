#!/usr/bin/env bun

// External Imports
import { argv, file, Glob, nanoseconds, write } from 'bun';
import nodePath from 'node:path';
import { parseArgs } from 'node:util';
import sharp from 'sharp'; // eslint-disable-line import/no-extraneous-dependencies -- used only for development

// Internal Imports
import { getPerformanceLabel } from '../../src/consoleUtils.mts';
import { getHumanReadableFilesize } from '../../src/filesystemUtils.mts';

// Type Imports
import type { AvifOptions, JpegOptions, PngOptions, WebpOptions } from 'sharp';

// Local Variables
const imageFormats = new Set(['avif', 'jpeg', 'jpg', 'png', 'webp']);
const compressionOptions = {
  // The "quality" options are the default values
  avif: { quality: 50 } satisfies AvifOptions,
  jpeg: { quality: 80 } satisfies JpegOptions,
  jpg: { quality: 80 } satisfies JpegOptions,
  png: { quality: 100 } satisfies PngOptions,
  webp: { quality: 80 } satisfies WebpOptions,
};

// Local Functions
/**
 * Script entrypoint.
 * @example ```bash
 * # All images in the current directory and all its subdirectories will be optimized. No image format conversion will occur.
 * optimize-images
 *
 * # All images in the specified root directory and its subdirectories will be optimized. No image format conversion will occur.
 * optimize-images --root-path assets/images/
 *
 * # All images in the current directory and all its subdirectories will be optimized. All images will be converted to AVIF.
 * optimize-images --convert-to avif
 *
 * # All images in the specified root directory and its subdirectories will be optimized. All images will be converted to WebP.
 * optimize-images --root-path public/ --convert-to webp
 * ```
 */
async function main() {
  const { values } = parseArgs({
    allowPositionals: true,
    args: argv,
    options: {
      'convert-to': { type: 'string' },
      'root-path': { default: '.', type: 'string' },
    },
  });

  const startTimeTotal = nanoseconds();
  const conversionFormat = values['convert-to'];
  if (conversionFormat && !imageFormats.has(conversionFormat)) {
    throw new Error(`Invalid image conversion format: ${conversionFormat}`);
  }

  const rootPath = values['root-path'];
  const glob = new Glob('**/*.{avif,jpeg,jpg,png,webp}');
  let fileCount = 0;
  for await (const filePath of glob.scan(rootPath)) {
    fileCount += 1;
    const startTime = nanoseconds();
    const fullFilePath = nodePath.join(rootPath, filePath);
    const sizeBefore = file(fullFilePath).size;
    const imageMetadata = await sharp(fullFilePath).metadata();
    const { format } = imageMetadata;
    if (!format) {
      throw new TypeError('Invalid image format encountered', { cause: { filePath, format } });
    }
    const formatKeyed =
      (conversionFormat as keyof typeof compressionOptions) ??
      (format as keyof typeof compressionOptions);
    const formatOptions = compressionOptions[formatKeyed];
    const fileArrayBuffer = await sharp(fullFilePath)
      [formatKeyed === 'jpg' ? 'jpeg' : formatKeyed](formatOptions)
      .toBuffer();
    const sizeAfter = fileArrayBuffer.length;
    const percentage = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      style: 'percent',
    }).format(sizeAfter / sizeBefore);
    const newFilePath = fullFilePath.replace(/\.\w+$/, `.${formatKeyed}`);
    await write(newFilePath, fileArrayBuffer.buffer);

    console.log(
      `${newFilePath}: ${getHumanReadableFilesize(sizeBefore)} to ${getHumanReadableFilesize(sizeAfter)} (${percentage}) ${getPerformanceLabel(startTime)}`,
    );
  }

  console.log(
    `\n${fileCount} file${fileCount === 1 ? '' : 's'} processed ${getPerformanceLabel(startTimeTotal)}`,
  );
}

// Begin Execution
await main();
