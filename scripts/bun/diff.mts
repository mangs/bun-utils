// Local Types
interface DiffEntry {
  additions: number;
  blob_url: string;
  changes: number;
  contents_url: string;
  deletions: number;
  filename: string;
  patch: string;
  previous_filename: string;
  raw_url: string;
  sha: string;
  status: 'added' | 'changed' | 'copied' | 'modified' | 'removed' | 'renamed' | 'unchanged';
}

type PullRequestResponse = DiffEntry[];

// Local Variables
const versionBeforeRegex = /-\s*"version":\s*"(?<semverBefore>[^"]+)",/;
const versionAfterRegex = /\+\s*"version":\s*"(?<semverAfter>[^"]+)",/;

// Begin Execution
const response = await fetch('https://api.github.com/repos/mangs/bun-utils/pulls/88/files', {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${Bun.env.GITHUB_TOKEN}`,
  },
});
const responseText = await response.text();
if (!response.ok) {
  throw new Error('Pull request API response error received', {
    cause: {
      responseText,
      statusCode: response.status,
      statusText: response.statusText,
    },
  });
}

const responseJson = (await JSON.parse(responseText)) as PullRequestResponse;
const diffEntry = responseJson.find(
  ({ filename, status }) => filename === 'package.json' && status === 'modified',
);
if (!diffEntry) {
  throw new Error('package.json is not in the list of changed files');
}

const patchContents = diffEntry.patch;
console.log('PATCH', patchContents);

const { semverBefore } = patchContents.match(versionBeforeRegex)?.groups ?? {};
const { semverAfter } = patchContents.match(versionAfterRegex)?.groups ?? {};
console.log('MATCH BEFORE', semverBefore);
console.log('MATCH AFTER', semverAfter);

const isVersionChanged = semverBefore !== semverAfter;
console.log('IS VERSION CHANGED?', isVersionChanged);
