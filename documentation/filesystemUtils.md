# filesystemUtils

## Functions

### findMissingPaths()

> **findMissingPaths**(`paths`: `string`[]): `Promise`\<`string`[]\>

Compile a list of all inaccessible file paths, then return it. If all paths are valid, the list
will be empty.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `paths` | `string`[] | List of file and/or directory paths. |

#### Returns

`Promise`\<`string`[]\>

The list of inaccessible paths, if any.

***

### getHumanReadableFilesize()

> **getHumanReadableFilesize**(`filesize`: `number`, `localeOverride`?: `string`): `string`

Get a human readable filesize given its numeric value and an optional locale.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `filesize` | `number` | A file's size represented as a number. |
| `localeOverride`? | `string` | An optional locale value to override the default set by the operating system. |

#### Returns

`string`

A localized string representing a file size.

***

### getPathsRecursive()

> **getPathsRecursive**(`rootDirectory`: `string`, `ignore`: `string`[]): `Promise`\<`string`[]\>

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

***

### isDirectoryAccessible()

> **isDirectoryAccessible**(`path`: `string`): `Promise`\<`boolean`\>

Determine if the provided path can be successfully accessed.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path whose permissions to check. |

#### Returns

`Promise`\<`boolean`\>

Boolean indicating whether or not the path is accessible.