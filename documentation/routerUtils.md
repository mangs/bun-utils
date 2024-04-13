# routerUtils

## Classes

### Router

Simple router that handles both eager- and lazy-loaded route handlers to keep your bundle sizes
small.

Path matches follow glob rules by using `Bun.Glob`. See the
[documentation for `Bun.Glob`](https://bun.sh/docs/api/glob) for details.

#### Example

```ts
const router = new Router();
router
  .get('/*', { pageRoute: import('./routes/pageRoute.mts') })
  .post('/submit', { submitRoute: import('./routes/submitRoute.mts') })
  .all('**', () => new Response('404 page', { status: 404 }));
```

#### Constructors

##### new Router()

> **new Router**(): [`Router`](routerUtils.md#router)

Constructor that creates an empty array for route definitions.

###### Returns

[`Router`](routerUtils.md#router)

###### Source

[routerUtils.mts:51](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L51)

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

[routerUtils.mts:116](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L116)

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

[routerUtils.mts:130](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L130)

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

[routerUtils.mts:140](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L140)

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

[routerUtils.mts:150](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L150)

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

[routerUtils.mts:76](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L76)

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

[routerUtils.mts:160](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L160)

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

[routerUtils.mts:170](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L170)

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

[routerUtils.mts:180](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L180)

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

[routerUtils.mts:190](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L190)

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

[routerUtils.mts:200](https://github.com/mangs/bun-utils/blob/d23e080d00ad3069d730f262f13ace849cfff11e/utils/routerUtils.mts#L200)
