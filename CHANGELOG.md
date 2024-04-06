# Changelog

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
