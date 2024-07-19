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
console.log('PATCH', patchContents);

const isValidPatchRange = patchContents.startsWith('@@ -1,');
const versionBefore = /-\s*"version":\s*"(?<semverBefore>[^"]+)",/;
const versionAfter = /\+\s*"version":\s*"(?<semverAfter>[^"]+)",/;

const { semverBefore } = patchContents.match(versionBefore).groups;
const { semverAfter } = patchContents.match(versionAfter).groups;
console.log('MATCH BEFORE', semverBefore);
console.log('MATCH AFTER', semverAfter);

const isVersionChanged = semverBefore !== semverAfter;
console.log('IS VERSION CHANGED?', isVersionChanged);
