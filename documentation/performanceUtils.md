# performanceUtils

## Functions

### measureCpuUsage()

> **measureCpuUsage**\<`TRunner`\>(`runner`, `usesOneThread`, `startTime`): `Promise`\<readonly [`Awaited`\<`TRunner`\>, `number`]\>

Measure the CPU usage in percent of the provided runner function.

#### Type Parameters

| Type Parameter |
| ------ |
| `TRunner` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `runner` | () => `TRunner` \| `Promise`\<`TRunner`\> | `undefined` | Function whose CPU usage to measure. |
| `usesOneThread` | `boolean` | `false` | Optional boolean to decide if 1 or all threads should be used to compute the percent value. |
| `startTime` | `number` | `...` | Optional time in milliseconds when the elapsed time starts counting. |

#### Returns

`Promise`\<readonly [`Awaited`\<`TRunner`\>, `number`]\>

A tuple containing the return value of the passed-in function and the CPU usage in percent.

#### Example

```ts
const [computationResult, cpuUsagePercent] = await measureCpuUsage(() => expensiveComputation());
```

#### Defined in

[src/performanceUtils.mts:23](https://github.com/mangs/bun-utils/blob/4a61e0e79560296be56267975a9496cb8ba44398/src/performanceUtils.mts#L23)

***

### measurePerformanceMetrics()

> **measurePerformanceMetrics**\<`TRunner`\>(`metricName`, `request`, `runner`, `metricDescription`?, `usesOneThread`?): `Promise`\<readonly [`Awaited`\<`TRunner`\>, `number`, `number`]\>

Measure performance metrics of the provided runner function. Specifically, `Server-Timing`
duration and CPU usage percent is computed.

#### Type Parameters

| Type Parameter |
| ------ |
| `TRunner` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `metricName` | `string` | `undefined` | Name of the `Server-Timing` metric being measured. |
| `request` | `Request` | `undefined` | `Request` object to which the `Server-Timing` header will be appended. |
| `runner` | () => `TRunner` \| `Promise`\<`TRunner`\> | `undefined` | Function whose execution duration and CPU usage percentage will be computed. |
| `metricDescription`? | `string` | `undefined` | Optional description of the `Server-Timing` metric being measured. |
| `usesOneThread`? | `boolean` | `false` | Optional boolean to decide if 1 or all threads should be used to compute the percent value. |

#### Returns

`Promise`\<readonly [`Awaited`\<`TRunner`\>, `number`, `number`]\>

A tuple containing the return value of the passed-in function, the execution duration, and the CPU usage in percent.

#### Defined in

[src/performanceUtils.mts:51](https://github.com/mangs/bun-utils/blob/4a61e0e79560296be56267975a9496cb8ba44398/src/performanceUtils.mts#L51)
