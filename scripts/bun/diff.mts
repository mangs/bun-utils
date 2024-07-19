#!/usr/bin/env bun

/**
 * @file Ensure that every pull request changes the version number in `package.json`.
 */

// External Imports
import { env } from 'bun';

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
const pullRequestNumber = env.GITHUB_REF_NAME?.match(/^\d+/)?.[0];
const versionBeforeRegex = /-\s*"version":\s*"(?<semverBefore>[^"]+)",/;
const versionAfterRegex = /\+\s*"version":\s*"(?<semverAfter>[^"]+)",/;

console.log('PR NUMBER', pullRequestNumber);

// Begin Execution
const response = await fetch(
  `${env.GITHUB_API_URL}/repos/${env.GITHUB_REPOSITORY}/pulls/${pullRequestNumber}/files`,
  {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
  },
);
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

const { patch } = diffEntry;
const { semverBefore } = patch.match(versionBeforeRegex)?.groups ?? {};
const { semverAfter } = patch.match(versionAfterRegex)?.groups ?? {};
const isVersionChanged = semverBefore !== semverAfter;

process.exitCode = isVersionChanged ? 0 : 1;
