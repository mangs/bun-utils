# networkUtils

## Functions

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`, `serverConfiguration`): `Promise`\<`void`\>

Start a development server using Bun.serve() and the provided entrypoint function. Optionally
specify a configuration object to customize functionality as follows:
\{
  hostname?: string;
  httpsOptions?: \{
    certificate: string;
    certificateAuthority?: string;
    diffieHellmanParametersPath?: string;
    passphrase?: string;
    privateKey: string;
  \}
  port?: number;
\}
Multiple server instances can be started simultaneously with unique port values.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `entrypointFunction` | (`request`) => `Response` \| `Promise`\<`Response`\> | The function used to start running the server. |
| `serverConfiguration` | `ServerConfiguration` | An optional configuration object. |

#### Returns

`Promise`\<`void`\>

#### Source

[networkUtils.mts:96](https://github.com/mangs/bun-utils/blob/44e9c57a5b260e4350f55bdadcc61e3921aa4e12/utils/networkUtils.mts#L96)
