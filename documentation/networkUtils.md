# networkUtils

## Classes

### Router

#### Constructors

##### new Router()

> **new Router**(): [`Router`](networkUtils.md#router)

###### Returns

[`Router`](networkUtils.md#router)

###### Source

[networkUtils.mts:219](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L219)

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

[networkUtils.mts:258](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L258)

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

[networkUtils.mts:266](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L266)

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

[networkUtils.mts:270](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L270)

##### init()

> **init**(`request`): `Promise`\<`undefined` \| `Response` \| `RouteHandlerFunction`\>

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | `Request` |

###### Returns

`Promise`\<`undefined` \| `Response` \| `RouteHandlerFunction`\>

###### Source

[networkUtils.mts:239](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L239)

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

[networkUtils.mts:274](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L274)

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

[networkUtils.mts:278](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L278)

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

[networkUtils.mts:282](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L282)

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

[networkUtils.mts:122](https://github.com/mangs/bun-utils/blob/1d0f7999385f4bb5b1f6352bb1eed49a200a26b1/utils/networkUtils.mts#L122)
