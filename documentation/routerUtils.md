# routerUtils

## Classes

### Router

Simple router that handles both eager- and lazy-loaded route handlers to keep your bundle sizes
small. Both default and named module exports are supported with a concise syntax. Appends
`Server-Timing` values for route loading duration to the request headers; can be disabled via the
constructor.

Path matches follow glob rules by using `Bun.Glob`. See the
[documentation for `Bun.Glob`](https://bun.sh/docs/api/glob) for details.

#### Example

```ts
import { Router } from '@mangs/bun-utils/router';

const router = new Router();
router
  .get('/*', { pageRoute: () => import('./routes/pageRoute.mts') })
  .post('/submit', { submitRoute: () => import('./routes/submitRoute.mts') })
  .get('/**', () => new Response('404 page', { status: 404 }))
  .all('/**', () => new Response('', { headers: { allow: 'GET' }, status: 405 }));
```

#### Constructors

##### new Router(startTime, usesServerTiming)

> **new Router**(`startTime`?, `usesServerTiming`?): [`Router`](routerUtils.md#router)

Constructor that creates an empty array for route definitions.

###### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `startTime`? | `number` | `undefined` | The start time of loading a route; used to compute `Server-Timing`<br />                        duration. |
| `usesServerTiming`? | `boolean` | `true` | Boolean indicating if `Server-Timing` headers are appended to the<br />                        request object or not. |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

[routerUtils.mts:63](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L63)

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
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |
| `method` | `"ALL"` \| `"DELETE"` \| `"GET"` \| `"HEAD"` \| `"OPTIONS"` \| `"PATCH"` \| `"POST"` \| `"PUT"` | A valid HTTP method. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:142](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L142)

##### all()

> **all**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches all HTTP request methods.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:158](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L158)

##### delete()

> **delete**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `DELETE` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:170](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L170)

##### get()

> **get**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `GET` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:182](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L182)

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

[routerUtils.mts:94](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L94)

##### head()

> **head**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `HEAD` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:194](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L194)

##### options()

> **options**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `OPTIONS` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:206](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L206)

##### patch()

> **patch**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PATCH` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:218](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L218)

##### post()

> **post**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `POST` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:230](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L230)

##### put()

> **put**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PUT` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming<br />                    request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler
                    definitions can be chained.

###### Source

[routerUtils.mts:242](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/routerUtils.mts#L242)
