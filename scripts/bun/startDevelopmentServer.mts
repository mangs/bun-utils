#!/usr/bin/env bun

/**
 * @file Shell script that reads command line arguments then starts a HTTP(S) development server accordingly.
 */

// External Imports
import { argv } from 'bun';
import { parseArgs } from 'node:util';
import nodePath from 'node:path';

// Internal Imports
import { startDevelopmentServer } from '../../src/networkUtils.mts';

// Type Imports
import type { ServerConfiguration } from '../../src/networkUtils.mts';

// Local Types
type FetchFunction = (request: Request) => Response | Promise<Response>;
type CodeModule = Record<string, { fetch: FetchFunction }>;

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
  const { values } = parseArgs({
    allowPositionals: true,
    args: argv,
    options: {
      'certificate-path': { type: 'string' },
      'entrypoint-path': { type: 'string' },
      'named-export': { type: 'string' },
      'private-key-path': { type: 'string' },
      'server-name': { type: 'string' },
    },
  });

  const entrypointPath = getOption<typeof values>(values, 'entrypoint-path');
  const namedExport = values['named-export'] ?? 'default';
  const entrypoint = ((await import(nodePath.resolve(entrypointPath))) as CodeModule)[namedExport];
  if (!entrypoint) {
    throw new TypeError('Entrypoint module could not be found');
  }

  const serverConfiguration: ServerConfiguration = {};
  const certificatePath = values['certificate-path'];
  const privateKeyPath = values['private-key-path'];
  if (certificatePath && privateKeyPath) {
    serverConfiguration.httpsOptions = {
      certificatePath,
      privateKeyPath,
      ...(values['server-name'] && { serverName: values['server-name'] }),
    };
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- doesn't make sense in this situation
  } else if ((certificatePath && !privateKeyPath) || (!certificatePath && privateKeyPath)) {
    throw new TypeError('--certificate-path and --private-key-path must be set simultaneously');
  }

  await startDevelopmentServer(entrypoint.fetch, serverConfiguration);
}

// Begin Execution
await main();
