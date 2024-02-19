// Local Variables
const timeUnits = ['ns', 'μs', 'ms', 's'] as const;

// Local Functions
function getElapsedTimeFormatted(startTime: number, hasUnits = true) {
  const endTime = Bun.nanoseconds();
  let elapsedTime = endTime - startTime;
  let timeIndex = 0;
  if (hasUnits) {
    while (elapsedTime > 1) {
      if (elapsedTime <= 1_000) {
        break;
      }
      elapsedTime /= 1_000;
      timeIndex += 1;
    }
  }
  const digitCount = hasUnits ? 2 : 0;
  const elapsedTimeLocalized = elapsedTime.toLocaleString(undefined, {
    maximumFractionDigits: digitCount,
    minimumFractionDigits: digitCount,
  });
  const units = timeUnits[timeIndex];
  return `${elapsedTimeLocalized}${hasUnits ? units : ''}`;
}

// Module Exports
export { getElapsedTimeFormatted };
