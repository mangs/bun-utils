# filesystemUtils

## Interfaces

### TemporaryFileOptions

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `path?` | `string` | Path where the temporary file should be created. | [src/filesystemUtils.mts:18](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L18) |
| `writerOptions?` | `object` | Options object defined by the first parameter accepted by `BunFile.writer()`. | [src/filesystemUtils.mts:22](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L22) |
| `writerOptions.highWaterMark?` | `number` | - | node\_modules/bun-types/bun.d.ts:1200 |

## Functions

### findMissingPaths()

> **findMissingPaths**(`paths`): `Promise`\<`string`[]\>

Compile a list of all inaccessible file paths, then return it. If all paths are valid, the list
will be empty.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `paths` | `string`[] | List of file and/or directory paths. |

#### Returns

`Promise`\<`string`[]\>

The list of inaccessible paths, if any.

#### Defined in

[src/filesystemUtils.mts:34](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L34)

***

### getHumanReadableFilesize()

> **getHumanReadableFilesize**(`filesize`, `localeOverride`?): `string`

Get a human readable filesize given its numeric value and an optional locale.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filesize` | `number` | A file's size represented as a number. |
| `localeOverride`? | `string` | An optional locale value to override the default set by the operating system. |

#### Returns

`string`

A localized string representing a file size.

#### Defined in

[src/filesystemUtils.mts:76](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L76)

***

### getPathsRecursive()

> **getPathsRecursive**(`rootDirectory`, `ignore`): `Promise`\<`string`[]\>

Recursively build a list of paths starting at a target directory. Ignore any paths that match
values in the included ignore list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rootDirectory` | `string` | The root directory of the search. |
| `ignore` | `string`[] | The list of path segment names to match and ignore. |

#### Returns

`Promise`\<`string`[]\>

A list of paths.

#### Defined in

[src/filesystemUtils.mts:52](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L52)

***

### isDirectoryAccessible()

> **isDirectoryAccessible**(`path`): `Promise`\<`boolean`\>

Determine if the provided path can be successfully accessed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path whose permissions to check. |

#### Returns

`Promise`\<`boolean`\>

Boolean indicating whether or not the path is accessible.

#### Defined in

[src/filesystemUtils.mts:97](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L97)

***

### usingNewTemporaryFile()

> **usingNewTemporaryFile**(`options`?): `object`

Create a new temporary file with an
[`await using` variable declaration](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management)
then append to it with a
[`FileSink`](https://bun.sh/docs/api/file-io#incremental-writing-with-filesink) instance.
Automatically delete the file when its variable falls out of scope. Customize file behavior with
an optional options object as follows:
```ts
{
  path?: string;                                    // Target path to use for temporary file creation.
  writerOptions?: Parameters<BunFile['writer']>[0]; // Options object to customize `Bun.file().writer()` behavior
}
```
.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options`? | [`TemporaryFileOptions`](filesystemUtils.md#temporaryfileoptions) | Options object to customize temporary file behavior. |

#### Returns

`object`

Temporary file instance object.

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `[asyncDispose]` | `Promise`\<`void`\> | Asynchronous automatic disposal function. | [src/filesystemUtils.mts:156](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L156) |
| `append` | `Promise`\<`void`\> | Append string contents to the target temporary file. | [src/filesystemUtils.mts:146](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L146) |

#### See

https://github.com/tc39/proposal-explicit-resource-management to explain the origin and use of the `using` keyword

#### Example

```ts
import { usingNewTemporaryFile } from '@mangs/bun-utils/filesystem';

await using file = usingNewTemporaryFile();
await file.append('test data 42\n');
// sometime later...
await file.append('holy data, batman\n');

// file auto-deletes at the end of its execution scope
```

#### Defined in

[src/filesystemUtils.mts:136](https://github.com/mangs/bun-utils/blob/5c6892b7dc74a6f3d7e20247827947fb51ec4e2e/src/filesystemUtils.mts#L136)
