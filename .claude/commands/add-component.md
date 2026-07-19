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
   - Function components with `data-slot` attributes, typed as
     `React.ComponentProps<...>`. No `forwardRef`.
   - Use `cva` for variants when the component has them; export the variants
     object alongside the component.
   - Style with theme tokens only (`bg-primary`, `text-muted-foreground`, …),
     never hardcoded colors. Support dark mode via existing tokens.
4. Add `export * from './components/ui/$1'` to `src/index.ts`, keeping the list
   alphabetically ordered.
5. If the component needs a new theme token, add it to `src/theme.css` for both
   `:root` and `.dark`.
6. Run `/verify` (typecheck + build) and confirm the new exports appear.

Report what you created and any new dependency added.
