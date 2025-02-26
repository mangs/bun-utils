// External Imports
import { styleText } from 'node:util';

// Internal Imports
import { getElapsedTimeFormatted } from './timeUtils.mts';

// Local Functions
/**
 * Format the text so it appears cyan.
 * @param text The text to format.
 * @returns    Text formatted so it appears cyan.
 */
function cyan(text: string) {
  return styleText('cyan', text);
}

/**
 * Format the text so it appears dim.
 * @param text The text to format.
 * @returns    Text formatted so it appears dim.
 */
function dim(text: string) {
  return styleText('dim', text);
}

/**
 * Format the text so it appears green.
 * @param text The text to format.
 * @returns    Text formatted so it appears green.
 */
function green(text: string) {
  return styleText('green', text);
}

/**
 * Format the text so it appears red.
 * @param text The text to format.
 * @returns    Text formatted so it appears red.
 */
function red(text: string) {
  return styleText('red', text);
}

/**
 * Format the text so it appears white.
 * @param text The text to format.
 * @returns    Text formatted so it appears white.
 */
function white(text: string) {
  return styleText('white', text);
}

/**
 * Format the text so it appears yellow.
 * @param text The text to format.
 * @returns    Text formatted so it appears yellow.
 */
function yellow(text: string) {
  return styleText('yellow', text);
}

/**
 * Get a text label showing the elapsed time between the provided start time parameter and the time
 * the function is called. Optionally a minimum time unit can be chosen (set to `ms` by default) or
 * a specific time unit can be enforced. Also, formatting locale can be overridden.
 * @param parameters The same parameters as {@link getElapsedTimeFormatted}.
 * @returns          Localized text label showing elapsed time with units.
 */
function getPerformanceLabel(...parameters: Parameters<typeof getElapsedTimeFormatted>) {
  const formattedTime = getElapsedTimeFormatted(...parameters);
  return dim(white(`[${formattedTime}]`));
}

/**
 * Print an error message to the console in red.
 * @param message A message to print to the console.
 */
function printError(message: string) {
  console.error(red(message));
}

/**
 * Print an informational message to the console in cyan.
 * @param message A message to print to the console.
 */
function printInfo(message: string) {
  console.info(cyan(message));
}

/**
 * Print a success message to the console in green.
 * @param message A message to print to the console.
 */
function printSuccess(message: string) {
  console.info(green(message));
}

/**
 * Print a warning message to the console in yellow.
 * @param message A message to print to the console.
 */
function printWarning(message: string) {
  console.warn(yellow(message));
}

// Module Exports
export {
  cyan,
  dim,
  getPerformanceLabel,
  green,
  printError,
  printInfo,
  printSuccess,
  printWarning,
  red,
  white,
  yellow,
};
