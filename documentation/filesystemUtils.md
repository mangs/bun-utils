# filesystemUtils

## Interfaces

### TemporaryFileOptions

#### Properties

| Property | Type |
| :------ | :------ |
| `path?` | `string` |
| `writerOptions?` | `object` |
| `writerOptions.highWaterMark?` | `number` |

## Functions

### findMissingPaths()

> **findMissingPaths**(`paths`): `Promise`\<`string`[]\>

Compile a list of all inaccessible file paths, then return it. If all paths are valid, the list
will be empty.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `paths` | `string`[] | List of file and/or directory paths. |

#### Returns

`Promise`\<`string`[]\>

The list of inaccessible paths, if any.

#### Source

[src/filesystemUtils.mts:29](https://github.com/mangs/bun-utils/blob/951e5b0be9df26d545a8c6ceed53b57874433df2/src/filesystemUtils.mts#L29)

***

### getHumanReadableFilesize()

> **getHumanReadableFilesize**(`filesize`, `localeOverride`?): `string`

Get a human readable filesize given its numeric value and an optional locale.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `filesize` | `number` | A file's size represented as a number. |
| `localeOverride`? | `string` | An optional locale value to override the default set by the operating system. |

#### Returns

`string`

A localized string representing a file size.

#### Source

[src/filesystemUtils.mts:71](https://github.com/mangs/bun-utils/blob/951e5b0be9df26d545a8c6ceed53b57874433df2/src/filesystemUtils.mts#L71)

***

### getPathsRecursive()

> **getPathsRecursive**(`rootDirectory`, `ignore`): `Promise`\<`string`[]\>

Recursively build a list of paths starting at a target directory. Ignore any paths that match
values in the included ignore list.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `rootDirectory` | `string` | The root directory of the search. |
| `ignore` | `string`[] | The list of path segment names to match and ignore. |

#### Returns

`Promise`\<`string`[]\>

A list of paths.

#### Source

[src/filesystemUtils.mts:47](https://github.com/mangs/bun-utils/blob/951e5b0be9df26d545a8c6ceed53b57874433df2/src/filesystemUtils.mts#L47)

***

### isDirectoryAccessible()

> **isDirectoryAccessible**(`path`): `Promise`\<`boolean`\>

Determine if the provided path can be successfully accessed.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path whose permissions to check. |

#### Returns

`Promise`\<`boolean`\>

Boolean indicating whether or not the path is accessible.

#### Source

[src/filesystemUtils.mts:92](https://github.com/mangs/bun-utils/blob/951e5b0be9df26d545a8c6ceed53b57874433df2/src/filesystemUtils.mts#L92)

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
| :------ | :------ | :------ |
| `options`? | [`TemporaryFileOptions`](filesystemUtils.md#temporaryfileoptions) | Options object to customize temporary file behavior. |

#### Returns

`object`

Temporary file instance object.

| Member | Type | Description |
| :------ | :------ | :------ |
| `[asyncDispose]` | `Promise`\<`void`\> | Asynchronous automatic disposal function. |
| `append` | `Promise`\<`void`\> | Append string contents to the target temporary file. |

#### See

https://github.com/tc39/proposal-explicit-resource-management

#### Example

```ts
import { usingNewTemporaryFile } from '@mangs/bun-utils/filesystem';

await using file = usingNewTemporaryFile();
await file.append('test data 42\n');
// sometime later...
await file.append('holy data, batman\n');

// file auto-deletes at the end of its execution scope
```

#### Source

[src/filesystemUtils.mts:131](https://github.com/mangs/bun-utils/blob/951e5b0be9df26d545a8c6ceed53b57874433df2/src/filesystemUtils.mts#L131)
