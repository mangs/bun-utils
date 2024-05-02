# consoleUtils

## Functions

### cyan()

> **cyan**(`text`): `string`

Format the text so it appears cyan.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears cyan.

#### Source

[consoleUtils.mts:17](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L17)

***

### dim()

> **dim**(`text`): `string`

Format the text so it appears dim.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears dim.

#### Source

[consoleUtils.mts:26](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L26)

***

### getPerformanceLabel()

> **getPerformanceLabel**(...`parameters`): `string`

Get a text label showing the elapsed time between the provided start time parameter and the time
the function is called. Optionally a minimum time unit can be chosen (set to `ms` by default) or
a specific time unit can be enforced. Also, formatting locale can be overridden.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| ...`parameters` | [`number`, `FormatOptions`] | The same parameters as [getElapsedTimeFormatted](timeUtils.md#getelapsedtimeformatted). |

#### Returns

`string`

Localized text label showing elapsed time with units.

#### Source

[consoleUtils.mts:73](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L73)

***

### green()

> **green**(`text`): `string`

Format the text so it appears green.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears green.

#### Source

[consoleUtils.mts:35](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L35)

***

### printError()

> **printError**(`message`): `void`

Print an error message to the console in red.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:82](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L82)

***

### printInfo()

> **printInfo**(`message`): `void`

Print an informational message to the console in cyan.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:90](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L90)

***

### printSuccess()

> **printSuccess**(`message`): `void`

Print a success message to the console in green.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:98](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L98)

***

### printWarning()

> **printWarning**(`message`): `void`

Print a warning message to the console in yellow.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:106](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L106)

***

### red()

> **red**(`text`): `string`

Format the text so it appears red.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears red.

#### Source

[consoleUtils.mts:44](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L44)

***

### white()

> **white**(`text`): `string`

Format the text so it appears white.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears white.

#### Source

[consoleUtils.mts:53](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L53)

***

### yellow()

> **yellow**(`text`): `string`

Format the text so it appears yellow.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears yellow.

#### Source

[consoleUtils.mts:62](https://github.com/mangs/bun-utils/blob/c8a91098ee2ea0950299a6900712473dd396801a/src/consoleUtils.mts#L62)
