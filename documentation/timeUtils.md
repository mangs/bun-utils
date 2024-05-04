# timeUtils

## Interfaces

### FormatOptions

#### Properties

| Property | Type |
| :------ | :------ |
| `localeOverride?` | `string` |
| `unitsMinimum?` | `"ns"` \| `"μs"` \| `"ms"` \| `"s"` |
| `unitsOverride?` | `"ns"` \| `"μs"` \| `"ms"` \| `"s"` |

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

[src/timeUtils.mts:35](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/timeUtils.mts#L35)

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

[src/timeUtils.mts:49](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/timeUtils.mts#L49)

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

[src/timeUtils.mts:102](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/timeUtils.mts#L102)

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

[src/timeUtils.mts:119](https://github.com/mangs/bun-utils/blob/a06a7d84530c4bdd56ac024b1dbf13015586c556/src/timeUtils.mts#L119)
