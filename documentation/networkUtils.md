# networkUtils

## Functions

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`void`\>

Start a development server using Bun.serve() and the provided entrypoint function. Optionally
specify a configuration object to customize functionality as follows:
```ts
{
  hostname?: string;
  httpsOptions?: {
    certificate: string;
    certificateAuthority?: string;
    diffieHellmanParametersPath?: string;
    passphrase?: string;
    privateKey: string;
  }
  port?: number;
}
```
Multiple server instances can be started simultaneously with unique port values.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `entrypointFunction` | (`request`) => `Response` \| `Promise`\<`Response`\> | The function used to start running the server. |
| `serverConfiguration` | `ServerConfiguration` | An optional configuration object. |

#### Returns

`Promise`\<`void`\>

#### Source

[networkUtils.mts:98](https://github.com/mangs/bun-utils/blob/7f057e115cc8ad9f42118a3bdc19b9262011087e/utils/networkUtils.mts#L98)
