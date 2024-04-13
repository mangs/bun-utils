# routerUtils

## Classes

### Router

Simple router that handles both eager- and lazy-loaded route handlers to keep your bundle sizes
small. Both default and named module exports are supported with a concise syntax.

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

##### new Router()

> **new Router**(): [`Router`](routerUtils.md#router)

Constructor that creates an empty array for route definitions.

###### Returns

[`Router`](routerUtils.md#router)

###### Source

[routerUtils.mts:54](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L54)

#### Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `#routes` | `private` | `Routes` |

#### Methods

##### #handleMethod()

> **`private`** **#handleMethod**(`path`, `routeHandler`, `method`): [`Router`](routerUtils.md#router)

Register a route handler for the specified HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |
| `method` | `"ALL"` \| `"DELETE"` \| `"GET"` \| `"HEAD"` \| `"OPTIONS"` \| `"PATCH"` \| `"POST"` \| `"PUT"` | A valid HTTP method. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:119](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L119)

##### all()

> **all**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches all HTTP request methods.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:133](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L133)

##### delete()

> **delete**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `DELETE` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:143](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L143)

##### get()

> **get**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `GET` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:153](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L153)

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

[routerUtils.mts:79](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L79)

##### head()

> **head**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `HEAD` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:163](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L163)

##### options()

> **options**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `OPTIONS` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:173](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L173)

##### patch()

> **patch**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PATCH` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:183](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L183)

##### post()

> **post**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `POST` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:193](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L193)

##### put()

> **put**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

Register a route handler that matches the `PUT` HTTP request method.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | A path-like string that will be used to match against the incoming request's path. |
| `routeHandler` | `RouteHandler` | The function that will execute if this route handler is matched. |

###### Returns

[`Router`](routerUtils.md#router)

A reference to the instantiated instance (`this`) so route handler definitions can be chained.

###### Source

[routerUtils.mts:203](https://github.com/mangs/bun-utils/blob/b4fd429dde11e41571a12d8fccdcd88d164fe6a4/utils/routerUtils.mts#L203)
