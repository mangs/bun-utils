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
| `onBypassRetry?` | (`statusCode`: `number`) => `boolean` | Function allowing arbitrary status codes to bypass the retry process. **Example** `fetchWithRetry(url, { onBypassRetry: (statusCode) => statusCode === 404 });` | - | [src/networkUtils.mts:34](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L34) |
| `onChangeRetryDelay?` | (`delay`: `number`) => `number` | Function describing how `retryDelay` changes with each retry iteration. | - | [src/networkUtils.mts:40](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L40) |
| `priority?` | `RequestPriority` | - | `FetchRequestInit.priority` | node\_modules/typescript/lib/lib.dom.d.ts:1708 |
| `proxy?` | `string` | Override http_proxy or HTTPS_PROXY This is a custom property that is not part of the Fetch API specification. | `FetchRequestInit.proxy` | node\_modules/bun-types/globals.d.ts:894 |
| `redirect?` | `RequestRedirect` | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. | `FetchRequestInit.redirect` | node\_modules/typescript/lib/lib.dom.d.ts:1710 |
| `referrer?` | `string` | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. | `FetchRequestInit.referrer` | node\_modules/typescript/lib/lib.dom.d.ts:1712 |
| `referrerPolicy?` | `ReferrerPolicy` | A referrer policy to set request's referrerPolicy. | `FetchRequestInit.referrerPolicy` | node\_modules/typescript/lib/lib.dom.d.ts:1714 |
| `retries?` | `number` | Maximum number of retries before an error is thrown. | - | [src/networkUtils.mts:48](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L48) |
| `retryDelay?` | `number` | Delay between retries; `onChangeRetryDelay` affects how it changes between retry iterations. | - | [src/networkUtils.mts:44](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L44) |
| `signal?` | `null` \| `AbortSignal` | An AbortSignal to set request's signal. | `FetchRequestInit.signal` | node\_modules/typescript/lib/lib.dom.d.ts:1716 |
| `timeout?` | `number` | Time until the `fetch` request times out; can alternatively be overridden by passing an `AbortSignal` value to the `options.signal` parameter member. | - | [src/networkUtils.mts:52](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L52) |
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
| `certificateAuthorityPath?` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.ca` option but only the path. | [src/networkUtils.mts:59](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L59) |
| `certificatePath` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.cert` option but only the path. | [src/networkUtils.mts:63](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L63) |
| `diffieHellmanParametersPath?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.dhParamsFile` option. | [src/networkUtils.mts:67](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L67) |
| `lowMemoryMode?` | `boolean` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.lowMemoryMode` option. | [src/networkUtils.mts:71](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L71) |
| `passphrase?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.passphrase` option. | [src/networkUtils.mts:75](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L75) |
| `privateKeyPath` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.key` option but only the path. | [src/networkUtils.mts:79](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L79) |
| `serverName?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.serverName` option. | [src/networkUtils.mts:83](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L83) |

***

### ServerConfiguration

#### Extends

- `Pick`\<`ServeOptions`, `"error"` \| `"hostname"` \| `"port"`\>

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `error?` | (`this`: `Server`, `request`: `ErrorLike`) => `undefined` \| `Response` \| `Promise`\<`Response`\> \| `Promise`\<`undefined`\> | - | `Pick.error` | node\_modules/bun-types/bun.d.ts:2357 |
| `hostname?` | `string` | What hostname should the server listen on? **Default** `"0.0.0.0" // listen on all interfaces` **Examples** `"127.0.0.1" // Only listen locally` `"remix.run" // Only listen on remix.run`` note: hostname should not include a {@link port} | `Pick.hostname` | node\_modules/bun-types/bun.d.ts:2412 |
| `httpsOptions?` | [`HttpsOptions`](networkUtils.md#httpsoptions) | Options for customizing HTTPS functionality. | - | [src/networkUtils.mts:90](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L90) |
| `port?` | `string` \| `number` | What port should the server listen on? **Default** `process.env.PORT || "3000"` | `Pick.port` | node\_modules/bun-types/bun.d.ts:2383 |

## Functions

### fetchWithRetry()

> **fetchWithRetry**(`url`, `options`): `Promise`\<`Response`\>

`fetch` with auto-retry and auto-timeout support. Follows an exponential backoff strategy by
default starting with a delay of 1 second. Times out after 10 seconds by default. Client error
response codes (`400`s) bypass retries by default whereas server error response codes (`500`s) do
not; use option `onBypassRetry` to customize this behavior. Setting environment variable `DEBUG`
to a truthy value logs caught and ignored retry errors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` \| `URL` \| `Request` | URL from which to fetch data. |
| `options` | [`FetchRetryOptions`](networkUtils.md#fetchretryoptions) | Options object that combines `fetch`'s 2nd parameter with custom options. |

#### Returns

`Promise`\<`Response`\>

Data returned by `fetch`.

#### Defined in

[src/networkUtils.mts:104](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L104)

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

[src/networkUtils.mts:191](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/networkUtils.mts#L191)
