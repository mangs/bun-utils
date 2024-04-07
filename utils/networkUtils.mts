// External Imports
import { access, constants } from 'node:fs/promises';
import { format } from 'node:util';
import { file, nanoseconds, serve, stringWidth } from 'bun';

// Internal Imports
import { cyan, dim, green, printError, red, yellow } from './consoleUtils.mts';
import { getElapsedTimeFormatted } from './timeUtils.mts';

// Type Imports
import type { Serve, Server } from 'bun';

// Local Types
interface HttpsOptions {
  certificate: string;
  certificateAuthority?: string;
  diffieHellmanParametersPath?: string;
  passphrase?: string;
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

async function startDevelopmentServer(
  entrypointFunction: (request: Request) => Response | Promise<Response>,
  hostname?: string,
  httpsOptions?: HttpsOptions,
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

  if (hostname) {
    serverOptions.hostname = hostname;
  }

  if (httpsOptions) {
    const {
      certificate,
      certificateAuthority,
      diffieHellmanParametersPath,
      passphrase,
      privateKey,
    } = httpsOptions;

    try {
      const filePromises = [
        access(certificate, constants.R_OK),
        access(privateKey, constants.R_OK),
      ];
      if (certificateAuthority) {
        filePromises.push(access(certificateAuthority, constants.R_OK));
      }
      await Promise.all(filePromises);
    } catch (error) {
      const errorPath = (error as NodeJS.ErrnoException).path; // eslint-disable-line no-undef -- TypeScript can find the NodeJS type
      const targetKey =
        errorPath === certificate
          ? 'certificate'
          : errorPath === certificateAuthority
            ? 'certificateAuthority'
            : 'privateKey';
      printError(`HTTPS configuration key "${targetKey}" file not found: ${errorPath}`);
      process.exit(1); // eslint-disable-line n/no-process-exit, unicorn/no-process-exit -- intended to be used in CLI scripts
    }

    serverOptions.port = process.env.DEVELOPMENT_SERVER_PORT ?? 443;
    serverOptions.tls = {
      cert: file(certificate),
      key: file(privateKey),
    };
    if (hostname) {
      serverOptions.tls.serverName = hostname;
    }
    if (certificateAuthority) {
      serverOptions.tls.ca = file(certificateAuthority);
    }
    if (diffieHellmanParametersPath) {
      serverOptions.tls.dhParamsFile = diffieHellmanParametersPath;
    }
    if (passphrase) {
      serverOptions.tls.passphrase = passphrase;
    }
  }

  if (process.env.DEBUG) {
    console.info('SERVER OPTIONS', serverOptions);
  }

  const server = serve(serverOptions);
  logServerStartup(server);
}

// Module Exports
export { startDevelopmentServer };
