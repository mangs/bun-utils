# performanceUtils

## Functions

### measureCpuUsage()

> **measureCpuUsage**\<`T`\>(`runner`, `usesOneThread`, `startTime`): `Promise`\<readonly [`Awaited`\<`T`\>, `number`]\>

Measure the CPU usage in percent of the provided runner function.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `runner` | () => `T` \| `Promise`\<`T`\> | `undefined` | Function whose CPU usage to measure. |
| `usesOneThread` | `boolean` | `false` | Optional boolean to decide if 1 or all threads should be used to compute the percent value. |
| `startTime` | `number` | `...` | Optional time in milliseconds when the elapsed time starts counting. |

#### Returns

`Promise`\<readonly [`Awaited`\<`T`\>, `number`]\>

A tuple containing the return value of the passed-in function and the CPU usage in percent.

#### Example

```ts
const [computationResult, cpuUsagePercent] = await measureCpuUsage(() => expensiveComputation());
```

#### Defined in

[src/performanceUtils.mts:23](https://github.com/mangs/bun-utils/blob/5dc79d4186107caf1ca210b042a493b60ef31165/src/performanceUtils.mts#L23)

***

### measurePerformanceMetrics()

> **measurePerformanceMetrics**\<`T`\>(`metricName`, `request`, `runner`, `metricDescription`?, `usesOneThread`?): `Promise`\<readonly [`Awaited`\<`T`\>, `number`, `number`]\>

Measure performance metrics of the provided runner function. Specifically, `Server-Timing`
duration and CPU usage percent is computed.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `metricName` | `string` | `undefined` | Name of the `Server-Timing` metric being measured. |
| `request` | `Request` | `undefined` | `Request` object to which the `Server-Timing` header will be appended. |
| `runner` | () => `T` \| `Promise`\<`T`\> | `undefined` | Function whose execution duration and CPU usage percentage will be computed. |
| `metricDescription`? | `string` | `undefined` | Optional description of the `Server-Timing` metric being measured. |
| `usesOneThread`? | `boolean` | `false` | Optional boolean to decide if 1 or all threads should be used to compute the percent value. |

#### Returns

`Promise`\<readonly [`Awaited`\<`T`\>, `number`, `number`]\>

A tuple containing the return value of the passed-in function, the execution duration, and the CPU usage in percent.

#### Defined in

[src/performanceUtils.mts:51](https://github.com/mangs/bun-utils/blob/5dc79d4186107caf1ca210b042a493b60ef31165/src/performanceUtils.mts#L51)
