# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## 1.6.0

### Added

- **Stateful Card.** New optional props, all composable:
  - `loading` — spinner overlay over content (`aria-busy`), no layout jump.
  - `disabled` — dims and fully locks the subtree, mouse *and* keyboard (`inert`).
  - `interactive` — hover elevation + focus ring + keyboard activation.
  - `selected` — highlight ring for choice/plan pickers.
  - `tone` — status accent stripe (`info`/`success`/`warning`/`critical`).
  - `asChild` — render the whole card as a link/button.
- **`CardSkeleton`** — card-shaped placeholder for initial load.
- **`ErrorState`** — centered async-failure state with a built-in retry, the
  error counterpart to `EmptyState`.

## 1.5.0

### Added

- **`SaveBar`** — contextual save bar (the Shopify/Polaris pattern). Pin it at
  the top of a page and open it when a form goes dirty; it offers Discard + Save
  (with a loading state). Controlled via `open` — pair it with your form state,
  e.g. react-hook-form's `formState.isDirty`. On the `ngk-dashboard/page` subpath.

## 1.4.0

### Added

- **`StatCard`** — prebuilt KPI card: label, big metric, and a colored trend
  delta (`up`/`down`/`neutral`) with an arrow, plus optional `icon` and
  `helpText`. The dashboard staple, one component.
- **`Layout.Section` `sticky` prop** — pins a section in view while the page
  scrolls (desktop), for a Shopify-style right-hand aside next to a long main
  column.

## 1.3.0

### Added

Polaris-style content primitives so you rarely hand-write flexbox or type again:

- **`BlockStack` / `InlineStack`** — gap-based vertical/horizontal spacing with
  `gap`, `align`, `justify` (and `wrap` for inline).
- **`Text`** — typographic scale (`headingXl`…`bodySm`) with `tone`, `weight`,
  `alignment`, `truncate`, and a sensible default element per variant.
- **`Banner`** — status callout (`info`/`success`/`warning`/`critical`) with
  title, icon, and optional dismiss.
- **`EmptyState`** — centered placeholder for empty/zero-result screens.
- **`SkeletonPage`** — page-shaped loading scaffold.

## 1.2.0

### Added

- **`ThemeProvider` — define your design basics once.** Wrap the app (or any
  subtree) and set `primary`, `radius`, `font`, and other tokens; the CSS
  variables cascade to every component beneath. `inline` applies them with no
  layout box. Available on the `ngk-dashboard/theme` subpath. A zero-runtime CSS
  override still works too.

### Changed

- `--ring` (focus ring) and the sidebar accent tokens now derive from
  `--primary`, so overriding the brand color alone rebrands buttons, links,
  focus rings, and active nav together.

## 1.1.0

### Added

- **Polaris-style prebuilt page scaffolding** so a screen is a few lines:
  - `Page` — title bar with title/subtitle/metadata, back action, and primary +
    secondary actions (described as `{ content, onClick }` or passed as nodes),
    with a sensible centered max-width (`fullWidth` / `narrowWidth` to override).
  - `Layout` + `Layout.Section` — main column with a smaller `oneThird`/`oneHalf`
    aside on the right; stacks on mobile. Compound `Layout.Section` API plus
    tree-shakeable `LayoutSection` named export.
  - `PageActions` — footer action bar (secondary left, primary right).
  - Available on the `ngk-dashboard/page` subpath.
- **Button conveniences**: `loading` (spinner + auto-disable), `icon`, and
  `iconRight` props.

## 1.0.0

First stable release. Focuses on correctness and quality gaps that only surface
when shadcn/ui components are shipped as a real npm package (rather than copied
into an app).

### Fixed

- **Variant prop collision with ambient JSX augmentation.** Components whose
  props extended the native `<button>` / `<a>` element (Button, Badge, Alert,
  SidebarMenuButton, BreadcrumbLink, PaginationLink, SidebarMenuSubButton) now
  `Omit` their cva-owned keys from the native props before adding `VariantProps`.
  Previously, a consumer that ambiently augmented `<button>`/`<a>` — e.g. Shopify
  App Bridge adding its own `variant` — collapsed our variant unions down to the
  augmented values, breaking `<Button variant="secondary">` at the type level.
  A type-level regression test now guards this.

### Changed

- **CSS no longer ships Tailwind Preflight.** The stylesheet previously applied a
  global reset that leaked into any embedding app (breaking Polaris/storefront
  CSS). The base layer is now scoped to the library's own elements (rooted at
  `data-slot`), so importing `ngk-dashboard/styles.css` never touches host
  styles.
- **Sonner toast styles are compiled into `styles.css`** instead of relying on
  runtime `<style>` injection (which a strict CSP or shadow DOM can block).

### Added

- **Subpath exports** for narrow, tree-shakeable imports:
  `ngk-dashboard/ui/<component>`, `ngk-dashboard/layout`,
  `ngk-dashboard/data-table`, and the composed helpers. Importing
  `ngk-dashboard/ui/button` no longer pulls heavy deps (recharts, embla, vaul).
- **Tests + CI gate.** Vitest render/smoke tests, a type-level regression suite
  (`test:types`), and a `verify` script wired into a CI workflow that runs on
  every push and PR.

## 0.3.0

- `DashboardLayout` — ready-made sidebar + header + content shell driven by a
  nav config, router-neutral via a `renderLink` slot and `currentPath`. Exposes
  the individual pieces (Header, Main, NavGroup, TopNav) too.

## 0.2.2

- Export named props interfaces for variant components so the emitted `.d.ts`
  inlines the cva union instead of an unresolved `VariantProps` intersection.

## 0.2.1

- Usage recipes in the README; re-export sonner's `toast` from the barrel.

## 0.2.0

- Full shadcn/ui primitive parity (16 more primitives) plus composed dashboard
  components: DataTable suite, DatePicker, ConfirmDialog, PasswordInput,
  LongText.

## 0.1.0

- Initial release: themed shadcn/ui primitives with dark mode, one stylesheet.
