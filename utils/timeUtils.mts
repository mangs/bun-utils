/**
 * @file Time-related utility functions.
 */

// External Imports
import { nanoseconds } from 'bun';

// Local Variables
const timeUnits = ['ns', 'μs', 'ms', 's'] as const;

// Local Types
type TimeUnits = (typeof timeUnits)[number];

// Local Functions
/**
 * Get a formatted string representing the time between the provided start time parameter and the
 * time the function is called. Optionally the time units and formatting locale can be overridden.
 * @param startTime      The start time calculated by Bun.nanoseconds().
 * @param unitsOverride  An optional override of time units to display.
 * @param localeOverride An optional override of the locale used to format and localize the time
 *                       value.
 * @returns              A localized string showing elapsed time with units.
 */
function getElapsedTimeFormatted(
  startTime: number,
  unitsOverride: TimeUnits | '' = 'ms', // eslint-disable-line default-param-last -- localeOverride is also optional
  localeOverride?: string,
) {
  const endTime = nanoseconds();
  let elapsedTime = endTime - startTime;
  let timeIndex = 0;

  if (unitsOverride) {
    const exactIndex = timeUnits.indexOf(unitsOverride);
    while (timeIndex < exactIndex) {
      elapsedTime /= 1_000;
      timeIndex += 1;
    }
  } else {
    while (elapsedTime > 1) {
      if (elapsedTime <= 1_000) {
        break;
      }
      elapsedTime /= 1_000;
      timeIndex += 1;
    }
  }

  const elapsedTimeLocalized = elapsedTime.toLocaleString(localeOverride, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  const units = timeUnits[timeIndex];
  return `${elapsedTimeLocalized}${units}`;
}

// Module Exports
export { getElapsedTimeFormatted };
