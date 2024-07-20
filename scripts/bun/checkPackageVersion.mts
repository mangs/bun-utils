#!/usr/bin/env bun

/**
 * @file Ensure that every pull request changes the version number in `package.json`.
 */

// External Imports
import { env, file, semver } from 'bun';
import { marked } from 'marked'; // eslint-disable-line import/no-extraneous-dependencies -- used only for development

// Internal Imports
import { dim, white } from '../../src/consoleUtils.mts';
import { measureElapsedTime } from '../../src/timeUtils.mts';

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

// Local Functions
/**
 * Find the first heading that contains a semantic version-compatible version number, then return
 * its value.
 * @param changelogPath Filesystem path to the target changelog.
 * @returns             First semantic version-compatible version number occurring in a heading.
 */
async function getFirstChangelogVersionNumber(changelogPath: string) {
  const changelogContents = await file(changelogPath).text();
  for (const token of marked.lexer(changelogContents)) {
    if (token.type === 'heading' && semver.satisfies(token.text as string, '*')) {
      return token.text as string;
    }
  }
  throw new Error('No changelog heading is a valid semantic version number');
}

/**
 * Get pull request details from the GitHub API.
 * @param targetPullRequest Numeric string representing the pull request whose details to fetch.
 * @returns                 List of a metadata object for each file changed in the target pull request.
 */
async function getPullRequestMetadata(targetPullRequest: string) {
  const response = await fetch(
    `${env.GITHUB_API_URL}/repos/${env.GITHUB_REPOSITORY}/pulls/${targetPullRequest}/files`,
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

  return (await JSON.parse(responseText)) as PullRequestResponse;
}

// Local Variables
const pullRequestNumber = env.GITHUB_REF_NAME?.match(/^\d+/)?.[0];
const versionBeforeRegex = /-\s*"version":\s*"(?<semverBefore>[^"]+)",/;
const versionAfterRegex = /\+\s*"version":\s*"(?<semverAfter>[^"]+)",/;

// Begin Execution
const [[versionBefore, versionAfter], elapsedTime] = await measureElapsedTime(async () => {
  if (!pullRequestNumber || Number.isNaN(Number.parseInt(pullRequestNumber, 10))) {
    throw new TypeError('Pull request number not found', { cause: { pullRequestNumber } });
  }
  const diffEntryList = await getPullRequestMetadata(pullRequestNumber);
  const packageJsonDiffEntry = diffEntryList.find(
    ({ filename, status }) => filename === 'package.json' && status === 'modified',
  );
  if (!packageJsonDiffEntry) {
    throw new Error('package.json is not in the list of changed files');
  }

  const { patch } = packageJsonDiffEntry;
  const { semverBefore } = patch.match(versionBeforeRegex)?.groups ?? {};
  const { semverAfter } = patch.match(versionAfterRegex)?.groups ?? {};
  if (
    typeof semverBefore !== 'string' ||
    typeof semverAfter !== 'string' ||
    (typeof semverBefore === 'string' &&
      typeof semverAfter === 'string' &&
      semverBefore === semverAfter)
  ) {
    throw new Error('package.json version number was not changed');
  }

  const firstChangelogVersionNumber = await getFirstChangelogVersionNumber(
    env.CHANGELOG_PATH ?? './CHANGELOG.md',
  );
  if (firstChangelogVersionNumber !== semverAfter) {
    throw new Error('Changelog does not have a section detailing the latest changes');
  }

  return [semverBefore, semverAfter];
});

console.log(
  `✅ package.json version number changed from ${versionBefore} to ${versionAfter} ${dim(white(`[${elapsedTime}]`))}`,
);
