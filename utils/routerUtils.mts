/**
 * @file Router-related utlity functions.
 */

// Local Types
type HttpRequestMethod = (typeof httpRequestMethods)[number]; // eslint-disable-line no-use-before-define -- defined nearby
type RouteHandlerFunction = (request: Request) => Response | Promise<Response>;
type RouteHandlerLazyLoaded = Record<string, Promise<Record<string, RouteHandlerFunction>>>;
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
 * small.
 *
 * For path matches, `*` matches any character except `/` whereas `**` matches all characters.
 * Otherwise characters are treated as written (no escaping).
 * @example
 * ```ts
 * const router = new Router();
 * router
 *   .get('/*', { pageRoute: import('./routes/pageRoute.mts') })
 *   .post('/submit', { submitRoute: import('./routes/submitRoute.mts') })
 *   .all('**', () => new Response('404 page', { status: 404 }));
 * ```
 */
class Router {
  /**
   * Constructor that creates an empty array for route definitions.
   */
  constructor() {
    this.routes = [];

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

  routes: Routes;

  /**
   * Handles the incoming request after all route definitions have been made.
   * @param request The `Request` object for the incoming request.
   * @returns A `Response` object to build the response sent to the requester.
   */
  async handleRequest(request: Request) {
    const { method } = request;
    const { pathname: requestPath } = new URL(request.url);

    for (const [routeMethod, [routePath, routeHandler]] of this.routes) {
      if (routeMethod !== 'ALL' && method !== routeMethod) {
        continue; // eslint-disable-line no-continue -- ignore HTTP methods that don't match the request
      }

      const matchRegex = new RegExp(`^${routePath.replace('**', '.+').replace('*', '[^\\/]+')}$`);
      if (matchRegex.test(requestPath)) {
        if (typeof routeHandler === 'function') {
          return routeHandler(request);
        }

        const [entry] = Object.entries(routeHandler);
        if (!entry) {
          throw new TypeError('No lazy-loaded configuration option provided');
        }

        const [moduleKey, modulePromise] = entry;
        const routeModule = await modulePromise; // eslint-disable-line no-await-in-loop -- this will only ever await once
        const targetFunction = routeModule[moduleKey];
        if (typeof targetFunction === 'function') {
          return targetFunction(request);
        }
        throw new TypeError(`Lazy-loaded route handler target "${moduleKey}" was not a function`);
      }
    }

    throw new Error('No routes matched!');
  }

  /**
   * Register a route handler for the specified HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @param method A valid HTTP method.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  handleMethod(path: string, routeHandler: RouteHandler, method: HttpRequestMethod) {
    if (!httpRequestMethods.includes(method)) {
      throw new TypeError(`"${method}" is not a valid HTTP method`);
    }
    this.routes.push([method, [path, routeHandler]]);
    return this;
  }

  /**
   * Register a route handler that matches all HTTP request methods.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  all(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'ALL');
  }

  /**
   * Register a route handler that matches the `DELETE` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  delete(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'DELETE');
  }

  /**
   * Register a route handler that matches the `GET` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  get(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'GET');
  }

  /**
   * Register a route handler that matches the `HEAD` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  head(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'HEAD');
  }

  /**
   * Register a route handler that matches the `OPTIONS` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  options(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'OPTIONS');
  }

  /**
   * Register a route handler that matches the `PATCH` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  patch(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'PATCH');
  }

  /**
   * Register a route handler that matches the `POST` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  post(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'POST');
  }

  /**
   * Register a route handler that matches the `PUT` HTTP request method.
   * @param path A path-like string that will be used to match against the incoming request's path.
   * @param routeHandler The function that will execute if this route handler is matched.
   * @returns A reference to the instantiated instance (`this`) so route handler definitions can be chained.
   */
  put(path: string, routeHandler: RouteHandler) {
    return this.handleMethod(path, routeHandler, 'PUT');
  }
}

// Module Exports
export { Router };
