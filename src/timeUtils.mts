/**
 * @file Time-related utilities.
 */

// External Imports
import { nanoseconds } from 'bun';

// Local Variables
const timeUnits = ['ns', 'μs', 'ms', 's'] as const;

// Local Types
type TimeUnits = (typeof timeUnits)[number];
interface FormatOptions {
  /**
   * Override of the locale used to format and localize the time value.
   */
  localeOverride?: string;
  /**
   * Smallest time unit that can be displayed.
   */
  unitsMinimum?: TimeUnits;
  /**
   * Override of time units to display; supersedes `unitsMinimum`.
   */
  unitsOverride?: TimeUnits;
}

// Local Functions
/**
 * Build a `Server-Timing` header to measure a performance metric using the provided values.
 * @param name        The name of the performance metric.
 * @param startTime   The recorded start time used to compute the metric duration; computed by subtracting the time at which this function is called by the start time. [Milliseconds is the unit recommended by the W3C](https://w3c.github.io/server-timing/#duration-attribute).
 * @param description A description of the metric.
 * @returns           A tuple containing a tuple representing the header value and the duration.
 * @example
 * ```ts
 * import { buildServerTimingHeader } from '@mangs/bun-utils/time';
 *
 * const startTime = performance.now();
 * // sometime later...
 * request.headers.append(...buildServerTimingHeader('metric', startTime, 'It measures everything')[0]);
 * ```
 */
function buildServerTimingHeader(name: string, startTime?: number, description?: string) {
  const duration = typeof startTime === 'number' ? performance.now() - startTime : -1;
  const durationMetric = duration === -1 ? '' : `;dur=${duration.toFixed(2)}`;
  const descriptionMetric = description ? `;desc="${description}"` : '';
  const header = [`Server-Timing`, `${name}${durationMetric}${descriptionMetric}`] as const;
  return [header, duration] as const;
}

/**
 * Get a formatted string representing the time between the provided start time parameter and the
 * time the function is called. An optional options object can be provided to customize formatting.
 * @param startTime     Start time calculated by `Bun.nanoseconds()`.
 * @param formatOptions Options object for formatting customization.
 * @returns             Localized string showing elapsed time with units.
 */
function getElapsedTimeFormatted(startTime: number, formatOptions?: FormatOptions) {
  const { localeOverride, unitsMinimum = 'ms', unitsOverride } = formatOptions ?? {};

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
    let isMinimumUnit = false;
    while (elapsedTime > 1) {
      if (timeUnits[timeIndex] === unitsMinimum) {
        isMinimumUnit = true;
      }
      if (isMinimumUnit && elapsedTime <= 1_000) {
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

/**
 * Measure the execution time of the passed-in function.
 * @param runner Function whose execution duration will be measured.
 * @returns      A tuple containing the return value of the passed-in function and the elapsed execution time.
 */
async function measureElapsedTime<T>(runner: () => T | Promise<T>) {
  const startTime = nanoseconds();
  const runnerReturnValue = await runner();
  const elapsedTime = getElapsedTimeFormatted(startTime);
  return [runnerReturnValue, elapsedTime] as const;
}

/**
 * Measure the execution time of the passed-in function, then append to the request object a
 * `Server-Timing` header containing the specified metric name, the measured duration, and
 * optionally the metric description.
 * @param metricName        Name of the `Server-Timing` metric being measured.
 * @param request           `Request` object to which the `Server-Timing` header will be appended.
 * @param runner            Function whose execution duration will be measured.
 * @param metricDescription Optional description of the `Server-Timing` metric being measured.
 * @returns                 A tuple containing the return value of the passed-in function and the duration.
 * @example
 * ```ts
 * import { measureServerTiming } from '@mangs/bun-utils/time';
 *
 * const [cmsContent, cmsLoadDuration] = await measureServerTiming('cmsLoad', request, () =>
 *   getCmsContent('article1'),
 * );
 * ```
 */
async function measureServerTiming<T>(
  metricName: string,
  request: Request,
  runner: () => T | Promise<T>,
  metricDescription?: string,
) {
  const startTime = performance.now();
  const runnerReturnValue = await runner();
  const [header, duration] = buildServerTimingHeader(metricName, startTime, metricDescription);
  request.headers.append(...header);
  return [runnerReturnValue, duration] as const;
}

/**
 * Asynchronous sleep function using promises.
 * @param duration Length of time to sleep.
 * @returns        `Promise` that resolves when the specified duration expires.
 */
function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// Module Exports
export {
  buildServerTimingHeader,
  getElapsedTimeFormatted,
  measureElapsedTime,
  measureServerTiming,
  sleep,
};
export type { FormatOptions };
