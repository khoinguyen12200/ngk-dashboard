---
description: Prepare an npm release — bump version, verify, and outline publish steps
argument-hint: <patch|minor|major> (default patch)
---

Prepare a release of ngk-dashboard. Version bump type: `$1` (default `patch`).

Do NOT actually run `npm publish` or `git push` — surface the commands and let
the user run them. Steps:

1. Confirm the working tree is clean (`git status`). If not, stop and report.
2. Run `/verify` (typecheck + build). Both must pass before continuing.
3. Sanity-check the package: every file under `src/components/ui/` and each
   helper is exported from `src/index.ts`; `package.json` `files` still lists
   only `dist`; `exports` map is intact.
4. Propose the `npm version $1` command and summarize what changed since the
   last tag (`git log <last-tag>..HEAD --oneline`) as draft release notes.
5. List the exact publish sequence for the user to run:
   `npm version $1` → `git push --follow-tags` → `npm publish`.
   (`prepublishOnly` rebuilds automatically.)
