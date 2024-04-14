/**
 * @file Router-related utlity functions.
 */

// External Imports
import { Glob } from 'bun';

// Internal Imports
import { buildServerTimingHeader } from './timeUtils.mts';

// Local Types
type HttpRequestMethod = (typeof httpRequestMethods)[number]; // eslint-disable-line no-use-before-define -- defined nearby
type RouteHandlerFunction = (request: Request) => Response | Promise<Response>;
type RouteHandlerLazyLoaded = Record<string, () => Promise<Record<string, RouteHandlerFunction>>>;
type RouteHandler = RouteHandlerFunction | RouteHandlerLazyLoaded;
type RouteEntry = Parameters<InstanceType<typeof Router>['get']>; // eslint-disable-line no-use-before-define -- only used for types
type Routes = [HttpRequestMethod, RouteEntry][];

// Local Variables
const httpRequestMethods = [
  'ALL', // special case to process a request regardless of method

  // 'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  // 'TRACE',
] as const;

// Local Classes
/**
 * Simple router that handles both eager- and lazy-loaded route handlers to keep your bundle sizes
 * small. Both default and named module exports are supported with a concise syntax. Appends
 * `Server-Timing` values for route loading duration to the request headers; can be disabled via the
 * constructor.
 *
 * Path matches follow glob rules by using `Bun.Glob`; see the
 * [documentation for `Bun.Glob`](https://bun.sh/docs/api/glob) for details.
 * @example
 * ```ts
 * import { Router } from '@mangs/bun-utils/router';
 *
 * const router = new Router();
 * router
 *   .get('/*', { pageRoute: () => import('./routes/pageRoute.mts') })
 *   .post('/submit', { submitRoute: () => import('./routes/submitRoute.mts') })
 *   .get('/**', () => new Response('404 page', { status: 404 }))
 *   .all('/**', () => new Response('', { headers: { allow: 'GET' }, status: 405 }));
 * ```
 */
class Router {
  /**
   * Constructor that creates an empty array for route definitions.
   * @param startTime        The start time of loading a route; used to compute `Server-Timing` duration.
   * @param usesServerTiming Boolean indicating if `Server-Timing` headers are appended to the request object or not.
   */
  constructor(startTime?: number, usesServerTiming = true) {
    this.#routes = [];
    this.#startTime = startTime ?? performance.now();
    this.#usesServerTiming = usesServerTiming;

    // return new Proxy(this, {
    //   get(target, property) {
    //     if (typeof property === 'string') {
    //       if (['all', 'init'].includes(property)) {
    //         return target[property];
    //       }
    //       const propertyUppercase = property.toUpperCase() as HttpRequestMethod;
    //       if (httpRequestMethods.includes(propertyUppercase)) {
    //         return (...parameters: RouteEntry) => target.all(...parameters, propertyUppercase);
    //       }
    //     }
    //   },
    // });
  }

  #routes: Routes;

  #startTime: number;

  #usesServerTiming: boolean;

  /**
   * Handles the incoming request after all route definitions have been made.
   * @param request The `Request` object for the incoming request.
   * @returns       A `Response` object to build the response sent to the requester.
   */
  async handleRequest(request: Request) {
    const { method } = request;
    const { pathname: requestPath } = new URL(request.url);

    for (const [routeMethod, [routePath, routeHandler]] of this.#routes) {
      if (routeMethod !== 'ALL' && method !== routeMethod) {
        continue; // eslint-disable-line no-continue -- ignore HTTP methods that don't match the request
      }

      // eslint-disable-next-line unicorn/prefer-regexp-test -- false positive: this is a glob.match() not string.match()
      if (new Glob(routePath).match(requestPath)) {
        if (typeof routeHandler === 'function') {
          if (this.#usesServerTiming) {
            request.headers.append(...buildServerTimingHeader('routeSync', this.#startTime));
          }
          return routeHandler(request);
        }

        const [entry] = Object.entries(routeHandler);
        if (!entry) {
          throw new TypeError('No lazy-loaded configuration option provided');
        }

        const [moduleKey, modulePromiseFunction] = entry;
        const routeModule = await modulePromiseFunction(); // eslint-disable-line no-await-in-loop -- this will only ever await once
        const targetFunction = routeModule[moduleKey];
        if (typeof targetFunction === 'function') {
          if (this.#usesServerTiming) {
            request.headers.append(...buildServerTimingHeader('routeAsync', this.#startTime));
          }
          return targetFunction(request);
        }
        throw new TypeError(`Lazy-loaded route handler target "${moduleKey}" was not a function`);
      }
    }

    throw new Error('No routes matched!');
  }

  /**
   * Register a route handler for the specified HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @param method       A valid HTTP method.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  #handleMethod(path: string, routeHandler: RouteHandler, method: HttpRequestMethod) {
    if (!httpRequestMethods.includes(method)) {
      throw new TypeError(`"${method}" is not a valid HTTP method`);
    }
    this.#routes.push([method, [path, routeHandler]]);
    return this;
  }

  /**
   * Register a route handler that matches all HTTP request methods.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  all(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'ALL');
  }

  /**
   * Register a route handler that matches the `DELETE` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  delete(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'DELETE');
  }

  /**
   * Register a route handler that matches the `GET` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  get(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'GET');
  }

  /**
   * Register a route handler that matches the `HEAD` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  head(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'HEAD');
  }

  /**
   * Register a route handler that matches the `OPTIONS` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  options(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'OPTIONS');
  }

  /**
   * Register a route handler that matches the `PATCH` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  patch(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'PATCH');
  }

  /**
   * Register a route handler that matches the `POST` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  post(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'POST');
  }

  /**
   * Register a route handler that matches the `PUT` HTTP request method.
   * @param path         A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns            A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  put(path: string, routeHandler: RouteHandler) {
    return this.#handleMethod(path, routeHandler, 'PUT');
  }
}

// Module Exports
export { Router };
