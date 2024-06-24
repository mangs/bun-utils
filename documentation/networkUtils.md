# networkUtils

## Interfaces

### FetchRetryOptions

#### Extends

- `FetchRequestInit`

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `body?` | `null` \| `BodyInit` | A BodyInit object or null to set request's body. | `FetchRequestInit.body` | node\_modules/typescript/lib/lib.dom.d.ts:1693 |
| `cache?` | `RequestCache` | A string indicating how the request will interact with the browser's cache to set request's cache. | `FetchRequestInit.cache` | node\_modules/typescript/lib/lib.dom.d.ts:1695 |
| `credentials?` | `RequestCredentials` | A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. | `FetchRequestInit.credentials` | node\_modules/typescript/lib/lib.dom.d.ts:1697 |
| `headers?` | `HeadersInit` | A Headers object, an object literal, or an array of two-item arrays to set request's headers. | `FetchRequestInit.headers` | node\_modules/typescript/lib/lib.dom.d.ts:1699 |
| `integrity?` | `string` | A cryptographic hash of the resource to be fetched by request. Sets request's integrity. | `FetchRequestInit.integrity` | node\_modules/typescript/lib/lib.dom.d.ts:1701 |
| `keepalive?` | `boolean` | A boolean to set request's keepalive. | `FetchRequestInit.keepalive` | node\_modules/typescript/lib/lib.dom.d.ts:1703 |
| `method?` | `string` | A string to set request's method. | `FetchRequestInit.method` | node\_modules/typescript/lib/lib.dom.d.ts:1705 |
| `mode?` | `RequestMode` | A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. | `FetchRequestInit.mode` | node\_modules/typescript/lib/lib.dom.d.ts:1707 |
| `onChangeRetryDelay?` | (`delay`: `number`) => `number` | Function describing how `retryDelay` changes with each retry iteration. | - | [src/networkUtils.mts:30](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L30) |
| `priority?` | `RequestPriority` | - | `FetchRequestInit.priority` | node\_modules/typescript/lib/lib.dom.d.ts:1708 |
| `proxy?` | `string` | Override http_proxy or HTTPS_PROXY This is a custom property that is not part of the Fetch API specification. | `FetchRequestInit.proxy` | node\_modules/bun-types/globals.d.ts:894 |
| `redirect?` | `RequestRedirect` | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. | `FetchRequestInit.redirect` | node\_modules/typescript/lib/lib.dom.d.ts:1710 |
| `referrer?` | `string` | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. | `FetchRequestInit.referrer` | node\_modules/typescript/lib/lib.dom.d.ts:1712 |
| `referrerPolicy?` | `ReferrerPolicy` | A referrer policy to set request's referrerPolicy. | `FetchRequestInit.referrerPolicy` | node\_modules/typescript/lib/lib.dom.d.ts:1714 |
| `retries?` | `number` | Maximum number of retries before an error is thrown. | - | [src/networkUtils.mts:38](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L38) |
| `retryDelay?` | `number` | Delay between retries; `onChangeRetryDelay` affects how it changes between retry iterations. | - | [src/networkUtils.mts:34](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L34) |
| `signal?` | `null` \| `AbortSignal` | An AbortSignal to set request's signal. | `FetchRequestInit.signal` | node\_modules/typescript/lib/lib.dom.d.ts:1716 |
| `timeout?` | `number` | Time until the `fetch` request times out; can alternatively be overridden by passing an `AbortSignal` value to the `options.signal` parameter member. | - | [src/networkUtils.mts:42](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L42) |
| `tls?` | `object` | Override the default TLS options | `FetchRequestInit.tls` | node\_modules/bun-types/globals.d.ts:899 |
| `tls.checkServerIdentity?` | `any` | - | - | node\_modules/bun-types/globals.d.ts:901 |
| `tls.rejectUnauthorized?` | `boolean` | - | - | node\_modules/bun-types/globals.d.ts:900 |
| `verbose?` | `boolean` | Log the raw HTTP request & response to stdout. This API may be removed in a future version of Bun without notice. This is a custom property that is not part of the Fetch API specification. It exists mostly as a debugging tool | `FetchRequestInit.verbose` | node\_modules/bun-types/globals.d.ts:889 |
| `window?` | `null` | Can only be null. Used to disassociate request from any Window. | `FetchRequestInit.window` | node\_modules/typescript/lib/lib.dom.d.ts:1718 |

***

### HttpsOptions

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `certificateAuthorityPath?` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.ca` option but only the path. | [src/networkUtils.mts:49](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L49) |
| `certificatePath` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.cert` option but only the path. | [src/networkUtils.mts:53](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L53) |
| `diffieHellmanParametersPath?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.dhParamsFile` option. | [src/networkUtils.mts:57](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L57) |
| `lowMemoryMode?` | `boolean` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.lowMemoryMode` option. | [src/networkUtils.mts:61](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L61) |
| `passphrase?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.passphrase` option. | [src/networkUtils.mts:65](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L65) |
| `privateKeyPath` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.key` option but only the path. | [src/networkUtils.mts:69](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L69) |
| `serverName?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.serverName` option. | [src/networkUtils.mts:73](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L73) |

***

### ServerConfiguration

#### Extends

- `Pick`\<`ServeOptions`, `"error"` \| `"hostname"` \| `"port"`\>

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `error?` | (`this`: `Server`, `request`: `ErrorLike`) => `undefined` \| `Response` \| `Promise`\<`Response`\> \| `Promise`\<`undefined`\> | - | `Pick.error` | node\_modules/bun-types/bun.d.ts:2357 |
| `hostname?` | `string` | What hostname should the server listen on? **Default** `"0.0.0.0" // listen on all interfaces` **Examples** `"127.0.0.1" // Only listen locally` `"remix.run" // Only listen on remix.run`` note: hostname should not include a {@link port} | `Pick.hostname` | node\_modules/bun-types/bun.d.ts:2412 |
| `httpsOptions?` | [`HttpsOptions`](networkUtils.md#httpsoptions) | Options for customizing HTTPS functionality. | - | [src/networkUtils.mts:80](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L80) |
| `port?` | `string` \| `number` | What port should the server listen on? **Default** `process.env.PORT || "3000"` | `Pick.port` | node\_modules/bun-types/bun.d.ts:2383 |

## Functions

### fetchWithRetry()

> **fetchWithRetry**(`url`, `options`): `Promise`\<`Response`\>

`fetch` with auto-retry and auto-timeout support. Follows an exponential backoff strategy by
default starting with a delay of 1 second. Times out after 10 seconds by default. Setting
environment variable `DEBUG` to a truthy value logs caught and ignored retry errors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` \| `URL` \| `Request` | URL from which to fetch data. |
| `options` | [`FetchRetryOptions`](networkUtils.md#fetchretryoptions) | Options object that combines `fetch`'s 2nd parameter with custom options. |

#### Returns

`Promise`\<`Response`\>

Data returned by `fetch`.

#### Defined in

[src/networkUtils.mts:92](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L92)

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
| ------ | ------ | ------ |
| `entrypointFunction` | (`this`, `request`, `server`) => `Response` \| `Promise`\<`Response`\> \| (`this`, `request`, `server`) => `Response` \| `Promise`\<`Response`\> \| (`this`, `request`, `server`) => `undefined` \| `void` \| `Response` \| `Promise`\<`undefined` \| `void` \| `Response`\> \| (`this`, `request`, `server`) => `undefined` \| `Response` \| `Promise`\<`undefined` \| `Response`\> | The function used to start running the server. |
| `serverConfiguration` | [`ServerConfiguration`](networkUtils.md#serverconfiguration) | An optional configuration object. |

#### Returns

`Promise`\<`Server`\>

`Promise` resolving to the return value of `Bun.serve()`.

#### Defined in

[src/networkUtils.mts:177](https://github.com/mangs/bun-utils/blob/73c98d4a4dbe75cd430fab09115be246e44c953f/src/networkUtils.mts#L177)
