# buildUtils

## Interfaces

### BuildConfiguration

#### Extends

- `BuildConfig`

#### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| `conditions?` | `string` \| `string`[] | package.json `exports` conditions used when resolving imports Equivalent to `--conditions` in `bun build` or `bun run`. https://nodejs.org/api/packages.html#exports | - | `BuildConfig.conditions` | node\_modules/bun-types/bun.d.ts:1583 |
| `define?` | `Record`\<`string`, `string`\> | - | - | `BuildConfig.define` | node\_modules/bun-types/bun.d.ts:1572 |
| `entrypoints` | `string`[] | - | - | `BuildConfig.entrypoints` | node\_modules/bun-types/bun.d.ts:1555 |
| `external?` | `string`[] | - | - | `BuildConfig.external` | node\_modules/bun-types/bun.d.ts:1570 |
| `format?` | `"esm"` | - | - | `BuildConfig.format` | node\_modules/bun-types/bun.d.ts:1558 |
| `loader?` | `object` | - | - | `BuildConfig.loader` | node\_modules/bun-types/bun.d.ts:1574 |
| `minify?` | `boolean` \| `object` | - | - | `BuildConfig.minify` | node\_modules/bun-types/bun.d.ts:1584 |
| `naming?` | `string` \| `object` | - | - | `BuildConfig.naming` | node\_modules/bun-types/bun.d.ts:1559 |
| `outdir` | `string` | Output directory. | `BuildConfig.outdir` | - | [src/buildUtils.mts:30](https://github.com/mangs/bun-utils/blob/ddf8fc5d259598ada653cd5483b2e845cd3de44b/src/buildUtils.mts#L30) |
| `plugins?` | `BunPlugin`[] | - | - | `BuildConfig.plugins` | node\_modules/bun-types/bun.d.ts:1568 |
| `publicPath?` | `string` | - | - | `BuildConfig.publicPath` | node\_modules/bun-types/bun.d.ts:1571 |
| `root?` | `string` | - | - | `BuildConfig.root` | node\_modules/bun-types/bun.d.ts:1566 |
| `sourcemap?` | `"none"` \| `"linked"` \| `"inline"` \| `"external"` | - | - | `BuildConfig.sourcemap` | node\_modules/bun-types/bun.d.ts:1575 |
| `splitting?` | `boolean` | - | - | `BuildConfig.splitting` | node\_modules/bun-types/bun.d.ts:1567 |
| `target?` | `Target` | - | - | `BuildConfig.target` | node\_modules/bun-types/bun.d.ts:1557 |

***

### BuildOutput

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| `logs` | (`BuildMessage` \| `ResolveMessage`)[] | node\_modules/bun-types/bun.d.ts:1838 |
| `outputs` | `BuildArtifact`[] | node\_modules/bun-types/bun.d.ts:1836 |
| `success` | `boolean` | node\_modules/bun-types/bun.d.ts:1837 |

## Functions

### buildAndShowMetadata()

> **buildAndShowMetadata**(`buildConfiguration`, `muteMetadata`): `Promise`\<`0` \| `1`\>

Build code using `Bun.build()` and a provided build configuration object.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
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

#### Defined in

[src/buildUtils.mts:52](https://github.com/mangs/bun-utils/blob/ddf8fc5d259598ada653cd5483b2e845cd3de44b/src/buildUtils.mts#L52)

***

### printBuildMetadata()

> **printBuildMetadata**(`buildOutput`, `buildOutputDirectory`): `void`

Format and print to the command line the provided build metadata.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `buildOutput` | [`BuildOutput`](buildUtils.md#buildoutput) | The return value of [`Bun.build()`](https://bun.sh/docs/bundler). |
| `buildOutputDirectory` | `string` | The output directory when building. |

#### Returns

`void`

#### Defined in

[src/buildUtils.mts:81](https://github.com/mangs/bun-utils/blob/ddf8fc5d259598ada653cd5483b2e845cd3de44b/src/buildUtils.mts#L81)
