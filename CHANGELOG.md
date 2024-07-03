# Changelog

## 2.21.1

- Update `fetchWithRetry()` with minor revisions
  - Execute `onBypassRetry()` before checking retry count
  - Tweak debug log messaging

## 2.21.0

- Add option `onBypassRetry()` to `fetchWithRetry()` allowing to customize the ability to bypass retries based on response status code
- Update dependency versions to latest

## 2.20.0

- Add relative size output in percent for each bundled file for `printBuildMetadata()`
- Update target Bun version from `1.1.16` to `1.1.17`
- Update dependency versions to latest

## 2.19.1

- Update example code for `measureServerTiming()` to match changes made in version `2.19.0`
- Update target Bun version from `1.1.13` to `1.1.16`
- Update dependency versions to latest

## 2.19.0

- Change `buildServerTimingHeader()` to return a tuple containing a tuple representing the header value and the duration.
- Change `measureServerTiming()` to return a tuple containing the return value of the passed-in function and the duration.
- Change `measureElapsedTime()` to return a tuple containing the return value of the passed-in function and the elapsed execution time.
- Update target Bun version from `1.1.10` to `1.1.13`
- Update dependency versions to latest

## 2.18.3

- Limit error catching and suppression to `TimeoutError`s in `fetchWithRetry()`; all other error types thrown
- Update dependency versions to latest

## 2.18.2

- Rename `fetchWithRetry()` configuration option `retryMax` to `retries`

## 2.18.1

- Refactor `fetchWithRetry()` to use fewer lines of code
- Update target Bun version from `1.1.8` to `1.1.10`
- Update dependency versions to latest

## 2.18.0

- Add `/config` directory to NPM package contents

## 2.17.2

- Fix measured `Server-Timing` durations which were incorrectly using constructor execution as start time instead of `Router.prototype.handleRequest()`
- Update dependency versions to latest

## 2.17.1

- Handle unexpected and error responses more correctly in `startDevelopmentServer()` by always showing a `500` response and timing in the response row
- Update target Bun version from `1.1.7` to `1.1.8`

## 2.17.0

- Add function `measureElapsedTime()` to `src/timeUtils.mts`

## 2.16.5

- Change 2nd parameter of `startDevelopmentServer()` to use Bun's `Server['fetch']` type
- Update dependency versions to latest

## 2.16.4

- Add missing `server` 2nd parameter to `startDevelopmentServer()`'s `entrypointFunction` parameter
- Update dependency versions to latest

## 2.16.3

- Iterate on `scripts/bun/startDevelopmentServer.mts` script

## 2.16.2

- Adjust newline output when `muteMetadata` is passed to `buildAndShowMetadata()`

## 2.16.1

- Add missing type documentation

## 2.16.0

- Add `muteMetadata` parameter to `buildAndShowMetadata()` to optionally prevent printing build metadata to the console
- Renamed retry option `changeRetryDelay` to `onChangeRetryDelay` to better reflect its meaning
- Documentation cleanup: removed manual options object descriptions from description sections in favor of documenting types directly

## 2.15.4

- Add message to build output specifying which environment is being targetted according to environment variable `NODE_ENV`; defaults to `"development"`

## 2.15.3

- Widen the count column so there are 2 space characters minimum between its visible characters and the filename column for `printBuildMetadata()`
  - Improves visibility for outputs where dimmed text isn't possible such as GitHub Actions

## 2.15.2

- Change alignment of category column from using raw tab characters to computing proper max column width
- Update target Bun version from `1.1.5` to `1.1.7`
- Update dependency versions to latest

## 2.15.1

- Enforce `outdir` with types instead of throwing an exception in `buildAndShowMetadata()`
- Add type exports to all modules wherein type use during documentation build is flagged as a warning

## 2.15.0

- Add function `buildAndShowMetadata()` for a simple, straightforward UX for code building (in `src/buildUtils.mts`)
- Update dependency versions to latest

## 2.14.4

- Update target Bun version from `1.1.4` to `1.1.5`
- Update dependency versions to latest

## 2.14.3

- Improve clarity of documentation for function `usingNewTemporaryFile`

## 2.14.2

- Change the function interface for `usingNewTemporaryFile` to use an options object, disable disk flush by default, and allow writer customization

## 2.14.1

- Add `import`s to examples in the documentation without them

## 2.14.0

- Add function `usingNewTemporaryFile` to allow seamless creation, appending, and auto-deletion of temporary files via the `using` declaration (in `src/filesystemUtils.mts`)

## 2.13.2

- Add `fetchWithRetry` debugging insight by showing all retry settings attributable to each logged error

## 2.13.1

- Improved `fetchWithRetry`
  - Error response codes cause an error to be thrown if retries remain so the request is retried
  - Setting environment variable `DEBUG` to a truthy value logs caught and ignored retry errors

## 2.13.0

- Change the function signature of `getPerformanceLabel` and `getElapsedTimeFormatted` to accept an options object including a new `unitsMinimum` parameter
- Update dependency versions to latest

## 2.12.2

- Change the return value of the development server to be a `Promise` resolving to the return value of `Bun.serve()`

## 2.12.1

- Correct documentation for the development server

## 2.12.0

- Make development server more configurable
  - Add ability to set `error` error handler to override's `Bun.serve()`'s default error page
  - Add ability to set `serverName` and `lowMemoryMode` HTTPS options
  - `port` option now takes precedence over existing `DEVELOPMENT_SERVER_PORT` environment variable value

## 2.11.0

- Add a 10 second default timeout to `fetchWithRetry`; can be overridden with a new `timeout` parameter (in `src/networkUtils.mts`)
- Update dependency versions to latest

## 2.10.2

- Rename build output label from `Entry-point` to `Entry point` (in `src/buildUtils.mts`)

## 2.10.1

- Fix bugs in new functions
  - `fetchWithRetry`: allow 2nd parameter and all 3 custom options to be optional parameters
  - `sleep`: correctly call `resolve()`

## 2.10.0

- Add new functions
  - `fetchWithRetry` for auto-retrying failed `fetch` requests (in `src/networkUtils.mts`)
  - `sleep` for a Promise-based ability to pause execution to be used with `await` (in `src/timeUtils.mts`)
- Update target Bun version from `1.1.3` to `1.1.4`

## 2.9.1

- Replace all mention of "utility functions" with "utilities"

## 2.9.0

- Add function `measureServerTiming()` to easily measure and report execution time of blocks of code using the `Server-Timing` header (in `src/timeUtils.mts`)

## 2.8.3

- Allow `0` to be passed in as `startTime` in `buildServerTimingHeader()` (in `src/timeUtils.mts`)

## 2.8.2

- Add more detailed documentation to the `Router` class in `src/routerUtils.mts`
  - Add explanation about how to use eager vs. lazy-loaded and named vs. default module exports for route handlers
  - Add example usage for each route instance HTTP method function type

## 2.8.1

- Fix NPM package error that didn't include the new `src/` directory

## 2.8.0

- Moved all utility function source files from `utils/` to `src/`
- Added recommended VSCode extensions related to this project
- Cleaned up documentation across most utility function files

## 2.7.0

- The `Router` now appends `Server-Timing` values for route loading duration to the request object's headers
- Added new function `buildServerTimingHeader()` to create `Server-Timing` header values
- Added new parameters to the `Router` constructor (in `utils/routerUtils.mts`)
  - `startTime` is the start time of loading a route; used to compute `Server-Timing` duration.
  - `usesServerTiming` is a boolean indicating if `Server-Timing` headers are sent or not

## 2.6.3

- Update example usage for `Router` in the documentation (in `utils/routerUtils.mts`)

## 2.6.2

- Fix lazy loading route handlers to actually load lazily instead of eagerly (in `utils/routerUtils.mts`)

## 2.6.1

- Make `Router` instance `routes` array private (in `utils/routerUtils.mts`)

## 2.6.0

- In the `Router` class in `utils/routerUtils.mts`, path matching is now performed by `Bun.Glob`

## 2.5.1

- In the `Router` class in `utils/routerUtils.mts`, rename `handleMethod` to `#handleMethod` to make it a private instance method

## 2.5.0

- Added lots more features to the `Router` class
  - Added glob-like route matching with `*` and `**`
  - Added ability to match any route method with `.all()` convenience method
  - Added more convenience methods. The full list now includes most HTTP methods (see the documentation for more details):
    - `delete`
    - `get`
    - `head`
    - `options`
    - `patch`
    - `post`
    - `put`
  - Created new utils file `utils/routerUtils.mts` for router utils
    - Create a new package export `/router` pointing to it
    - Moved `Router` class from `utils/networkUtils.mts` to here
  - Added JSDoc documentation to the `Router` class in `utils/routerUtils.mts`

## 2.4.1

- Fix bug in the `Router` class in `utils/networkUtils.mts` so calling a lazy-loaded route handler function works correctly

## 2.4.0

- Add lazy-loaded route handler support to the `Router` class in `utils/networkUtils.mts`

## 2.3.0

- Add a `Router` class to `utils/networkUtils.mts`

## 2.2.4

- Refactor `utils/networkUtils.mts` -> `startDevelopmentServer()` to check file paths with `Bun.file().exists()` instead of `access` from `node:fs/promises`
- Update the pull request template to include a reminder to build new documentation

## 2.2.3

- Document the use of the `DEBUG` environment variable in `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 2.2.2

- Add documentation how configuration options map back to those in `Bun.serve()` in `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 2.2.1

- Document default values for `port` configuration option in `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 2.2.0

- Changed configuration options interface in `utils/networkUtils.mts` -> `startDevelopmentServer()`
  - Renamed options
    - `certificate` -> `certificatePath`
    - `certificateAuthority` -> `certificateAuthorityPath`
    - `privateKey` -> `privateKeyPath`
  - Added optional ability to pass an array of paths to the above options
  - `port` can be a `string` or a `number`

## 2.1.2

- Fix TypeScript example documentation consistency error in `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 2.1.1

- Fix the documentation's configuration object display in `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 2.1.0

- Changed the function signature of `utils/networkUtils.mts` -> `startDevelopmentServer()` to accept a single configuration object instead of multiple configuration parameters
  - Documentation updated
- Disabled rule `jsdoc/check-line-alignment`
- Disabled JSDoc parameter expansion so parameters are more clearly shown; type information now only lives in parameter detail tables

## 2.0.3

- Enable links to source code in documentation
- Update dependency versions to latest

## 2.0.2

- Add `@mangs` as code owner
- Update pull request template to remove link to `package.json`
- Update Bun target version from `1.1.2` to `1.1.3`
- Update dependency versions to latest

## 2.0.1

- Build markdown documentation for all utils using TypeDoc and `typedoc-plugin-markdown`
  - Stored in the `documentation/` directory

## 2.0.0

- Added JSDoc comments to all files and functions
  - Verified correctness by enabling `eslint-plugin-jsdoc`
- Added new util function `utils/filesystemUtils.mts` -> `findMissingPaths()`
- Renamed function in `utils/filesystemUtils.mts`
  - `getFilesRecursive()` -> `getPathsRecursive()`
- Minor refactor of `scripts/bun/checkEnvironmentVersions.mts`

## 1.2.0

- Add more HTTPS options
  - `certificateAuthority` for a custom certificate authority
  - `diffieHellmanParametersPath` to customize Diffie Hellman parameters
  - `passphrase` to provide the passphrase used to create a TLS certificate
- Decouple hostname from HTTPS options
- Improve error messaging when HTTPS configuration files cannot be loaded
- Ensure process termination when an HTTPS configuration file cannot be loaded
- Display server options when `DEBUG` environment variable is set to a truthy value

## 1.1.3

- Fix HTTPS error `OpenSSL NO_START_LINE` in `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 1.1.2

- Reduce confusion and possibility for errors by removing option overrides from `utils/networkUtils.mts` -> `startDevelopmentServer()`

## 1.1.1

- Bug fixes for `utils/networkUtils.mts` -> `startDevelopmentServer()`
  - Show an error if the either the HTTPS `certificate` or `privateKey` fields do not point to a file
  - Fix `optionOverrides` field not allowing most fields to be used

## 1.1.0

- Added additional functionality to `utils/networkUtils.mts` -> `startDevelopmentServer()`
  - HTTPS serving with optional custom hostname support
  - Using any option that `Bun.serve()` accepts via an override parameter
- Changed the function signature of `utils/networkUtils.mts` -> `startDevelopmentServer()` to accept the entrypoint function directly instead of an ES module object and a separate key to reference the entrypoint function
- Added locale override parameters to functions that could take advantage of them:
  - `utils/consoleUtils.mts` -> `getPerformanceLabel()`
  - `utils/filesystemUtils.mts` -> `getHumanReadableFilesize()`
  - `utils/timeUtils.mts` -> `getElapsedTimeFormatted()`

## 1.0.9

- Update target Bun version to `1.1.2` to inherit Bun's types for `node:util` `styleText()`; the associated `global.d.ts` was removed

## 1.0.8

- Improve linting correctness of `bun` imports by using the `import/core-modules` ESLint rule

## 1.0.7

- Removed NPM dependency `yoctocolors` by replacing it with `styleText` function from `node:util`
- Replaced `.length` string length calculation with `Bun.stringWidth()` where unicode and emoji character usage is possible
- Rename `package.json` script `check:linting:eslint` to `check:lint-conflicts`
- Bun target version updated to `1.1.1`

## 1.0.6

- Enable Bun-native module support in TypeScript 5.4+ wherein `import` and `require` can be used simultaneously
- Use local workspace TypeScript version by default in VS Code
- Update dependency versions to latest

## 1.0.5

- Minor tweaks to `./scripts/bun/checkEnvironmentVersions.mts`
- Bun target version updated to `1.0.30`
- Update dependency versions to latest
- Prepared `./tsconfig.json` for supporting the Bun-specific features of TypeScript 5.4, specifically a `compilerOptions.module` value of `"Preserve"`

## 1.0.4

- Make ambiguous and hidden characters easier to identify in VSCode by enabling the following settings:
  - `editor.unicodeHighlight.ambiguousCharacters`
  - `editor.unicodeHighlight.invisibleCharacters`

## 1.0.3

- `getElapsedTimeFormatted()` now uses `ms` units by default to match Bun's output
- Update dependency versions to latest

## 1.0.2

- Add NPM package version number badge to [`README.md`](./README.md) that links to the [package homepage on npmjs.com](https://www.npmjs.com/package/@mangs/bun-utils)
- Add homepage and repository metadata to `package.json`

## 1.0.1

- Fix performance regression in `scripts/bun/checkEnvironmentSymlinks.mts`
- Bun target version updated to `1.0.29`
- Change the pull request template to be non-empty
- Update dependency versions to latest

## 1.0.0

- First public release
