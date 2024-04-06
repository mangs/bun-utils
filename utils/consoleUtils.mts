// External Imports
import { styleText } from 'node:util';

// Internal Imports
import { getElapsedTimeFormatted } from './timeUtils.mts';

// Local Types
type GetPerformanceLabelParameters = Parameters<typeof getElapsedTimeFormatted>;

// Local Functions
function cyan(text: string) {
  return styleText('cyan', text);
}

function dim(text: string) {
  return styleText('dim', text);
}

function green(text: string) {
  return styleText('green', text);
}

function red(text: string) {
  return styleText('red', text);
}

function white(text: string) {
  return styleText('white', text);
}

function yellow(text: string) {
  return styleText('yellow', text);
}

function getPerformanceLabel(
  startTime: GetPerformanceLabelParameters[0],
  exactUnits?: GetPerformanceLabelParameters[1],
  localeOverride?: GetPerformanceLabelParameters[2],
) {
  const formattedTime = getElapsedTimeFormatted(startTime, exactUnits, localeOverride);
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
