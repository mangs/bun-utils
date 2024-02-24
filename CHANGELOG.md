# Changelog

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
