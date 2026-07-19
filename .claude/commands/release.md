---
description: Cut a release — bump version and push the tag; CI publishes to npm
argument-hint: <patch|minor|major> (default patch)
---

Release ngk-dashboard. Version bump type: `$1` (default `patch`).

Publishing is automated: pushing a `v*.*.*` tag triggers
`.github/workflows/publish.yml`, which typechecks, builds, and runs
`npm publish`. You do NOT run `npm publish` locally.

Steps:

1. Confirm the working tree is clean (`git status`). If not, stop and report.
2. Run `/verify` (typecheck + build). Both must pass before continuing.
3. Sanity-check exports: every file under `src/components/ui/`, the layout,
   and each helper is exported from `src/index.ts`; `package.json` `files`
   still lists only `dist`.
4. Summarize changes since the last tag (`git log <last-tag>..HEAD --oneline`)
   as draft release notes.
5. Run `npm version $1` (creates the commit + matching `v*` tag), then
   `git push --follow-tags`.
6. Report the Actions run URL so the user can watch the publish
   (`gh run watch` or the repo's Actions tab).

If CI publish fails on auth, the `NPM_TOKEN` repo secret is missing or expired
(see the "Automated publishing" section in the README).
