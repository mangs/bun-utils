# networkUtils

## Functions

### fetchWithRetry()

> **fetchWithRetry**(`url`, `options`): `Promise`\<`Response`\>

`fetch` with auto-retry and auto-timeout support. Follows an exponential backoff strategy by
default starting with a delay of 1 second. Times out by default after 10 seconds.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` \| `Request` \| `URL` | URL from which to fetch data. |
| `options` | `FetchRetryOptions` | Options object that combines `fetch`'s 2nd parameter with 4 new values:<br />               • `changeRetryDelay`: function describing how `retryDelay` changes with each retry iteration.<br />               • `retryDelay`: delay between retries; `changeRetryDelay` affects how it changes between retry iterations.<br />               • `retryMax`: maximum number of retries before an error is thrown.<br />               • `timeout`: time until the `fetch` request times out; can alternatively be overridden by passing an `AbortSignal` value to the `options.signal` parameter member. |

#### Returns

`Promise`\<`Response`\>

Data returned by `fetch`.

#### Source

[networkUtils.mts:57](https://github.com/mangs/bun-utils/blob/2500dcec2d9866a2ad8127b4d7f1d83116c856ec/src/networkUtils.mts#L57)

***

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`void`\>

Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
server. The exact configuration options used are logged to the console if the `DEBUG` environment
variable is set to a truthy value.

Optionally specify a configuration object to customize functionality as follows:
```ts
{
  error?: (this: Server, request: ErrorLike) => Response | Promise<Response> | Promise<undefined> | undefined // Maps to Bun.serve()'s error option
  hostname?: string;                              // Defaults to localhost; maps to Bun.serve()'s hostname option
  httpsOptions?: {
    certificateAuthorityPath?: string | string[]; // Maps to Bun.serve()'s tls.ca option
    certificatePath: string | string[];           // Maps to Bun.serve()'s tls.cert option
    diffieHellmanParametersPath?: string;         // Maps to Bun.serve()'s tls.dhParamsFile option
    lowMemoryMode?: boolean;                      // Maps to Bun.serve()'s tls.lowMemoryMode option
    passphrase?: string;                          // Maps to Bun.serve()'s tls.passphrase option
    privateKeyPath: string | string[];            // Maps to Bun.serve()'s tls.key option
    serverName?: string;                          // Maps to Bun.serve()'s tls.serverName option
  };
  port?: string | number;                         // Defaults to process.env.DEVELOPMENT_SERVER_PORT else 80 for HTTP, 443 for HTTPS; maps to Bun.serve()'s port option
}
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

[networkUtils.mts:151](https://github.com/mangs/bun-utils/blob/2500dcec2d9866a2ad8127b4d7f1d83116c856ec/src/networkUtils.mts#L151)
