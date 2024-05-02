# buildUtils

## Interfaces

### BuildConfiguration

#### Extends

- `BuildConfig`

#### Properties

| Property | Type | Description | Overrides | Inherited from |
| :------ | :------ | :------ | :------ | :------ |
| `conditions?` | `string` \| `string`[] | package.json `exports` conditions used when resolving imports<br /><br />Equivalent to `--conditions` in `bun build` or `bun run`.<br /><br />https://nodejs.org/api/packages.html#exports | `BuildConfig.conditions` | `BuildConfig.conditions` |
| `define?` | `Record`\<`string`, `string`\> | - | `BuildConfig.define` | `BuildConfig.define` |
| `entrypoints` | `string`[] | - | `BuildConfig.entrypoints` | `BuildConfig.entrypoints` |
| `external?` | `string`[] | - | `BuildConfig.external` | `BuildConfig.external` |
| `format?` | `"esm"` | - | `BuildConfig.format` | `BuildConfig.format` |
| `loader?` | `object` | - | `BuildConfig.loader` | `BuildConfig.loader` |
| `minify?` | `boolean` \| `object` | - | `BuildConfig.minify` | `BuildConfig.minify` |
| `naming?` | `string` \| `object` | - | `BuildConfig.naming` | `BuildConfig.naming` |
| `outdir` | `string` | - | `BuildConfig.outdir` | `BuildConfig.outdir` |
| `plugins?` | `BunPlugin`[] | - | `BuildConfig.plugins` | `BuildConfig.plugins` |
| `publicPath?` | `string` | - | `BuildConfig.publicPath` | `BuildConfig.publicPath` |
| `root?` | `string` | - | `BuildConfig.root` | `BuildConfig.root` |
| `sourcemap?` | `"none"` \| `"inline"` \| `"external"` | - | `BuildConfig.sourcemap` | `BuildConfig.sourcemap` |
| `splitting?` | `boolean` | - | `BuildConfig.splitting` | `BuildConfig.splitting` |
| `target?` | `Target` | - | `BuildConfig.target` | `BuildConfig.target` |

## Functions

### buildAndShowMetadata()

> **buildAndShowMetadata**(`buildConfiguration`): `Promise`\<`0` \| `1`\>

Build code using `Bun.build` and a provided build configuration object.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `buildConfiguration` | [`BuildConfiguration`](buildUtils.md#buildconfiguration) | Configuration object used to build the code. |

#### Returns

`Promise`\<`0` \| `1`\>

Number corresponding to the desired process exit code.

#### Example

```ts
import { buildAndShowMetadata } from '@mangs/bun-utils/build';
import type { BuildConfiguration } from '@mangs/bun-utils/build';

const buildConfiguration = {
  entrypoints: ['./src/index.mts'],
  minify: true,
  outdir: './dist',
} satisfies BuildConfiguration;
process.exitCode = await buildAndShowMetadata(buildConfiguration);
```

#### Source

[src/buildUtils.mts:48](https://github.com/mangs/bun-utils/blob/78d0edde74d65ad31b3a8a440e4c442612a91b90/src/buildUtils.mts#L48)

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

[src/buildUtils.mts:73](https://github.com/mangs/bun-utils/blob/78d0edde74d65ad31b3a8a440e4c442612a91b90/src/buildUtils.mts#L73)
