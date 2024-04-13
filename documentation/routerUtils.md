# routerUtils

## Classes

### Router

Simple router that handles both eager- and lazy-loaded route handlers to keep your bundle sizes
small.

For path matches, `*` matches any character except `/` whereas `**` matches all characters.

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

[routerUtils.mts:47](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L47)

#### Properties

| Property | Type |
| :------ | :------ |
| `routes` | `Routes` |

#### Methods

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

[routerUtils.mts:126](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L126)

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

[routerUtils.mts:136](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L136)

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

[routerUtils.mts:146](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L146)

##### handleMethod()

> **handleMethod**(`path`, `routeHandler`, `method`): [`Router`](routerUtils.md#router)

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

[routerUtils.mts:112](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L112)

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

[routerUtils.mts:72](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L72)

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

[routerUtils.mts:156](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L156)

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

[routerUtils.mts:166](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L166)

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

[routerUtils.mts:176](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L176)

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

[routerUtils.mts:186](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L186)

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

[routerUtils.mts:196](https://github.com/mangs/bun-utils/blob/b056bca4dd6b992f38f9c2aafc52f1e8fc64d87d/utils/routerUtils.mts#L196)
