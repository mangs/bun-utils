# performanceUtils

## Functions

### measureCpuUsage()

> **measureCpuUsage**\<`T`\>(`runner`, `startTime`): `Promise`\<readonly [`Awaited`\<`T`\>, `number`]\>

Measure the CPU usage in percent of the provided runner function.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `runner` | () => `T` \| `Promise`\<`T`\> | Function whose CPU usage to measure. |
| `startTime` | `number` | Optional time in milliseconds when the elapsed time starts counting. |

#### Returns

`Promise`\<readonly [`Awaited`\<`T`\>, `number`]\>

A tuple containing the return value of the passed-in function and the CPU usage in percent.

#### Defined in

[src/performanceUtils.mts:18](https://github.com/mangs/bun-utils/blob/bd5aa48bbccdeadada54ddefbe4f12bcb52f3fe3/src/performanceUtils.mts#L18)

***

### measurePerformanceMetrics()

> **measurePerformanceMetrics**\<`T`\>(`metricName`, `request`, `runner`, `metricDescription`?): `Promise`\<readonly [`Awaited`\<`T`\>, `number`, `number`]\>

Measure performance metrics of the provided runner function. Specifically, `Server-Timing`
duration and CPU usage percent is computed.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `metricName` | `string` | Name of the `Server-Timing` metric being measured. |
| `request` | `Request` | `Request` object to which the `Server-Timing` header will be appended. |
| `runner` | () => `T` \| `Promise`\<`T`\> | Function whose execution duration and CPU usage percentage will be computed. |
| `metricDescription`? | `string` | Optional description of the `Server-Timing` metric being measured. |

#### Returns

`Promise`\<readonly [`Awaited`\<`T`\>, `number`, `number`]\>

A tuple containing the return value of the passed-in function, the execution duration, and the CPU usage in percent.

#### Defined in

[src/performanceUtils.mts:41](https://github.com/mangs/bun-utils/blob/bd5aa48bbccdeadada54ddefbe4f12bcb52f3fe3/src/performanceUtils.mts#L41)
