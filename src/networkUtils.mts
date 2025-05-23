// External Imports
import { file, inspect, serve, stringWidth } from 'bun';
import { format } from 'node:util';

// Internal Imports
import { cyan, dim, green, printError, red, yellow } from './consoleUtils.mts';
import { measureElapsedTime, sleep } from './timeUtils.mts';

// Type Imports
import type { Serve, ServeOptions, Server } from 'bun';

// Global Types
declare global {
  // eslint-disable-next-line vars-on-top, no-var -- this is a requirement for correct variable access
  var hotReloadCount: number;
}

// Local Types
// eslint-disable-next-line no-undef -- not sure why FetchRequestInit invisible to ESLint
interface FetchRetryOptions extends BunFetchRequestInit {
  /**
   * Function allowing arbitrary status codes to bypass the retry process.
   * @param statusCode Response status code.
   * @returns          Boolean deciding if the status code is allowed.
   * @example
   * ```ts
   * fetchWithRetry(url, { onBypassRetry: (statusCode) => statusCode === 404 });
   * ```
   */
  onBypassRetry?: (statusCode: number) => boolean;
  /**
   * Function describing how `retryDelay` changes with each retry iteration.
   * @param delay Existing delay value.
   * @returns     New delay value.
   */
  onChangeRetryDelay?: (delay: number) => number;
  /**
   * Maximum number of retries before an error is thrown.
   */
  retries?: number;
  /**
   * Delay between retries; `onChangeRetryDelay` affects how it changes between retry iterations.
   */
  retryDelay?: number;
  /**
   * Time until the `fetch` request times out; can alternatively be overridden by passing an `AbortSignal` value to the `options.signal` parameter member.
   */
  timeout?: number;
}

interface HttpsOptions {
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.ca` option but only the path.
   */
  certificateAuthorityPath?: string | string[];
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.cert` option but only the path.
   */
  certificatePath: string | string[];
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.dhParamsFile` option.
   */
  diffieHellmanParametersPath?: string;
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.lowMemoryMode` option.
   */
  lowMemoryMode?: boolean;
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.passphrase` option.
   */
  passphrase?: string;
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.key` option but only the path.
   */
  privateKeyPath: string | string[];
  /**
   * Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.serverName` option.
   */
  serverName?: string;
}

interface ServerConfiguration extends Pick<ServeOptions, 'error' | 'hostname' | 'port'> {
  /**
   * Options for customizing HTTPS functionality.
   */
  httpsOptions?: HttpsOptions;
  /**
   * Choose whether incoming request body contents should be logged
   */
  onLogRequestBody?: (request: Request, response: Response) => boolean;
}

// Local Functions
/**
 * `fetch` with auto-retry and auto-timeout support. Follows an exponential backoff strategy by
 * default starting with a delay of 1 second. Times out after 10 seconds by default. Client error
 * response codes (`400`s) and below bypass retries by default whereas server error response codes
 * (`500`s) do not; use option `onBypassRetry` to customize this behavior. Setting environment
 * variable `DEBUG` to a truthy value logs caught and ignored retry errors.
 * @param url     URL from which to fetch data.
 * @param options Options object that combines `fetch`'s 2nd parameter with custom options.
 * @returns       Data returned by `fetch`.
 */
async function fetchWithRetry(url: Request | string | URL, options: FetchRetryOptions = {}) {
  const {
    onBypassRetry = (statusCode) => statusCode < 500,
    onChangeRetryDelay = (delay) => delay * 2,
    retries = 3,
    retryDelay = 1_000,
    timeout = 10_000,
    ...fetchOptions
  } = options;

  const hasRetriesRemaining = retries > 0;
  try {
    const response = await fetch(url instanceof Request ? url.clone() : url, {
      signal: AbortSignal.timeout(timeout),
      ...fetchOptions,
    });

    if (!onBypassRetry(response.status) && hasRetriesRemaining) {
      throw new Error(`Status code ${response.status} received. Retrying...`);
    }
    return response;
  } catch (error) {
    if (hasRetriesRemaining) {
      if (process.env.DEBUG) {
        console.debug('ERROR RETRY SETTINGS', { retries, retryDelay });
        console.debug('ERROR', error);
      }
      await sleep(retryDelay);
      return fetchWithRetry(url, {
        ...options,
        retries: retries - 1,
        retryDelay: onChangeRetryDelay(retryDelay),
      });
    }

    if (error instanceof Error) {
      error.cause = { retries, retryDelay, timeout };
      throw error;
    }
    throw new Error('Unexpected error', { cause: { error } });
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
 * @param serverHref    The full URL string representing the running server instance.
 * @param tlsServerName The TLS certificate hostname to expect when connecting to the server.
 */
function logServerStartup(
  serverHref: Server['url']['href'],
  tlsServerName: HttpsOptions['serverName'],
) {
  globalThis.hotReloadCount ??= 0;
  const { hotReloadCount } = globalThis;

  const listenUrl = tlsServerName ? `https://${tlsServerName}/` : serverHref;
  const hotCountString = hotReloadCount > 0 ? `  (hot reload count: ${hotReloadCount})` : '';
  const formatString = 'Development server listening on %s%s';
  const heading = format(formatString, listenUrl, hotCountString);
  const headingColor = format(formatString, listenUrl, dim(hotCountString));
  const separator = dim('='.repeat(stringWidth(heading)));
  console.log(headingColor);
  console.log(separator);

  globalThis.hotReloadCount += 1;
}

/**
 * Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
 * server. The exact configuration options used are logged to the console if the `DEBUG` environment
 * variable is set to a truthy value. Optionally specify a configuration object to customize
 * functionality.
 * **NOTE:** multiple server instances can be started simultaneously with unique port values.
 * @param entrypointFunction  The function used to start running the server.
 * @param serverConfiguration An optional configuration object.
 * @returns                   `Promise` resolving to the return value of `Bun.serve()`.
 */
async function startDevelopmentServer(
  entrypointFunction: Serve['fetch'],
  serverConfiguration: ServerConfiguration = {},
) {
  const {
    error,
    hostname,
    httpsOptions,
    onLogRequestBody = () => true,
    port,
  } = serverConfiguration;
  const serverOptions: Serve = {
    development: true,
    async fetch(request: Request, server: Server): Promise<Response> {
      const requestClone = request.clone();
      const [[response, responseError], elapsedTime] = await measureElapsedTime(async () => {
        const { pathname, search } = new URL(request.url);

        // Log request details without breaking to next line so response metadata can be on same line
        process.stdout.write(`${dim(`[${request.method}]`)} ${pathname}${search}`);

        // Collect response metadata, then log response details
        let entrypointError: Error | undefined;
        let entrypointResponse: Response;
        try {
          entrypointResponse =
            (await entrypointFunction.bind(server)(request, server)) ??
            new Response('Undefined development server response received', { status: 500 });
        } catch (error_) {
          if (error_ instanceof Error) {
            entrypointError = error_;
          }
          entrypointResponse = new Response(undefined, { status: 500 });
        }
        return [entrypointResponse, entrypointError];
      });

      const color = getColorByStatusCode(response.status);
      process.stdout.write(`  ${color(`(${response.status} in ${elapsedTime})`)}\n`);
      if (responseError) {
        throw responseError;
      }
      if (requestClone.body && onLogRequestBody(requestClone, response)) {
        const isJsonBody = requestClone.headers.get('content-type') === 'application/json';
        const requestBody = isJsonBody
          ? ((await requestClone.json()) as unknown)
          : await requestClone.text();
        if (requestBody) {
          process.stdout.write(
            `${inspect(requestBody, { colors: true, depth: Infinity, sorted: true })}\n`,
          );
        }
      }

      return response;
    },
    lowMemoryMode: httpsOptions?.lowMemoryMode ?? false,
    port: port ?? process.env.DEVELOPMENT_SERVER_PORT ?? 80,
    ...(error && { error }),
    ...(hostname && { hostname }),
  };

  if (httpsOptions) {
    const {
      certificateAuthorityPath,
      certificatePath,
      diffieHellmanParametersPath,
      passphrase,
      privateKeyPath,
      serverName,
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

          // Force an exit to make it obvious there's a problem (Bun.serve doesn't exit by default for thrown errors)
          process.exit(1); // eslint-disable-line n/no-process-exit, unicorn/no-process-exit -- intended to be used in CLI scripts
        }
      }
    }

    serverOptions.port = port ?? process.env.DEVELOPMENT_SERVER_PORT ?? 443;
    serverOptions.tls = {
      cert: Array.isArray(certificatePath)
        ? certificatePath.map((c) => file(c))
        : file(certificatePath),
      key: Array.isArray(privateKeyPath)
        ? privateKeyPath.map((p) => file(p))
        : file(privateKeyPath),
    };
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
    if (serverName) {
      serverOptions.tls.serverName = serverName;
    }
  }

  if (process.env.DEBUG) {
    console.debug('SERVER OPTIONS', serverOptions);
  }

  const developmentServer = serve(serverOptions);
  logServerStartup(developmentServer.url.href, httpsOptions?.serverName);
  return developmentServer;
}

// Module Exports
export { fetchWithRetry, startDevelopmentServer };
export type { FetchRetryOptions, HttpsOptions, ServerConfiguration };
