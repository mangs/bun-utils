#!/usr/bin/env bun

// External Imports
import { parseArgs } from 'node:util';

// Internal Imports
import { printError } from '../../utils/consoleUtils.mts';
import { startDevelopmentServer } from '../../utils/networkUtils.mts';

// Local Types
type FunctionSignature = (request: Request) => Response | Promise<Response>;

// Local Functions
function getOption<T>(parsedValues: Record<keyof T, T[keyof T]>, option: keyof T) {
  const optionValue = parsedValues[option];
  if (optionValue) {
    return optionValue;
  }
  throw new ReferenceError(`Required flag "${String(option)}" missing`);
}

async function main() {
  const parseConfiguration = {
    options: {
      'function-name': {
        multiple: false,
        type: 'string',
      },
      'module-path': {
        multiple: false,
        type: 'string',
      },
    },
    strict: true,
  } as const;
  const { values } = parseArgs(parseConfiguration);

  try {
    const functionName = getOption<typeof values>(values, 'function-name');
    const modulePath = getOption<typeof values>(values, 'module-path');
    const module = (await import(modulePath)) as Record<string, FunctionSignature>;
    const entrypointFunction = module[functionName];
    await startDevelopmentServer(entrypointFunction!);
  } catch (error) {
    if (error instanceof ReferenceError) {
      printError(error.message);
    } else {
      throw error;
    }
    process.exitCode = 1;
  }
}

// BEGIN EXECUTION
await main();
