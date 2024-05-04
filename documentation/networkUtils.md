# networkUtils

## Interfaces

### HttpsOptions

#### Properties

| Property | Type |
| :------ | :------ |
| `certificateAuthorityPath?` | `string` \| `string`[] |
| `certificatePath` | `string` \| `string`[] |
| `diffieHellmanParametersPath?` | `string` |
| `lowMemoryMode?` | `boolean` |
| `passphrase?` | `string` |
| `privateKeyPath` | `string` \| `string`[] |
| `serverName?` | `string` |

***

### ServerConfiguration

#### Extends

- `Pick`\<`ServeOptions`, `"error"` \| `"hostname"` \| `"port"`\>

#### Properties

| Property | Type | Description | Inherited from |
| :------ | :------ | :------ | :------ |
| `error?` | (`this`: `Server`, `request`: `ErrorLike`) => `undefined` \| `Response` \| `Promise`\<`Response`\> \| `Promise`\<`undefined`\> | - | `Pick.error` |
| `hostname?` | `string` | What hostname should the server listen on?**Default**`js<br />"0.0.0.0" // listen on all interfaces<br />`**Example**`js<br />"127.0.0.1" // Only listen locally<br />`**Example**`js<br />"remix.run" // Only listen on remix.run<br />``<br /><br />note: hostname should not include a {@link port} | `Pick.hostname` |
| `httpsOptions?` | [`HttpsOptions`](networkUtils.md#httpsoptions) | - | - |
| `port?` | `string` \| `number` | What port should the server listen on?<br /><br />**Default**<br />`process.env.PORT \|\| "3000"` | `Pick.port` |

## Type Aliases

### FetchRetryOptions

> **FetchRetryOptions**: `FetchRequestInit` & `object`

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `onChangeRetryDelay` | (`delay`) => `number` | Function describing how `retryDelay` changes with each retry iteration.<br /><br /> |
| `retryDelay` | `number` | Delay between retries; `onChangeRetryDelay` affects how it changes between retry iterations. |
| `retryMax` | `number` | Maximum number of retries before an error is thrown. |
| `timeout` | `number` | Time until the `fetch` request times out; can alternatively be overridden by passing an `AbortSignal` value to the `options.signal` parameter member. |

#### Source

[src/networkUtils.mts:18](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/networkUtils.mts#L18)

## Functions

### fetchWithRetry()

> **fetchWithRetry**(`url`, `options`): `Promise`\<`Response`\>

`fetch` with auto-retry and auto-timeout support. Follows an exponential backoff strategy by
default starting with a delay of 1 second. Times out after 10 seconds by default. Setting
environment variable `DEBUG` to a truthy value logs caught and ignored retry errors.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` \| `URL` \| `Request` | URL from which to fetch data. |
| `options` | [`FetchRetryOptions`](networkUtils.md#fetchretryoptions) | Options object that combines `fetch`'s 2nd parameter with custom options. |

#### Returns

`Promise`\<`Response`\>

Data returned by `fetch`.

#### Source

[src/networkUtils.mts:68](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/networkUtils.mts#L68)

***

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`Server`\>

Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
server. The exact configuration options used are logged to the console if the `DEBUG` environment
variable is set to a truthy value. Optionally specify a configuration object to customize
functionality.
**NOTE:** multiple server instances can be started simultaneously with unique port values.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `entrypointFunction` | (`request`) => `Response` \| `Promise`\<`Response`\> | The function used to start running the server. |
| `serverConfiguration` | [`ServerConfiguration`](networkUtils.md#serverconfiguration) | An optional configuration object. |

#### Returns

`Promise`\<`Server`\>

`Promise` resolving to the return value of `Bun.serve()`.

#### Source

[src/networkUtils.mts:155](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/networkUtils.mts#L155)
