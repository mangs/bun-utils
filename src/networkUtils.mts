/**
 * @file Network-related utlity functions.
 */

// External Imports
import { format } from 'node:util';
import { file, nanoseconds, serve, stringWidth } from 'bun';

// Internal Imports
import { cyan, dim, green, printError, red, yellow } from './consoleUtils.mts';
import { getElapsedTimeFormatted, sleep } from './timeUtils.mts';

// Type Imports
import type { Serve, Server } from 'bun';

// Local Types
// eslint-disable-next-line no-undef -- not sure why FetchRequestInit invisible to ESLint
type FetchRetryOptions = FetchRequestInit & {
  changeRetryDelay: (delay: number) => number;
  retryDelay: number;
  retryMax: number;
};

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
 * `fetch` with auto-retry support. Follows an exponential backoff strategy by default starting with
 * a delay of 1 second.
 * @param url     URL from which to fetch data.
 * @param options Options object that combines `fetch`'s default 2nd parameter with 3 new values: `retryMax` for maximum number of retries before an error is thrown, `retryDelay` for the delay when retrying the first time, and `changeRetryDelay` which is a function that describes how `retryDelay` changes with each retry iteration.
 * @returns       Data returned by `fetch`.
 */
async function fetchWithRetry(url: string | URL | Request, options: FetchRetryOptions) {
  const {
    changeRetryDelay = (delay) => delay * 2,
    retryDelay = 1_000,
    retryMax = 3,
    ...fetchOptions
  } = options;
  try {
    return await fetch(url instanceof Request ? url.clone() : url, fetchOptions);
  } catch (error) {
    if (retryMax >= 1) {
      await sleep(retryDelay);
      return fetchWithRetry(url, {
        ...fetchOptions,
        changeRetryDelay,
        retryDelay: changeRetryDelay(retryDelay),
        retryMax: retryMax - 1,
      });
    }
    throw error;
  }
}

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
 * server. The exact configuration options used are logged to the console if the `DEBUG` environment
 * variable is set to a truthy value.
 *
 * Optionally specify a configuration object to customize functionality as follows:
 * ```ts
 * {
 *   hostname?: string;                              // Defaults to localhost
 *   httpsOptions?: {
 *     certificatePath: string | string[];           // Maps to Bun.serve()'s tls.cert option
 *     certificateAuthorityPath?: string | string[]; // Maps to Bun.serve()'s tls.ca option
 *     diffieHellmanParametersPath?: string;         // Maps to Bun.serve()'s tls.dhParamsFile option
 *     passphrase?: string;                          // Maps to Bun.serve()'s tls.passphrase option
 *     privateKeyPath: string | string[];            // Maps to Bun.serve()'s tls.key option
 *   };
 *   port?: string | number;                         // Defaults to process.env.DEVELOPMENT_SERVER_PORT else 3_000 for HTTP, 443 for HTTPS
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

    const certificate = [certificatePath].flat().map((c) => file(c));
    const privateKey = [privateKeyPath].flat().map((p) => file(p));
    const certificateAuthority = [certificateAuthorityPath]
      .flat()
      .map((ca) => (ca ? file(ca) : undefined))
      .filter(Boolean);
    for (const field of [certificate, privateKey, certificateAuthority]) {
      for (const bunFile of field) {
        // eslint-disable-next-line no-await-in-loop -- no way to hoist into Promise.all() without losing reference to file path
        const doesFileExist = await bunFile?.exists();
        if (!doesFileExist && bunFile?.name) {
          const filePath = bunFile.name;
          const targetKey = [certificatePath].flat().includes(filePath)
            ? 'certificatePath'
            : [privateKeyPath].flat().includes(filePath)
              ? 'privateKeyPath'
              : 'certificateAuthorityPath';
          printError(`HTTPS configuration key "${targetKey}" file not found: ${filePath}`);
          process.exit(1); // eslint-disable-line n/no-process-exit, unicorn/no-process-exit -- intended to be used in CLI scripts
        }
      }
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
export { fetchWithRetry, startDevelopmentServer };
