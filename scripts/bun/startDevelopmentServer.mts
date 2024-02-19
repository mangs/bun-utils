#!/usr/bin/env bun

// External Imports
import { parseArgs } from 'node:util';

// Internal Imports
import { printError } from '../../utils/consoleUtils.mts';
import { startDevelopmentServer } from '../../utils/networkUtils.mts';

// Local Functions
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

  if (!('module-path' in values) || !values['module-path']) {
    process.exitCode = 1;
    printError('Required flag "module-path" missing');
    return;
  }

  const modulePath = values['module-path'];
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- no way to predict module contents
    const module = await import(modulePath);
    startDevelopmentServer(module, values['function-name']);
  } catch {
    process.exitCode = 1;
    printError(`Error loading module at path "${modulePath}"`);
  }
}

// BEGIN EXECUTION
await main();
