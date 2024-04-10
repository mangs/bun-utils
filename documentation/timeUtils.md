# timeUtils

## Functions

### getElapsedTimeFormatted()

> **getElapsedTimeFormatted**(`startTime`: `number`, `unitsOverride`: `""` \| `"ns"` \| `"μs"` \| `"ms"` \| `"s"`, `localeOverride`?: `string`): `string`

Get a formatted string representing the time between the provided start time parameter and the
time the function is called. Optionally the time units and formatting locale can be overridden.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `startTime` | `number` | `undefined` | The start time calculated by Bun.nanoseconds(). |
| `unitsOverride` | `""` \| `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | `'ms'` | An optional override of time units to display. |
| `localeOverride`? | `string` | `undefined` | An optional override of the locale used to format and localize the time<br />                      value. |

#### Returns

`string`

A localized string showing elapsed time with units.

#### Source

[timeUtils.mts:24](https://github.com/mangs/bun-utils/blob/0e63ba4ba81750eee704bec08236136074bb0b97/utils/timeUtils.mts#L24)
