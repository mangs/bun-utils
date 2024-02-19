// External Imports
import { cyan, dim, green, red, white, yellow } from 'yoctocolors';

// Internal Imports
import { getElapsedTimeFormatted } from './timeUtils.mts';

// Local Functions
function getPerformanceLabel(startTime: number) {
  const formattedTime = getElapsedTimeFormatted(startTime, true);
  return dim(white(`[${formattedTime}]`));
}

function printError(message: string) {
  console.error(red(message));
}

function printInfo(message: string) {
  console.info(cyan(message));
}

function printSuccess(message: string) {
  console.info(green(message));
}

function printWarning(message: string) {
  console.warn(yellow(message));
}

// Module Exports
export { getPerformanceLabel, printError, printInfo, printSuccess, printWarning };
