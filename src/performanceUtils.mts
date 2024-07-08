/**
 * @file Performance-related utilities.
 */

// External Imports
import { availableParallelism } from 'node:os';

// Internal Imports
import { buildServerTimingHeader } from './timeUtils.mts';

// Local Functions
/**
 * Measure the CPU usage in percent of the provided runner function.
 * @param runner        Function whose CPU usage to measure.
 * @param usesOneThread Optional boolean to decide if 1 or all threads should be used to compute the percent value.
 * @param startTime     Optional time in milliseconds when the elapsed time starts counting.
 * @returns             A tuple containing the return value of the passed-in function and the CPU usage in percent.
 * @example
 * ```ts
 * const [computationResult, cpuUsagePercent] = await measureCpuUsage(() => expensiveComputation());
 * ```
 */
async function measureCpuUsage<TRunner>(
  runner: () => TRunner | Promise<TRunner>,
  usesOneThread = false,
  startTime = performance.now(),
) {
  const cpuUsageStart = process.cpuUsage();

  const runnerReturnValue = await runner();

  const timeElapsed = performance.now() - startTime;
  const cpuUsageElapsed = process.cpuUsage(cpuUsageStart);
  const cpuThreads = usesOneThread ? 1 : availableParallelism();
  const cpuPercent =
    (100 * ((cpuUsageElapsed.system + cpuUsageElapsed.user) / (1_000 * timeElapsed))) / cpuThreads;

  return [runnerReturnValue, cpuPercent] as const;
}

/**
 * Measure performance metrics of the provided runner function. Specifically, `Server-Timing`
 * duration and CPU usage percent is computed.
 * @param metricName        Name of the `Server-Timing` metric being measured.
 * @param request           `Request` object to which the `Server-Timing` header will be appended.
 * @param runner            Function whose execution duration and CPU usage percentage will be computed.
 * @param metricDescription Optional description of the `Server-Timing` metric being measured.
 * @param usesOneThread     Optional boolean to decide if 1 or all threads should be used to compute the percent value.
 * @returns                 A tuple containing the return value of the passed-in function, the execution duration, and the CPU usage in percent.
 */
async function measurePerformanceMetrics<TRunner>(
  metricName: string,
  request: Request,
  runner: () => TRunner | Promise<TRunner>,
  metricDescription?: string,
  usesOneThread = false,
) {
  const startTime = performance.now();
  const [runnerReturnValue, cpuPercent] = await measureCpuUsage(runner, usesOneThread, startTime);
  const [header, duration] = buildServerTimingHeader(metricName, startTime, metricDescription);
  request.headers.append(...header);

  return [runnerReturnValue, duration, cpuPercent] as const;
}

// Module Exports
export { measureCpuUsage, measurePerformanceMetrics };
