# networkUtils

## Classes

### Router

#### Constructors

##### new Router()

> **new Router**(): [`Router`](networkUtils.md#router)

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:214](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L214)

#### Properties

| Property | Type |
| :------ | :------ |
| `routes` | `Routes` |

#### Methods

##### all()

> **all**(`path`, `routeHandler`, `method`): [`Router`](networkUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |
| `method` | `"CONNECT"` \| `"DELETE"` \| `"GET"` \| `"HEAD"` \| `"OPTIONS"` \| `"PATCH"` \| `"POST"` \| `"PUT"` \| `"TRACE"` |

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:248](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L248)

##### delete()

> **delete**(`path`, `routeHandler`): [`Router`](networkUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:256](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L256)

##### get()

> **get**(`path`, `routeHandler`): [`Router`](networkUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:260](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L260)

##### init()

> **init**(`request`): `Response` \| `Promise`\<`Response`\>

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | `Request` |

###### Returns

`Response` \| `Promise`\<`Response`\>

###### Source

[networkUtils.mts:234](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L234)

##### patch()

> **patch**(`path`, `routeHandler`): [`Router`](networkUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:264](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L264)

##### post()

> **post**(`path`, `routeHandler`): [`Router`](networkUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:268](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L268)

##### put()

> **put**(`path`, `routeHandler`): [`Router`](networkUtils.md#router)

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `path` | `string` |
| `routeHandler` | `RouteHandler` |

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:272](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L272)

## Functions

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`void`\>

Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
server. The exact configuration options used are logged to the console if the `DEBUG` environment
variable is set to a truthy value.

Optionally specify a configuration object to customize functionality as follows:
```ts
{
  hostname?: string;                              // Defaults to localhost
  httpsOptions?: {
    certificatePath: string | string[];           // Maps to Bun.serve()'s tls.cert option
    certificateAuthorityPath?: string | string[]; // Maps to Bun.serve()'s tls.ca option
    diffieHellmanParametersPath?: string;         // Maps to Bun.serve()'s tls.dhParamsFile option
    passphrase?: string;                          // Maps to Bun.serve()'s tls.passphrase option
    privateKeyPath: string | string[];            // Maps to Bun.serve()'s tls.key option
  };
  port?: string | number;                         // Defaults to process.env.DEVELOPMENT_SERVER_PORT else 3_000 for HTTP, 443 for HTTPS
```
**NOTE:** multiple server instances can be started simultaneously with unique port values.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `entrypointFunction` | (`request`) => `Response` \| `Promise`\<`Response`\> | The function used to start running the server. |
| `serverConfiguration` | `ServerConfiguration` | An optional configuration object. |

#### Returns

`Promise`\<`void`\>

#### Source

[networkUtils.mts:117](https://github.com/mangs/bun-utils/blob/0b8b94d5d04e1095797ae3026600c6c71af718ca/utils/networkUtils.mts#L117)
