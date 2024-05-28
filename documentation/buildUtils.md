# buildUtils

## Interfaces

### BuildConfiguration

#### Extends

- `BuildConfig`

#### Properties

| Property | Type | Description | Overrides | Inherited from |
| :------ | :------ | :------ | :------ | :------ |
| `conditions?` | `string` \| `string`[] | <p>package.json `exports` conditions used when resolving imports</p><p>Equivalent to `--conditions` in `bun build` or `bun run`.</p><p>https://nodejs.org/api/packages.html#exports</p> | `BuildConfig.conditions` | `BuildConfig.conditions` |
| `define?` | `Record`\<`string`, `string`\> | - | `BuildConfig.define` | `BuildConfig.define` |
| `entrypoints` | `string`[] | - | `BuildConfig.entrypoints` | `BuildConfig.entrypoints` |
| `external?` | `string`[] | - | `BuildConfig.external` | `BuildConfig.external` |
| `format?` | `"esm"` | - | `BuildConfig.format` | `BuildConfig.format` |
| `loader?` | `object` | - | `BuildConfig.loader` | `BuildConfig.loader` |
| `minify?` | `boolean` \| `object` | - | `BuildConfig.minify` | `BuildConfig.minify` |
| `naming?` | `string` \| `object` | - | `BuildConfig.naming` | `BuildConfig.naming` |
| `outdir` | `string` | Output directory. | `BuildConfig.outdir` | `BuildConfig.outdir` |
| `plugins?` | `BunPlugin`[] | - | `BuildConfig.plugins` | `BuildConfig.plugins` |
| `publicPath?` | `string` | - | `BuildConfig.publicPath` | `BuildConfig.publicPath` |
| `root?` | `string` | - | `BuildConfig.root` | `BuildConfig.root` |
| `sourcemap?` | `"none"` \| `"inline"` \| `"external"` | - | `BuildConfig.sourcemap` | `BuildConfig.sourcemap` |
| `splitting?` | `boolean` | - | `BuildConfig.splitting` | `BuildConfig.splitting` |
| `target?` | `Target` | - | `BuildConfig.target` | `BuildConfig.target` |

***

### BuildOutput

#### Properties

| Property | Type |
| :------ | :------ |
| `logs` | (`BuildMessage` \| `ResolveMessage`)[] |
| `outputs` | `BuildArtifact`[] |
| `success` | `boolean` |

## Functions

### buildAndShowMetadata()

> **buildAndShowMetadata**(`buildConfiguration`, `muteMetadata`): `Promise`\<`0` \| `1`\>

Build code using `Bun.build()` and a provided build configuration object.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `buildConfiguration` | [`BuildConfiguration`](buildUtils.md#buildconfiguration) | `undefined` | Configuration object used to build the code. |
| `muteMetadata` | `boolean` | `false` | Boolean determining whether or not to print build metadata to the console. |

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

[src/buildUtils.mts:52](https://github.com/mangs/bun-utils/blob/04c4338b71ceaef98b206440d00c64e2b904fd2d/src/buildUtils.mts#L52)

***

### printBuildMetadata()

> **printBuildMetadata**(`buildOutput`, `buildOutputDirectory`): `void`

Format and print to the command line the provided build metadata.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `buildOutput` | [`BuildOutput`](buildUtils.md#buildoutput) | The return value of [`Bun.build()`](https://bun.sh/docs/bundler). |
| `buildOutputDirectory` | `string` | The output directory when building. |

#### Returns

`void`

#### Source

[src/buildUtils.mts:81](https://github.com/mangs/bun-utils/blob/04c4338b71ceaef98b206440d00c64e2b904fd2d/src/buildUtils.mts#L81)
