# networkUtils

## Functions

### startDevelopmentServer()

> **startDevelopmentServer**(`entrypointFunction`: (`request`: `Request`) => `Response` \| `Promise`\<`Response`\>, `hostname`?: `string`, `httpsOptions`?: `HttpsOptions`): `Promise`\<`void`\>

Start a development server using Bun.serve() and the provided entrypoint function. Optionally
specify a hostname and options for enabling HTTPS-based serving.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `entrypointFunction` | (`request`: `Request`) => `Response` \| `Promise`\<`Response`\> | The function used to start running the server. |
| `hostname`? | `string` | An optional hostname upon which to listen. |
| `httpsOptions`? | `HttpsOptions` | An optional configuration set to enable HTTPS-based serving. |

#### Returns

`Promise`\<`void`\>
