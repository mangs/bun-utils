# networkUtils

## Functions

### fetchWithRetry()

> **fetchWithRetry**(`url`, `options`): `Promise`\<`Response`\>

`fetch` with auto-retry support. Follows an exponential backoff strategy by default starting with
a delay of 1 second.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` \| `Request` \| `URL` | URL from which to fetch data. |
| `options` | `FetchRetryOptions` | Options object that combines `fetch`'s default 2nd parameter with 3 new values: `retryMax` for maximum number of retries before an error is thrown, `retryDelay` for the delay when retrying the first time, and `changeRetryDelay` which is a function that describes how `retryDelay` changes with each retry iteration. |

#### Returns

`Promise`\<`Response`\>

Data returned by `fetch`.

#### Source

[networkUtils.mts:52](https://github.com/mangs/bun-utils/blob/cc27859a6f116ad65fd001a6f8058b158d65f775/src/networkUtils.mts#L52)

***

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

[networkUtils.mts:137](https://github.com/mangs/bun-utils/blob/cc27859a6f116ad65fd001a6f8058b158d65f775/src/networkUtils.mts#L137)
