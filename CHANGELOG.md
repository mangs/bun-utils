# Changelog

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
