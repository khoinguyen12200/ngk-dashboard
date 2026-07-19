# ngk-dashboard

A publishable React component library: themed [shadcn/ui](https://ui.shadcn.com)
primitives with dark mode baked in. Consumers `npm install ngk-dashboard`,
import one stylesheet, and use the components — no Tailwind or shadcn setup on
their side.

## What this project is (and isn't)

- **Is:** a distributable npm package. The build output in `dist/` is the
  product. Everything is optimized for a clean consumer experience.
- **Isn't:** an app. There is no dev server, no runtime, no pages. You verify
  work with `typecheck` + `build`, not by "running the app".

## Tech stack

- **React 19** (peers: `react`, `react-dom` >= 18) — components must stay
  compatible with React 18.
- **TypeScript** in `strict` mode, plus `noUnusedLocals` / `noUnusedParameters`.
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`). Theme lives
  in `src/theme.css` as CSS variables; entry is `src/styles.css`.
- **tsup** bundles ESM + `.d.ts` (`tsup.config.ts`). ESM-only output.
- **Radix UI** primitives + **class-variance-authority** for variants.

## Layout

```
src/
  index.ts              # Public API barrel — every export ships from here
  styles.css            # Tailwind entry (@import + @source globs + base layer)
  theme.css             # Design tokens: CSS vars for light + .dark
  lib/utils.ts          # cn(), sleep(), pagination + initials helpers
  hooks/use-mobile.tsx  # useIsMobile()
  components/ui/*.tsx    # One file per primitive
```

## Conventions (follow these exactly)

- **Imports use the `@/` alias**, e.g. `import { cn } from '@/lib/utils'`.
  It resolves via tsconfig `paths` and the tsup esbuild alias — never use deep
  relative paths like `../../lib/utils`.
- **`cn()` for all className merging.** Never concatenate class strings by hand.
- **Variants via `cva`** with a `VariantProps<typeof xVariants>` type, matching
  the pattern in `button.tsx`. Export the variants object when it's reusable
  (e.g. `export { Button, buttonVariants }`).
- **Function components, not `forwardRef`.** These are shadcn's newer
  `data-slot` components: type props as `React.ComponentProps<'element'>` and
  add a `data-slot="name"` attribute. Match the existing files.
- **Every new export must be added to `src/index.ts`** or it won't ship.
- **Styling uses theme tokens**, never hardcoded colors — `bg-primary`,
  `text-muted-foreground`, `border-border`, etc. If a token is missing, add it
  to `src/theme.css` for *both* `:root` and `.dark`.
- **Dark mode is class-based** (`.dark` on an ancestor). No theme provider.
- Match the existing formatting: single quotes, no semicolons, 2-space indent.

## Workflow

Before considering any change done:

```bash
npm run typecheck   # tsc --noEmit — must pass clean
npm run build       # produces dist/index.js, dist/index.d.ts, dist/styles.css
```

`/verify` runs both. When adding a primitive, prefer `/add-component`.

## Gotchas

- New utility classes only ship if the file matches the `@source` globs in
  `src/styles.css` (`components/**/*.tsx`, `hooks/**/*.tsx`). Files elsewhere
  won't have their classes compiled into `dist/styles.css`.
- `react` / `react-dom` are `external` in the bundle — never import from them in
  a way that assumes they're bundled.
- The theme references **Inter** / **Manrope** but does not bundle fonts.
- Don't commit `dist/` changes as "the work" — it's a build artifact; the source
  in `src/` is the change.
