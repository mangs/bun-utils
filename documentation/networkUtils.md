# networkUtils

## Functions

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`void`\>

Start a development server with the provided entrypoint function; uses `Bun.serve()` as a web
server. Optionally specify a configuration object to customize functionality as follows:
```ts
{
  hostname?: string; // Defaulgwts to localhost
  httpsOptions?: {
    certificatePath: string | string[];
    certificateAuthorityPath?: string | string[];
    diffieHellmanParametersPath?: string;
    passphrase?: string;
    privateKeyPath: string | string[];
  };
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

[networkUtils.mts:96](https://github.com/mangs/bun-utils/blob/83528b5827d44ec060c437224c6d2c34b0113b13/utils/networkUtils.mts#L96)
