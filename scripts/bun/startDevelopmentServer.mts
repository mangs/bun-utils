#!/usr/bin/env bun

/**
 * @file Shell script that reads command line arguments then starts a HTTP(S) development server
 *       accordingly.
 */

// External Imports
import { parseArgs } from 'node:util';

// Internal Imports
import { printError } from '../../src/consoleUtils.mts';
import { startDevelopmentServer } from '../../src/networkUtils.mts';

// Local Types
type FunctionSignature = (request: Request) => Response | Promise<Response>;

// Local Functions
/**
 * Get a value from an object containing all options parsed from the command line.
 * @param parsedValues An object containing all options parsed from the command line.
 * @param option       The specific value to extract from the command line object.
 * @returns            The option value parsed from the command line.
 */
function getOption<T>(parsedValues: Record<keyof T, T[keyof T]>, option: keyof T) {
  const optionValue = parsedValues[option];
  if (optionValue) {
    return optionValue;
  }
  throw new ReferenceError(`Required flag "${String(option)}" missing`);
}

/**
 * Script entrypoint.
 */
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
