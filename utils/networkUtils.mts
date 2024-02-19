// External Imports
import { dim, green, red, yellow, cyan } from 'yoctocolors';
import { format } from 'node:util';

// Internal Imports
import { getElapsedTimeFormatted } from './timeUtils.mts';

// Type Imports
import type { Server } from 'bun';

// Local Types
declare global {
  // eslint-disable-next-line vars-on-top, no-var -- this is a requirement for correct variable access
  var hotReloadCount: number;
}

// Local Functions
function getColorByStatusCode(statusCode: number) {
  switch (statusCode - (statusCode % 100)) {
    case 200:
      return green;
    case 300:
      return cyan;
    case 400:
      return yellow;
    default:
      return red;
  }
}

function logServerStartup({ url: { href } }: Server) {
  globalThis.hotReloadCount ??= 0;
  const { hotReloadCount } = globalThis;

  const hotCountString = hotReloadCount > 0 ? `  (hot reload count: ${hotReloadCount})` : '';
  const formatString = 'Development server listening on %s%s';
  const heading = format(formatString, href, hotCountString);
  const headingColor = format(formatString, href, dim(hotCountString));
  const separator = dim('='.repeat(heading.length));
  console.log(headingColor);
  console.log(separator);

  globalThis.hotReloadCount += 1;
}

// eslint-disable-next-line @typescript-eslint/ban-types -- generic definition of an ES module
function startDevelopmentServer<TModule extends Record<string, Function>>(
  entrypointModule: TModule,
  functionName = 'fetch',
) {
  const server = Bun.serve({
    development: true,
    async fetch(request: Request): Promise<Response> {
      const startTime = Bun.nanoseconds();
      const { pathname, search } = new URL(request.url);

      // Log request details without breaking to next line so response metadata can be on same line
      process.stdout.write(`${dim(`[${request.method}]`)} ${pathname}${search}`);

      // Collect response metadata, then log response details
      const response = (await entrypointModule[functionName]!(request)) as Response;
      const elapsedTime = getElapsedTimeFormatted(startTime);
      const color = getColorByStatusCode(response.status);
      console.log(`  ${color(`(${response.status} in ${elapsedTime})`)}`);

      return response;
    },
    lowMemoryMode: false,
    port: process.env.DEVELOPMENT_SERVER_PORT ?? 3_000,
  });

  logServerStartup(server);
}

// Module Exports
export { startDevelopmentServer };
