# buildUtils

## Functions

### buildAndShowMetadata()

> **buildAndShowMetadata**(`buildConfiguration`): `Promise`\<`0` \| `1`\>

Build code using `Bun.build` and a provided build configuration object.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `buildConfiguration` | `BuildConfig` | Configuration object used to build the code. |

#### Returns

`Promise`\<`0` \| `1`\>

Number corresponding to the desired process exit code.

#### Example

```ts
import { buildAndShowMetadata } from '@mangs/bun-utils/build';
import type { BuildConfig } from 'bun';

const buildConfiguration = {
  entrypoints: ['./src/index.mts'],
  minify: true,
  outdir: './dist',
} satisfies BuildConfig;
process.exitCode = await buildAndShowMetadata(buildConfiguration);
```

#### Source

[buildUtils.mts:45](https://github.com/mangs/bun-utils/blob/52990b884543c59389dfe31a2d841a6020dacbfe/src/buildUtils.mts#L45)

***

### printBuildMetadata()

> **printBuildMetadata**(`buildOutput`, `buildOutputDirectory`): `void`

Format and print to the command line the provided build metadata.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `buildOutput` | `BuildOutput` | The return value of `Bun.build()`. |
| `buildOutputDirectory` | `string` | The output directory when building. |

#### Returns

`void`

#### Source

[buildUtils.mts:74](https://github.com/mangs/bun-utils/blob/52990b884543c59389dfe31a2d841a6020dacbfe/src/buildUtils.mts#L74)
