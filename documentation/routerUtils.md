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

##### new Router()

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

[src/routerUtils.mts:61](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L61)

#### Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `#routes` | `private` | [`Routes`](routerUtils.md#routes) |
| `#startTime` | `private` | `number` |
| `#usesServerTiming` | `private` | `boolean` |

#### Methods

##### #handleMethod()

> `private` **#handleMethod**(`path`, `routeHandler`, `method`): [`Router`](routerUtils.md#router)

Register a route handler for the specified HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |
| `method` | `"ALL"` \| `"DELETE"` \| `"GET"` \| `"HEAD"` \| `"OPTIONS"` \| `"PATCH"` \| `"POST"` \| `"PUT"` | A valid HTTP method. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[src/routerUtils.mts:138](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L138)

##### all()

> **all**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches all HTTP request methods.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.all('/**', () => new Response('', { headers: { allow: 'GET' }, status: 405 }));
```

###### Source

[src/routerUtils.mts:156](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L156)

##### delete()

> **delete**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `DELETE` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.delete('/item', { deleteItemRoute: () => import('./routes/deleteItemRoute.mts') })
```

###### Source

[src/routerUtils.mts:170](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L170)

##### get()

> **get**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `GET` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.get('/*', { pageRoute: () => import('./routes/pageRoute.mts') })
```

###### Source

[src/routerUtils.mts:184](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L184)

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

[src/routerUtils.mts:92](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L92)

##### head()

> **head**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `HEAD` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.head('/*', { pageRoute: () => import('./routes/pageRoute.mts') })
```

###### Source

[src/routerUtils.mts:198](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L198)

##### options()

> **options**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `OPTIONS` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.options('/item', { deleteItemRoute: () => import('./routes/deleteItemRoute.mts') })
```

###### Source

[src/routerUtils.mts:212](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L212)

##### patch()

> **patch**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PATCH` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.patch('/item', { patchItemRoute: () => import('./routes/patchItemRoute.mts') })
```

###### Source

[src/routerUtils.mts:226](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L226)

##### post()

> **post**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `POST` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.post('/item', { postItemRoute: () => import('./routes/postItemRoute.mts') })
```

###### Source

[src/routerUtils.mts:240](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L240)

##### put()

> **put**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PUT` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | [`RouteHandler`](routerUtils.md#routehandler) | The function that will execute if this route handler is matched. Eagerly-loaded route handlers pass functions in directly; lazy-loaded ones pass in an object whose key corresponds to a module's named export or `'default'` for default export. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Example

```ts
router.put('/item', { putItemRoute: () => import('./routes/putItemRoute.mts') })
```

###### Source

[src/routerUtils.mts:254](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L254)

## Type Aliases

### HttpRequestMethod

> **HttpRequestMethod**: *typeof* [`httpRequestMethods`](routerUtils.md#httprequestmethods)\[`number`\]

#### Source

[src/routerUtils.mts:12](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L12)

***

### RouteEntry

> **RouteEntry**: `Parameters`\<`InstanceType`\<*typeof* [`Router`](routerUtils.md#router)\>\[`"get"`\]\>

#### Source

[src/routerUtils.mts:16](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L16)

***

### RouteHandler

> **RouteHandler**: [`RouteHandlerFunction`](routerUtils.md#routehandlerfunction) \| [`RouteHandlerLazyLoaded`](routerUtils.md#routehandlerlazyloaded)

#### Source

[src/routerUtils.mts:15](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L15)

***

### RouteHandlerFunction()

> **RouteHandlerFunction**: (`request`) => `Response` \| `Promise`\<`Response`\>

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | `Request` |

#### Returns

`Response` \| `Promise`\<`Response`\>

#### Source

[src/routerUtils.mts:13](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L13)

***

### RouteHandlerLazyLoaded

> **RouteHandlerLazyLoaded**: `Record`\<`string`, () => `Promise`\<`Record`\<`string`, [`RouteHandlerFunction`](routerUtils.md#routehandlerfunction)\>\>\>

#### Source

[src/routerUtils.mts:14](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L14)

***

### Routes

> **Routes**: [[`HttpRequestMethod`](routerUtils.md#httprequestmethod), [`RouteEntry`](routerUtils.md#routeentry)][]

#### Source

[src/routerUtils.mts:17](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L17)

## Variables

### httpRequestMethods

> `const` **httpRequestMethods**: readonly [`"ALL"`, `"DELETE"`, `"GET"`, `"HEAD"`, `"OPTIONS"`, `"PATCH"`, `"POST"`, `"PUT"`]

#### Source

[src/routerUtils.mts:20](https://github.com/mangs/bun-utils/blob/8ab5575739fb6c2cf90f32b94496950103773510/src/routerUtils.mts#L20)
