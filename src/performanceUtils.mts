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
 * @param runner    Function whose CPU usage to measure.
 * @param startTime Optional time in milliseconds when the elapsed time starts counting.
 * @returns         A tuple containing the return value of the passed-in function and the CPU usage in percent.
 */
async function measureCpuUsage<T>(runner: () => T | Promise<T>, startTime = performance.now()) {
  const startCpuUsage = process.cpuUsage();

  const runnerReturnValue = await runner();

  const elapsedTime = performance.now() - startTime;
  const elapsedCpuUsage = process.cpuUsage(startCpuUsage);
  const cpuCount = availableParallelism();
  const cpuPercent =
    (100 * ((elapsedCpuUsage.system + elapsedCpuUsage.user) / (1_000 * elapsedTime))) / cpuCount;

  return [runnerReturnValue, cpuPercent] as const;
}

/**
 * Measure performance metrics of the provided runner function. Specifically, `Server-Timing`
 * duration and CPU usage percent is computed.
 * @param metricName        Name of the `Server-Timing` metric being measured.
 * @param request           `Request` object to which the `Server-Timing` header will be appended.
 * @param runner            Function whose execution duration and CPU usage percentage will be computed.
 * @param metricDescription Optional description of the `Server-Timing` metric being measured.
 * @returns                 A tuple containing the return value of the passed-in function, the execution duration, and the CPU usage in percent.
 */
async function measurePerformanceMetrics<T>(
  metricName: string,
  request: Request,
  runner: () => T | Promise<T>,
  metricDescription?: string,
) {
  const startTime = performance.now();
  const [runnerReturnValue, cpuPercent] = await measureCpuUsage(runner, startTime);
  const [header, duration] = buildServerTimingHeader(metricName, startTime, metricDescription);
  request.headers.append(...header);

  return [runnerReturnValue, duration, cpuPercent] as const;
}

// Module Exports
export { measureCpuUsage, measurePerformanceMetrics };
