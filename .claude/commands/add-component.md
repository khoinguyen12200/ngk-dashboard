---
description: Add a new UI primitive following the project's shadcn conventions
argument-hint: <component-name> (e.g. progress, accordion)
---

Add a new primitive named `$1` to the library. Follow the exact conventions in
`CLAUDE.md` and the existing files in `src/components/ui/`.

Steps:

1. Look at `src/components/ui/button.tsx` (cva variants) and a plain one like
   `src/components/ui/card.tsx` (`data-slot` function components) as templates.
2. If `$1` wraps a Radix primitive, add the matching `@radix-ui/react-$1`
   dependency to `package.json` and `npm install`. Otherwise skip.
3. Create `src/components/ui/$1.tsx`:
   - Use the `@/` alias for imports (`import { cn } from '@/lib/utils'`).
   - Function components with a `data-slot` attribute on the root (load-bearing:
     the scoped CSS base layer targets it). No `forwardRef`.
   - Use `cva` for variants when the component has them, and export a named props
     type. If the props extend an **intrinsic** element (`<button>`, `<a>`,
     `<span>`, `<div>`), `Omit` the cva-owned keys from the native props — see
     the variant rule in `CLAUDE.md`. Radix-primitive props don't need `Omit`.
   - Style with theme tokens only (`bg-primary`, `text-muted-foreground`, …),
     never hardcoded colors. Support dark mode via existing tokens.
4. Register it in BOTH places:
   - `export * from './components/ui/$1'` in `src/index.ts` (alphabetical).
   - It's covered by the `./ui/*` `exports` wildcard automatically; only add an
     `exports` entry for a brand-new top-level dir.
5. If the component needs a new theme token, add it to `src/theme.css` for both
   `:root` and `.dark`.
6. If it takes variants or has interactive behavior, add it to the render smoke
   test in `src/test/smoke.test.tsx`.
7. Run `/verify` and `npm run build`; confirm the new exports appear in
   `dist/index.d.ts` and the subpath `dist/components/ui/$1.js` builds.

Report what you created and any new dependency added.
