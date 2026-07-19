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
- **Variants via `cva`**, exported as a named props type. When the props extend
  an **intrinsic** element (`<button>`, `<a>`, `<span>`, `<div>`) you MUST strip
  the cva-owned keys from the native props, or a consumer's ambient JSX
  augmentation (e.g. Shopify App Bridge adds its own `variant` to `<button>`)
  collapses your variant union. This is a shipped-as-a-package hazard shadcn's
  copy-into-your-app source ignores. Pattern:
  ```ts
  export type ButtonProps = Omit<
    React.ComponentProps<'button'>,
    keyof VariantProps<typeof buttonVariants>
  > &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }
  ```
  Radix-primitive props (`ComponentProps<typeof X.Root>`) are NOT augmented, so
  they don't need `Omit` (and `Omit` breaks discriminated unions like
  ToggleGroup's `type`). `type-tests/variant-collision.ts` guards this — keep it
  green.
- **Function components, not `forwardRef`.** These are shadcn's newer
  `data-slot` components: type props as `React.ComponentProps<'element'>` and
  add a `data-slot="name"` attribute. The `data-slot` is load-bearing — the
  scoped CSS base layer targets it (see below).
- **Register every new component in TWO places:** `src/index.ts` (barrel) and,
  for a new subpath, the `exports` map in `package.json`. A `ui/*` component is
  covered by the wildcard; new top-level dirs need an explicit `exports` entry.
- **Styling uses theme tokens**, never hardcoded colors — `bg-primary`,
  `text-muted-foreground`, `border-border`, etc. If a token is missing, add it
  to `src/theme.css` for *both* `:root` and `.dark`.
- **Dark mode is class-based** (`.dark` on an ancestor). No theme provider.
- Match the existing formatting: single quotes, no semicolons, 2-space indent.

## CSS strategy

`src/styles.css` ships Tailwind theme + utilities but **not Preflight** — this
library gets embedded in apps with their own global CSS (Polaris, storefronts),
so a global reset is off-limits. The base layer is scoped to `[data-slot]`
subtrees. Consequences to remember:
- New components must carry a `data-slot` on their root so the scoped base
  (box-sizing, themed border color) reaches them.
- Never add a global (`*`, `body`, bare `button`) rule to `styles.css` — scope
  it under `[data-slot]`.
- Sonner styles are compiled in via `@import 'sonner/dist/styles.css'`.

## Workflow

Before considering any change done, run the full gate:

```bash
npm run verify   # format:check + typecheck + test:types + test
npm run build    # index + per-component subpaths + styles.css
```

`/verify` runs the gate. When adding a primitive, prefer `/add-component`. CI
(`.github/workflows/ci.yml`) runs `verify` + `build` on every push and PR, so
keep them green locally.

## Releasing

Publishing is automated — never run `npm publish` by hand. Pushing a `v*.*.*`
tag triggers `.github/workflows/publish.yml` (typecheck → build → publish with
provenance), authenticated by the `NPM_TOKEN` repo secret. To cut a release:
`npm version <patch|minor|major>` then `git push --follow-tags`, or run
`/release`. The tag must match `package.json`'s version or the workflow fails.

## Gotchas

- New utility classes only ship if the file matches the `@source` globs in
  `src/styles.css` (`components/**/*.tsx`, `hooks/**/*.tsx`). Files elsewhere
  won't have their classes compiled into `dist/styles.css`.
- `react` / `react-dom` are `external` in the bundle — never import from them in
  a way that assumes they're bundled.
- The theme references **Inter** / **Manrope** but does not bundle fonts.
- Don't commit `dist/` changes as "the work" — it's a build artifact; the source
  in `src/` is the change.
