# timeUtils

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
const startTime = performance.now();
// ...sometime later...
request.headers.append(...buildServerTimingHeader('metric', startTime, 'It measures everything'));
```

#### Source

[timeUtils.mts:33](https://github.com/mangs/bun-utils/blob/b51e8671a1703735384ecc544d4f5b5f14a01d83/src/timeUtils.mts#L33)

***

### getElapsedTimeFormatted()

> **getElapsedTimeFormatted**(`startTime`, `formatOptions`?): `string`

Get a formatted string representing the time between the provided start time parameter and the
time the function is called. Optionally a minimum time unit can be chosen (set to `ms` by
default) or a specific time unit can be enforced. Also, formatting locale can be overridden.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `startTime` | `number` | The start time calculated by `Bun.nanoseconds()`. |
| `formatOptions`? | `FormatOptions` | Options object for formatting customization. Contains the following:<br /><br />`{  localeOverride?: string;   Override of the locale used to format and localize the time value.  unitsMinimum?: TimeUnits;  Smallest unit size that can be displayed.  unitsOverride?: TimeUnits; Override of time units to display.}` |

#### Returns

`string`

A localized string showing elapsed time with units.

#### Source

[timeUtils.mts:56](https://github.com/mangs/bun-utils/blob/b51e8671a1703735384ecc544d4f5b5f14a01d83/src/timeUtils.mts#L56)

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
const cmsContent = await measureServerTiming('cmsLoad', request, () =>
  getCmsContent('article1'),
);
```

#### Source

[timeUtils.mts:107](https://github.com/mangs/bun-utils/blob/b51e8671a1703735384ecc544d4f5b5f14a01d83/src/timeUtils.mts#L107)

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

[timeUtils.mts:124](https://github.com/mangs/bun-utils/blob/b51e8671a1703735384ecc544d4f5b5f14a01d83/src/timeUtils.mts#L124)
