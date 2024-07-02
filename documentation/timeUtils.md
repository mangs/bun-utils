# timeUtils

## Interfaces

### FormatOptions

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `localeOverride?` | `string` | Override of the locale used to format and localize the time value. | [src/timeUtils.mts:17](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L17) |
| `unitsMinimum?` | `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | Smallest time unit that can be displayed. | [src/timeUtils.mts:21](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L21) |
| `unitsOverride?` | `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | Override of time units to display; supersedes `unitsMinimum`. | [src/timeUtils.mts:25](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L25) |

## Functions

### buildServerTimingHeader()

> **buildServerTimingHeader**(`name`, `startTime`?, `description`?): readonly [readonly [`"Server-Timing"`, `string`], `number`]

Build a `Server-Timing` header to measure a performance metric using the provided values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the performance metric. |
| `startTime`? | `number` | The recorded start time used to compute the metric duration; computed by subtracting the time at which this function is called by the start time. [Milliseconds is the unit recommended by the W3C](https://w3c.github.io/server-timing/#duration-attribute). |
| `description`? | `string` | A description of the metric. |

#### Returns

readonly [readonly [`"Server-Timing"`, `string`], `number`]

A tuple containing a tuple representing the header value and the duration.

#### Example

```ts
import { buildServerTimingHeader } from '@mangs/bun-utils/time';

const startTime = performance.now();
// sometime later...
request.headers.append(...buildServerTimingHeader('metric', startTime, 'It measures everything')[0]);
```

#### Defined in

[src/timeUtils.mts:44](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L44)

***

### getElapsedTimeFormatted()

> **getElapsedTimeFormatted**(`startTime`, `formatOptions`?): `string`

Get a formatted string representing the time between the provided start time parameter and the
time the function is called. An optional options object can be provided to customize formatting.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `startTime` | `number` | Start time calculated by `Bun.nanoseconds()`. |
| `formatOptions`? | [`FormatOptions`](timeUtils.md#formatoptions) | Options object for formatting customization. |

#### Returns

`string`

Localized string showing elapsed time with units.

#### Defined in

[src/timeUtils.mts:59](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L59)

***

### measureElapsedTime()

> **measureElapsedTime**\<`T`\>(`runner`): `Promise`\<readonly [`Awaited`\<`T`\>, `string`]\>

Measure the execution time of the passed-in function.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `runner` | () => `T` \| `Promise`\<`T`\> | Function whose execution duration will be measured. |

#### Returns

`Promise`\<readonly [`Awaited`\<`T`\>, `string`]\>

A tuple containing the return value of the passed-in function and the elapsed execution time.

#### Defined in

[src/timeUtils.mts:99](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L99)

***

### measureServerTiming()

> **measureServerTiming**\<`T`\>(`metricName`, `request`, `runner`, `metricDescription`?): `Promise`\<readonly [`Awaited`\<`T`\>, `number`]\>

Measure the execution time of the passed-in function, then append to the request object a
`Server-Timing` header containing the specified metric name, the measured duration, and
optionally the metric description.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `metricName` | `string` | Name of the `Server-Timing` metric being measured. |
| `request` | `Request` | `Request` object to which the `Server-Timing` header will be appended. |
| `runner` | () => `T` \| `Promise`\<`T`\> | Function whose execution duration will be measured. |
| `metricDescription`? | `string` | Optional description of the `Server-Timing` metric being measured. |

#### Returns

`Promise`\<readonly [`Awaited`\<`T`\>, `number`]\>

A tuple containing the return value of the passed-in function and the duration.

#### Example

```ts
import { measureServerTiming } from '@mangs/bun-utils/time';

const [cmsContent, cmsLoadDuration] = await measureServerTiming('cmsLoad', request, () =>
  getCmsContent('article1'),
);
```

#### Defined in

[src/timeUtils.mts:124](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L124)

***

### sleep()

> **sleep**(`duration`): `Promise`\<`unknown`\>

Asynchronous sleep function using promises.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `duration` | `number` | Length of time to sleep. |

#### Returns

`Promise`\<`unknown`\>

`Promise` that resolves when the specified duration expires.

#### Defined in

[src/timeUtils.mts:142](https://github.com/mangs/bun-utils/blob/36ca463ec2c14b9ec09d9495eb93ec11d9685583/src/timeUtils.mts#L142)
