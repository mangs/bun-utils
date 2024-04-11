# networkUtils

## Functions

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`void`\>

Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
server. Optionally specify a configuration object to customize functionality as follows:
```ts
{
  hostname?: string; // Defaults to localhost
  httpsOptions?: {
    certificatePath: string | string[];
    certificateAuthorityPath?: string | string[];
    diffieHellmanParametersPath?: string;
    passphrase?: string;
    privateKeyPath: string | string[];
  };
  port?: string | number; // Defaults to process.env.DEVELOPMENT_SERVER_PORT or 3_000 for HTTP, 443 for HTTPS
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

[networkUtils.mts:97](https://github.com/mangs/bun-utils/blob/cdce40152e61089ecb23b11384de2237c07cb1a2/utils/networkUtils.mts#L97)
