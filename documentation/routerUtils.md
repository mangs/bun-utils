# routerUtils

## Classes

### Router

hello

#### Constructors

##### new Router()

> **new Router**(): [`Router`](routerUtils.md#router)

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:33

#### Properties

| Property | Type |
| :------ | :------ |
| `routes` | `Routes` |

#### Methods

##### all()

> **all**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:94

##### delete()

> **delete**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:98

##### get()

> **get**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:102

##### handleMethod()

> **handleMethod**(`path`, `routeHandler`, `method`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |
| `method` | `"ALL"` \| `"DELETE"` \| `"GET"` \| `"HEAD"` \| `"OPTIONS"` \| `"PATCH"` \| `"POST"` \| `"PUT"` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:86

##### handleRequest()

> **handleRequest**(`request`): `Promise`\<`Response`\>

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | `Request` |

###### Returns

`Promise`\<`Response`\>

###### Source

routerUtils.mts:53

##### head()

> **head**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:106

##### options()

> **options**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:110

##### patch()

> **patch**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:114

##### post()

> **post**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:118

##### put()

> **put**(`path`, `routeHandler`): [`Router`](routerUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](routerUtils.md#router)

###### Source

routerUtils.mts:122
