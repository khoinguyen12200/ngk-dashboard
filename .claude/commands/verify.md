---
description: Typecheck and build the library, report any failures
allowed-tools: Bash(npm run typecheck), Bash(npm run build)
---

Verify the library is in a shippable state:

1. Run `npm run typecheck` and report any type errors.
2. Run `npm run build` and confirm `dist/index.js`, `dist/index.d.ts`, and
   `dist/styles.css` are all produced.

If either fails, show the relevant output and stop — do not attempt to publish
or commit. If both pass, say so plainly.
