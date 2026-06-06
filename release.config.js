/**
 * Semantic Release — root monorepo version (v* tags, GitHub Releases).
 * Runs on master push before production deploy (see .github/workflows/deploy.yml).
 */

module.exports = {
  branches: ["master"],
  tagFormat: "v${version}",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "docs", release: false },
          { type: "style", release: false },
          { type: "refactor", release: false },
          { type: "test", release: false },
          { type: "chore", release: false },
          { type: "dependencies", release: false },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "New Features", hidden: false },
            { type: "fix", section: "Bug Fixes", hidden: false },
            { type: "perf", section: "Performance Improvements", hidden: false },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "test", hidden: true },
            { type: "chore", hidden: true },
            { type: "dependencies", hidden: true },
          ],
        },
        writerOpts: {
          groupBy: "type",
          commitGroupsSort: ["feat", "fix", "perf"],
          commitsSort: "header",
        },
      },
    ],
    ["@semantic-release/npm", { npmPublish: false }],
    [
      "@semantic-release/git",
      {
        assets: ["package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github",
  ],
};
