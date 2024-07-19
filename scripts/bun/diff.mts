const response = await fetch('https://api.github.com/repos/mangs/bun-utils/pulls/88/files', {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${Bun.env.GITHUB_TOKEN}`,
  },
});
const responseJson = await response.json();
if (!Array.isArray(responseJson)) {
  throw new Error('booooo', { cause: { responseJson } });
}
const patchContents = responseJson.find(
  ({ filename, status }) => filename === 'package.json' && status === 'modified',
).patch;
const isValidPatchRange = patchContents.startsWith('@@ -1,');
const versionBefore = /^-\s*"version":\s*"([^"]+)",$/;
patchContents.match(versionBefore);
