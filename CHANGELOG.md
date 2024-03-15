# Changelog

## 1.0.7

- Removed NPM dependency `yoctocolors` by replacing it with `styleText` function from `node:util`
- Replaced `.length` string length calculation with `Bun.stringWidth()` where unicode and emoji character usage is possible
- Bun target version updated to `1.0.31`

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
