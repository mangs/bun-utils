# consoleUtils

## Functions

### cyan()

> **cyan**(`text`: `string`): `string`

Format the text so it appears cyan.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears cyan.

#### Source

[consoleUtils.mts:20](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L20)

***

### dim()

> **dim**(`text`: `string`): `string`

Format the text so it appears dim.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears dim.

#### Source

[consoleUtils.mts:29](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L29)

***

### getPerformanceLabel()

> **getPerformanceLabel**(`startTime`: `number`, `unitsOverride`?: `""` \| `"ns"` \| `"μs"` \| `"ms"` \| `"s"`, `localeOverride`?: `string`): `string`

Get a text label showing the elapsed time between the provided start time parameter and the time
the function is called. Optionally the time units and formatting locale can be overridden.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `startTime` | `number` | The start time calculated by Bun.nanoseconds(). |
| `unitsOverride`? | `""` \| `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | An optional override of time units to display. |
| `localeOverride`? | `string` | An optional override of the locale used to format and localize the time<br />                      value. |

#### Returns

`string`

A localized text label showing elapsed time with units.

#### Source

[consoleUtils.mts:78](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L78)

***

### green()

> **green**(`text`: `string`): `string`

Format the text so it appears green.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears green.

#### Source

[consoleUtils.mts:38](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L38)

***

### printError()

> **printError**(`message`: `string`): `void`

Print an error message to the console in red.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:91](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L91)

***

### printInfo()

> **printInfo**(`message`: `string`): `void`

Print an informational message to the console in cyan.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:99](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L99)

***

### printSuccess()

> **printSuccess**(`message`: `string`): `void`

Print a success message to the console in green.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:107](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L107)

***

### printWarning()

> **printWarning**(`message`: `string`): `void`

Print a warning message to the console in yellow.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A message to print to the console. |

#### Returns

`void`

#### Source

[consoleUtils.mts:115](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L115)

***

### red()

> **red**(`text`: `string`): `string`

Format the text so it appears red.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears red.

#### Source

[consoleUtils.mts:47](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L47)

***

### white()

> **white**(`text`: `string`): `string`

Format the text so it appears white.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears white.

#### Source

[consoleUtils.mts:56](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L56)

***

### yellow()

> **yellow**(`text`: `string`): `string`

Format the text so it appears yellow.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |

#### Returns

`string`

Text formatted so it appears yellow.

#### Source

[consoleUtils.mts:65](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/consoleUtils.mts#L65)
