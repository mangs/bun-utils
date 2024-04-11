/**
 * @file Network-related utlity functions.
 */

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
  certificatePath: string | string[];
  certificateAuthorityPath?: string | string[];
  diffieHellmanParametersPath?: string;
  passphrase?: string;
  privateKeyPath: string | string[];
}

interface ServerConfiguration {
  hostname?: string;
  httpsOptions?: HttpsOptions;
  port?: string | number;
}

// Global Types
declare global {
  // eslint-disable-next-line vars-on-top, no-var -- this is a requirement for correct variable access
  var hotReloadCount: number;
}

// Local Functions
/**
 * Return a color formatting function based on the provided status code.
 * @param statusCode An HTTP status code.
 * @returns          A color formatting function.
 */
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

/**
 * Log the development server's startup sequence to the console.
 * @param server          The return value of Bun.serve().
 * @param server.url      The URL API object representing the running server instance.
 * @param server.url.href The full URL string representing the running server instance.
 */
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

/**
 * Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
 * server. Optionally specify a configuration object to customize functionality as follows:
 * ```ts
 * {
 *   hostname?: string; // Defaulgwts to localhost
 *   httpsOptions?: {
 *     certificatePath: string | string[];
 *     certificateAuthorityPath?: string | string[];
 *     diffieHellmanParametersPath?: string;
 *     passphrase?: string;
 *     privateKeyPath: string | string[];
 *   };
 * ```
 * **NOTE:** multiple server instances can be started simultaneously with unique port values.
 * @param entrypointFunction  The function used to start running the server.
 * @param serverConfiguration An optional configuration object.
 */
async function startDevelopmentServer(
  entrypointFunction: (request: Request) => Response | Promise<Response>,
  serverConfiguration: ServerConfiguration = {},
) {
  const { hostname, httpsOptions, port } = serverConfiguration;
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
    port: process.env.DEVELOPMENT_SERVER_PORT ?? port ?? 3_000,
  };

  if (hostname) {
    serverOptions.hostname = hostname;
  }

  if (httpsOptions) {
    const {
      certificatePath,
      certificateAuthorityPath,
      diffieHellmanParametersPath,
      passphrase,
      privateKeyPath,
    } = httpsOptions;

    try {
      const filePromises = [
        ...[certificatePath].flat().map((c) => access(c, constants.R_OK)),
        ...[privateKeyPath].flat().map((p) => access(p, constants.R_OK)),
        ...[certificateAuthorityPath]
          .flat()
          .map((ca) => ca && access(ca, constants.R_OK))
          .filter(Boolean),
      ];
      await Promise.all(filePromises);
    } catch (error) {
      const errorPath = (error as NodeJS.ErrnoException).path; // eslint-disable-line no-undef -- TypeScript can find the NodeJS type
      const targetKey =
        errorPath === certificatePath
          ? 'certificatePath'
          : errorPath === certificateAuthorityPath
            ? 'certificateAuthorityPath'
            : 'privateKeyPath';
      printError(`HTTPS configuration key "${targetKey}" file not found: ${errorPath}`);
      process.exit(1); // eslint-disable-line n/no-process-exit, unicorn/no-process-exit -- intended to be used in CLI scripts
    }

    serverOptions.port = process.env.DEVELOPMENT_SERVER_PORT ?? port ?? 443;
    serverOptions.tls = {
      cert: Array.isArray(certificatePath)
        ? certificatePath.map((c) => file(c))
        : file(certificatePath),
      key: Array.isArray(privateKeyPath)
        ? privateKeyPath.map((p) => file(p))
        : file(privateKeyPath),
    };
    if (hostname) {
      serverOptions.tls.serverName = hostname;
    }
    if (certificateAuthorityPath) {
      serverOptions.tls.ca = Array.isArray(certificateAuthorityPath)
        ? certificateAuthorityPath.map((ca) => file(ca))
        : file(certificateAuthorityPath);
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
