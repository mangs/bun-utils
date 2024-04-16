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

[timeUtils.mts:28](https://github.com/mangs/bun-utils/blob/34237c3f4601d8c5ec88fc5b6998c46aec7d3b0e/src/timeUtils.mts#L28)

***

### getElapsedTimeFormatted()

> **getElapsedTimeFormatted**(`startTime`, `unitsOverride`, `localeOverride`?): `string`

Get a formatted string representing the time between the provided start time parameter and the
time the function is called. Optionally the time units and formatting locale can be overridden.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `startTime` | `number` | `undefined` | The start time calculated by `Bun.nanoseconds()`. |
| `unitsOverride` | `""` \| `"ns"` \| `"μs"` \| `"ms"` \| `"s"` | `'ms'` | An optional override of time units to display. |
| `localeOverride`? | `string` | `undefined` | An optional override of the locale used to format and localize the time value. |

#### Returns

`string`

A localized string showing elapsed time with units.

#### Source

[timeUtils.mts:43](https://github.com/mangs/bun-utils/blob/34237c3f4601d8c5ec88fc5b6998c46aec7d3b0e/src/timeUtils.mts#L43)

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

[timeUtils.mts:92](https://github.com/mangs/bun-utils/blob/34237c3f4601d8c5ec88fc5b6998c46aec7d3b0e/src/timeUtils.mts#L92)
