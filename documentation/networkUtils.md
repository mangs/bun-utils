# networkUtils

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
**NOTE 2:** the exact configuration options used to start a server are logged to the console if the DEBUG environment variable is set to a truthy value.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `entrypointFunction` | (`request`) => `Response` \| `Promise`\<`Response`\> | The function used to start running the server. |
| `serverConfiguration` | `ServerConfiguration` | An optional configuration object. |

#### Returns

`Promise`\<`void`\>

#### Source

[networkUtils.mts:101](https://github.com/mangs/bun-utils/blob/6bdaa256b68a85bb20e69f8fa75b49976cb088b0/utils/networkUtils.mts#L101)
