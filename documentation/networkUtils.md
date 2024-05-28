# networkUtils

## Interfaces

### FetchRetryOptions

#### Extends

- `FetchRequestInit`

#### Properties

| Property | Type | Description | Inherited from |
| :------ | :------ | :------ | :------ |
| `body?` | `null` \| `BodyInit` | A BodyInit object or null to set request's body. | `FetchRequestInit.body` |
| `cache?` | `RequestCache` | A string indicating how the request will interact with the browser's cache to set request's cache. | `FetchRequestInit.cache` |
| `credentials?` | `RequestCredentials` | A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. | `FetchRequestInit.credentials` |
| `headers?` | `HeadersInit` | A Headers object, an object literal, or an array of two-item arrays to set request's headers. | `FetchRequestInit.headers` |
| `integrity?` | `string` | A cryptographic hash of the resource to be fetched by request. Sets request's integrity. | `FetchRequestInit.integrity` |
| `keepalive?` | `boolean` | A boolean to set request's keepalive. | `FetchRequestInit.keepalive` |
| `method?` | `string` | A string to set request's method. | `FetchRequestInit.method` |
| `mode?` | `RequestMode` | A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. | `FetchRequestInit.mode` |
| `onChangeRetryDelay?` | (`delay`: `number`) => `number` | <p>Function describing how `retryDelay` changes with each retry iteration.</p> | - |
| `priority?` | `RequestPriority` | - | `FetchRequestInit.priority` |
| `proxy?` | `string` | Override http_proxy or HTTPS_PROXY This is a custom property that is not part of the Fetch API specification. | `FetchRequestInit.proxy` |
| `redirect?` | `RequestRedirect` | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. | `FetchRequestInit.redirect` |
| `referrer?` | `string` | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. | `FetchRequestInit.referrer` |
| `referrerPolicy?` | `ReferrerPolicy` | A referrer policy to set request's referrerPolicy. | `FetchRequestInit.referrerPolicy` |
| `retryDelay?` | `number` | Delay between retries; `onChangeRetryDelay` affects how it changes between retry iterations. | - |
| `retryMax?` | `number` | Maximum number of retries before an error is thrown. | - |
| `signal?` | `null` \| `AbortSignal` | An AbortSignal to set request's signal. | `FetchRequestInit.signal` |
| `timeout?` | `number` | Time until the `fetch` request times out; can alternatively be overridden by passing an `AbortSignal` value to the `options.signal` parameter member. | - |
| `tls?` | `object` | Override the default TLS options | `FetchRequestInit.tls` |
| `tls.checkServerIdentity?` | `any` | - | - |
| `tls.rejectUnauthorized?` | `boolean` | - | - |
| `verbose?` | `boolean` | Log the raw HTTP request & response to stdout. This API may be removed in a future version of Bun without notice. This is a custom property that is not part of the Fetch API specification. It exists mostly as a debugging tool | `FetchRequestInit.verbose` |
| `window?` | `null` | Can only be null. Used to disassociate request from any Window. | `FetchRequestInit.window` |

***

### HttpsOptions

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `certificateAuthorityPath?` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.ca` option but only the path. |
| `certificatePath` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.cert` option but only the path. |
| `diffieHellmanParametersPath?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.dhParamsFile` option. |
| `lowMemoryMode?` | `boolean` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.lowMemoryMode` option. |
| `passphrase?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.passphrase` option. |
| `privateKeyPath` | `string` \| `string`[] | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.key` option but only the path. |
| `serverName?` | `string` | Maps to [`Bun.serve()`](https://bun.sh/docs/api/http#tls)'s `tls.serverName` option. |

***

### ServerConfiguration

#### Extends

- `Pick`\<`ServeOptions`, `"error"` \| `"hostname"` \| `"port"`\>

#### Properties

| Property | Type | Description | Inherited from |
| :------ | :------ | :------ | :------ |
| `error?` | (`this`: `Server`, `request`: `ErrorLike`) => `undefined` \| `Response` \| `Promise`\<`Response`\> \| `Promise`\<`undefined`\> | - | `Pick.error` |
| `hostname?` | `string` | <p>What hostname should the server listen on?</p><p>**Default**</p><code>"0.0.0.0" // listen on all interfaces</code><p>**Examples**</p><code>"127.0.0.1" // Only listen locally</code><p>___CODEBLOCKPLACEHOLDER___ `</p><p>note: hostname should not include a {@link port}</p> | `Pick.hostname` |
| `httpsOptions?` | [`HttpsOptions`](networkUtils.md#httpsoptions) | Options for customizing HTTPS functionality. | - |
| `port?` | `string` \| `number` | <p>What port should the server listen on?</p><p>**Default**</p><code>process.env.PORT \|\| "3000"</code> | `Pick.port` |

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

[src/networkUtils.mts:92](https://github.com/mangs/bun-utils/blob/dff582c34172a7082136d2de8a821843d34de213/src/networkUtils.mts#L92)

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
| `entrypointFunction` | (`this`, `request`, `server`) => `Response` \| `Promise`\<`Response`\> \| (`this`, `request`, `server`) => `Response` \| `Promise`\<`Response`\> \| (`this`, `request`, `server`) => `undefined` \| `void` \| `Response` \| `Promise`\<`undefined` \| `void` \| `Response`\> \| (`this`, `request`, `server`) => `undefined` \| `Response` \| `Promise`\<`undefined` \| `Response`\> | The function used to start running the server. |
| `serverConfiguration` | [`ServerConfiguration`](networkUtils.md#serverconfiguration) | An optional configuration object. |

#### Returns

`Promise`\<`Server`\>

`Promise` resolving to the return value of `Bun.serve()`.

#### Source

[src/networkUtils.mts:179](https://github.com/mangs/bun-utils/blob/dff582c34172a7082136d2de8a821843d34de213/src/networkUtils.mts#L179)
