# timeUtils

## Interfaces

### FormatOptions

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `localeOverride?` | `string` | Override of the locale used to format and localize the time value. |
| `unitsMinimum?` | `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | Smallest time unit that can be displayed. |
| `unitsOverride?` | `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | Override of time units to display; supersedes `unitsMinimum`. |

## Functions

### buildServerTimingHeader()

> **buildServerTimingHeader**(`name`, `startTime`?, `description`?): readonly [`"Server-Timing"`, `string`]

Build a `Server-Timing` header to measure a performance metric using the provided values.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the performance metric. |
| `startTime`? | `number` | The recorded start time used to compute the metric duration; computed by subtracting the time at which this function is called by the start time. [Milliseconds is the unit recommended by the W3C](https://w3c.github.io/server-timing/#duration-attribute). |
| `description`? | `string` | A description of the metric. |

#### Returns

readonly [`"Server-Timing"`, `string`]

A `Server-Timing` header tuple: [`'Server-Timing'`, `string`].

#### Example

```ts
import { buildServerTimingHeader } from '@mangs/bun-utils/time';

const startTime = performance.now();
// sometime later...
request.headers.append(...buildServerTimingHeader('metric', startTime, 'It measures everything'));
```

#### Source

[src/timeUtils.mts:44](https://github.com/mangs/bun-utils/blob/56bb24880d7ceed5ca3ce0850a4930167c7a0b76/src/timeUtils.mts#L44)

***

### getElapsedTimeFormatted()

> **getElapsedTimeFormatted**(`startTime`, `formatOptions`?): `string`

Get a formatted string representing the time between the provided start time parameter and the
time the function is called. An optional options object can be provided to customize formatting.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `startTime` | `number` | Start time calculated by `Bun.nanoseconds()`. |
| `formatOptions`? | [`FormatOptions`](timeUtils.md#formatoptions) | Options object for formatting customization. |

#### Returns

`string`

Localized string showing elapsed time with units.

#### Source

[src/timeUtils.mts:58](https://github.com/mangs/bun-utils/blob/56bb24880d7ceed5ca3ce0850a4930167c7a0b76/src/timeUtils.mts#L58)

***

### measureElapsedTime()

> **measureElapsedTime**\<`T`\>(`runner`): `Promise`\<`object`\>

Measure the execution time of the passed-in function.

#### Type parameters

| Type parameter |
| :------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `runner` | () => `T` \| `Promise`\<`T`\> | Function whose execution duration will be measured. |

#### Returns

`Promise`\<`object`\>

Object containing the elapsed time and the return value of the passed-in function.

| Member | Type |
| :------ | :------ |
| `elapsedTime` | `string` |
| `returnValue` | `Awaited`\<`T`\> |

#### Source

[src/timeUtils.mts:98](https://github.com/mangs/bun-utils/blob/56bb24880d7ceed5ca3ce0850a4930167c7a0b76/src/timeUtils.mts#L98)

***

### measureServerTiming()

> **measureServerTiming**\<`T`\>(`metricName`, `request`, `runner`, `metricDescription`?): `Promise`\<`T`\>

Measure the execution time of the passed-in function, then append to the request object a
`Server-Timing` header containing the specified metric name, the measured duration, and
optionally the metric description.

#### Type parameters

| Type parameter |
| :------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `metricName` | `string` | Name of the `Server-Timing` metric being measured. |
| `request` | `Request` | `Request` object to which the `Server-Timing` header will be appended. |
| `runner` | () => `T` \| `Promise`\<`T`\> | Function whose execution duration will be measured. |
| `metricDescription`? | `string` | Optional description of the `Server-Timing` metric being measured. |

#### Returns

`Promise`\<`T`\>

The return value of the passed-in function.

#### Example

```ts
import { measureServerTiming } from '@mangs/bun-utils/time';

const cmsContent = await measureServerTiming('cmsLoad', request, () =>
  getCmsContent('article1'),
);
```

#### Source

[src/timeUtils.mts:123](https://github.com/mangs/bun-utils/blob/56bb24880d7ceed5ca3ce0850a4930167c7a0b76/src/timeUtils.mts#L123)

***

### sleep()

> **sleep**(`duration`): `Promise`\<`unknown`\>

Asynchronous sleep function using promises.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `duration` | `number` | Length of time to sleep. |

#### Returns

`Promise`\<`unknown`\>

`Promise` that resolves when the specified duration expires.

#### Source

[src/timeUtils.mts:140](https://github.com/mangs/bun-utils/blob/56bb24880d7ceed5ca3ce0850a4930167c7a0b76/src/timeUtils.mts#L140)
