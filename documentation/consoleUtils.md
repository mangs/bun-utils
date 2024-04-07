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
