# filesystemUtils

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

[filesystemUtils.mts:19](https://github.com/mangs/bun-utils/blob/3d9678eb5d12a861940786e566ddf15fc2abbc12/src/filesystemUtils.mts#L19)

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

[filesystemUtils.mts:61](https://github.com/mangs/bun-utils/blob/3d9678eb5d12a861940786e566ddf15fc2abbc12/src/filesystemUtils.mts#L61)

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

[filesystemUtils.mts:37](https://github.com/mangs/bun-utils/blob/3d9678eb5d12a861940786e566ddf15fc2abbc12/src/filesystemUtils.mts#L37)

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

[filesystemUtils.mts:82](https://github.com/mangs/bun-utils/blob/3d9678eb5d12a861940786e566ddf15fc2abbc12/src/filesystemUtils.mts#L82)

***

### usingNewTemporaryFile()

> **usingNewTemporaryFile**(`path`): `object`

Create and append to a new temporary file that is automatically deleted when its `using` variable
falls out of scope. Customize its target path with the optional `path` parameter.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Target path to use for temporary file creation. |

#### Returns

`object`

Object with an `append` and async `Symbol.asyncDispose` method.

| Member | Type | Description |
| :------ | :------ | :------ |
| `[asyncDispose]` | `Promise`\<`void`\> | Asynchronous automatic disposal function. |
| `append` | `Promise`\<`void`\> | Append string contents to the target temporary file. |

#### Example

```ts
await using file = usingNewTemporaryFile();
await file.append('test data 42\n');
// sometime later...
await file.append('holy data, batman\n');

// file auto-deletes at the end of its execution scope
```

#### Source

[filesystemUtils.mts:107](https://github.com/mangs/bun-utils/blob/3d9678eb5d12a861940786e566ddf15fc2abbc12/src/filesystemUtils.mts#L107)
