# routerUtils

## Classes

### Router

Simple router that handles both eager- and lazy-loaded route handlers to keep your bundle sizes
small. Both default and named module exports are supported with a concise syntax. Appends
`Server-Timing` values for route loading duration to the request headers; can be disabled via the
constructor.

Path matches follow glob rules by using `Bun.Glob`; see the
[documentation for `Bun.Glob`](https://bun.sh/docs/api/glob) for details.

#### Example

```ts
import { Router } from '@mangs/bun-utils/router';

const router = new Router();
router
  .get('/*', { default: () => import('./routes/pageRoute.mts') })                  // Lazy-loaded, default module export route handler
  .post('/submit', { submitRoute: () => import('./routes/submitRoute.mts') })      // Lazy-loaded, named module export route handler
  .get('/**', () => new Response('404 page', { status: 404 }))                     // Eagerly-loaded route handler
  .all('/**', () => new Response('', { headers: { allow: 'GET' }, status: 405 })); // Eagerly-loaded route handler
```

#### Constructors

##### new Router(startTime, usesServerTiming)

> **new Router**(`startTime`?, `usesServerTiming`?): [`Router`](routerUtils.md#router)

Constructor that creates an empty array for route definitions.

###### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `startTime`? | `number` | `undefined` | The start time of loading a route; used to compute `Server-Timing` duration. |
| `usesServerTiming`? | `boolean` | `true` | Boolean indicating if `Server-Timing` headers are appended to the request object or not. |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

[routerUtils.mts:61](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L61)

#### Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `#routes` | `private` | `Routes` |
| `#startTime` | `private` | `number` |
| `#usesServerTiming` | `private` | `boolean` |

#### Methods

##### #handleMethod()

> **`private`** **#handleMethod**(`path`, `routeHandler`, `method`): [`Router`](routerUtils.md#router)

Register a route handler for the specified HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |
| `method` | `"ALL"` \| `"DELETE"` \| `"GET"` \| `"HEAD"` \| `"OPTIONS"` \| `"PATCH"` \| `"POST"` \| `"PUT"` | A valid HTTP method. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:138](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L138)

##### all()

> **all**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches all HTTP request methods.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.all('/**', () => new Response('', { headers: { allow: 'GET' }, status: 405 }));
```

###### Source

[routerUtils.mts:156](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L156)

##### delete()

> **delete**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `DELETE` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.delete('/item', { deleteItemRoute: () => import('./routes/deleteItemRoute.mts') })
```

###### Source

[routerUtils.mts:170](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L170)

##### get()

> **get**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `GET` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.get('/*', { pageRoute: () => import('./routes/pageRoute.mts') })
```

###### Source

[routerUtils.mts:184](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L184)

##### handleRequest()

> **handleRequest**(`request`): `Promise`\<`Response`\>

Handles the incoming request after all route definitions have been made.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request` | The `Request` object for the incoming request. |

###### Returns

`Promise`\<`Response`\>

A `Response` object to build the response sent to the requester.

###### Source

[routerUtils.mts:92](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L92)

##### head()

> **head**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `HEAD` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.head('/*', { pageRoute: () => import('./routes/pageRoute.mts') })
```

###### Source

[routerUtils.mts:198](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L198)

##### options()

> **options**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `OPTIONS` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.options('/item', { deleteItemRoute: () => import('./routes/deleteItemRoute.mts') })
```

###### Source

[routerUtils.mts:212](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L212)

##### patch()

> **patch**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PATCH` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.patch('/item', { patchItemRoute: () => import('./routes/patchItemRoute.mts') })
```

###### Source

[routerUtils.mts:226](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L226)

##### post()

> **post**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `POST` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.post('/item', { postItemRoute: () => import('./routes/postItemRoute.mts') })
```

###### Source

[routerUtils.mts:240](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L240)

##### put()

> **put**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PUT` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.put('/item', { putItemRoute: () => import('./routes/putItemRoute.mts') })
```

###### Source

[routerUtils.mts:254](https://github.com/mangs/bun-utils/blob/346bcd11e27f5359bb6ecad243f3213753f58752/src/routerUtils.mts#L254)
