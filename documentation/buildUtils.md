# buildUtils

## Functions

### buildAndShowMetadata()

> **buildAndShowMetadata**(`buildConfiguration`): `Promise`\<`0` \| `1`\>

Build code using `Bun.build` and a provided build configuration object.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `buildConfiguration` | `BuildConfiguration` | Configuration object used to build the code. |

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

[buildUtils.mts:48](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/buildUtils.mts#L48)

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

[buildUtils.mts:73](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/buildUtils.mts#L73)
