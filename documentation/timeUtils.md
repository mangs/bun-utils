# timeUtils

## Functions

### buildServerTimingHeader()

> **buildServerTimingHeader**(`name`, `startTime`?, `description`?): readonly [`"Server-Timing"`, `string`]

Build a `Server-Timing` header to measure a performance metric using the provided values.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the performance metric. |
| `startTime`? | `number` | The recorded start time used to compute the metric duration; computed by<br />                   subtracting the time at which this function is called by the start time.<br />                   [Milliseconds is the unit recommended by the W3C](https://w3c.github.io/server-timing/#duration-attribute). |
| `description`? | `string` | A description of the metric. |

#### Returns

readonly [`"Server-Timing"`, `string`]

A `Server-Timing` header tuple: [`'Server-Timing'`, `string`].

#### Example

```ts
const startTime = performance.now();
// ...sometime later...
request.headers.append(...buildServerTimingHeader('metric', startTime, 'It measures everything'));
```

#### Source

[timeUtils.mts:30](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/timeUtils.mts#L30)

***

### getElapsedTimeFormatted()

> **getElapsedTimeFormatted**(`startTime`, `unitsOverride`, `localeOverride`?): `string`

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

[timeUtils.mts:45](https://github.com/mangs/bun-utils/blob/3f074a78745637385db66b4999f09366a440d0cb/src/timeUtils.mts#L45)
