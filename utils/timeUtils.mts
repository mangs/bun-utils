// External Imports
import { nanoseconds } from 'bun';

// Local Variables
const timeUnits = ['ns', 'μs', 'ms', 's'] as const;

// Local Types
type TimeUnits = (typeof timeUnits)[number];

// Local Functions
function getElapsedTimeFormatted(startTime: number, exactUnits: TimeUnits | '' = 'ms') {
  const endTime = nanoseconds();
  let elapsedTime = endTime - startTime;
  let timeIndex = 0;

  if (exactUnits) {
    const exactIndex = timeUnits.indexOf(exactUnits);
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

  const elapsedTimeLocalized = elapsedTime.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  const units = timeUnits[timeIndex];
  return `${elapsedTimeLocalized}${units}`;
}

// Module Exports
export { getElapsedTimeFormatted };
