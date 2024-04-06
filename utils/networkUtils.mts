// External Imports
import { format } from 'node:util';
import { nanoseconds, serve, stringWidth } from 'bun';

// Internal Imports
import { cyan, dim, green, red, yellow } from './consoleUtils.mts';
import { getElapsedTimeFormatted } from './timeUtils.mts';

// Type Imports
import type { Serve, Server } from 'bun';

// Local Types
interface HttpsOptions {
  certificate: string;
  hostname?: string;
  privateKey: string;
}

// Global Types
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
  const separator = dim('='.repeat(stringWidth(heading)));
  console.log(headingColor);
  console.log(separator);

  globalThis.hotReloadCount += 1;
}

function startDevelopmentServer(
  entrypointFunction: (request: Request) => Response | Promise<Response>,
  httpsOptions?: HttpsOptions,
  optionOverrides?: Omit<Serve, 'fetch'>,
) {
  const serverOptions: Serve = {
    development: true,
    async fetch(request: Request): Promise<Response> {
      const startTime = nanoseconds();
      const { pathname, search } = new URL(request.url);

      // Log request details without breaking to next line so response metadata can be on same line
      process.stdout.write(`${dim(`[${request.method}]`)} ${pathname}${search}`);

      // Collect response metadata, then log response details
      const response = await entrypointFunction(request);
      const elapsedTime = getElapsedTimeFormatted(startTime);
      const color = getColorByStatusCode(response.status);
      console.log(`  ${color(`(${response.status} in ${elapsedTime})`)}`);

      return response;
    },
    lowMemoryMode: false,
    port: process.env.DEVELOPMENT_SERVER_PORT ?? 3_000,
  };

  if (httpsOptions) {
    const { certificate, hostname, privateKey } = httpsOptions;
    serverOptions.port = process.env.DEVELOPMENT_SERVER_PORT ?? 443;
    serverOptions.tls = {
      cert: certificate,
      key: privateKey,
    };
    if (hostname) {
      serverOptions.hostname = hostname;
      serverOptions.tls.serverName = hostname;
    }
  }

  const server = serve({ ...serverOptions, ...(optionOverrides && { ...optionOverrides }) });
  logServerStartup(server);
}

// Module Exports
export { startDevelopmentServer };
