# Best practices

How to build a dashboard with `ngk-dashboard` the way it's meant to be used.
The rule of thumb: **describe what you want, don't assemble it.** If you're
hand-writing flexbox, hardcoding colors, or wiring your own overlays, there's
usually a prop for that.

---

## 1. Set up once

Do these three things at the root of your app and never again:

```tsx
// main.tsx / root layout
import 'ngk-dashboard/styles.css' // once, at the entry point — never per-component
import { ThemeProvider } from 'ngk-dashboard'

createRoot(el).render(
  <ThemeProvider primary="#5b5bd6" radius="0.5rem" font="Inter, sans-serif" inline>
    <App />
  </ThemeProvider>
)
```

- **Import `styles.css` exactly once.** It's Preflight-free and scoped to the
  library's own elements, so it won't fight your app's global CSS.
- **Set your brand in `ThemeProvider`, not by editing components.** `primary`
  drives buttons, links, focus rings, and active nav together.
- **Dark mode** is a `dark` class on an ancestor (usually `<html>`). No provider,
  no state to wire.

**Don't:** import `styles.css` in multiple files, override colors with
`!important`, or fork a component to change its color.

---

## 2. The anatomy of a screen

Compose top-down. Each layer has one job:

```tsx
<DashboardLayout nav={nav} currentPath={path} renderLink={Link}>   {/* app shell: sidebar + header */}
  <Page                                                            {/* one screen: title + actions */}
    title="Orders"
    primaryAction={{ content: 'Create order', onClick: create }}
  >
    <Layout>                                                       {/* in-page columns */}
      <Layout.Section>{/* main content */}</Layout.Section>
      <Layout.Section variant="oneThird" sticky>{/* aside */}</Layout.Section>
    </Layout>
  </Page>
</DashboardLayout>
```

- `DashboardLayout` wraps the **whole app** (render it once, around your router
  outlet). `Page` wraps **each screen**.
- Put page-level buttons in `Page`'s `primaryAction` / `secondaryActions`, not in
  ad-hoc divs.

---

## 3. Layout: stacks and Text, not raw CSS

Reach for the primitives before writing `className="flex ..."`:

| Instead of | Use |
|---|---|
| `<div className="flex flex-col gap-4">` | `<BlockStack gap={4}>` |
| `<div className="flex items-center gap-2">` | `<InlineStack gap={2}>` |
| `<h1 className="text-2xl font-semibold">` | `<Text variant="headingXl">` |
| a two-column `grid` | `<Layout>` + `Layout.Section` |

This keeps spacing and type consistent across every screen and every developer.

---

## 4. Data has four states — render all of them

Every async view moves through the same states. Map each to a component:

```tsx
if (isLoading) return <CardSkeleton lines={4} />          // first load, no content yet
if (error)     return <ErrorState onRetry={refetch}>Couldn't load.</ErrorState>
if (isEmpty)   return <EmptyState heading="No orders yet">…</EmptyState>
return (
  <Card loading={isRefetching}>                            // refreshing existing content
    …
  </Card>
)
```

- **`CardSkeleton` / `SkeletonPage`** = *initial* load (nothing to show yet).
- **`Card loading`** = *refresh* (content stays, spinner overlays, no layout jump).
- **`ErrorState`** ≠ **`EmptyState`** — "failed" and "nothing here" are different;
  don't collapse them.

---

## 5. Forms

Pair `Form` (react-hook-form) with the field `error` props and a `SaveBar`:

```tsx
const form = useForm({ defaultValues })

<Form {...form}>
  <form onSubmit={form.handleSubmit(save)}>
    <FormField name="email" control={form.control} render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input error={!!fieldState.error} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />

    <SaveBar
      open={form.formState.isDirty}      {/* appears only when something changed */}
      saving={saving}
      onSave={form.handleSubmit(save)}
      onDiscard={() => form.reset()}
    />
  </form>
</Form>
```

- Every `error` prop maps to `aria-invalid` — validation is accessible, not just red.
- While saving, lock the form: `<Card loading disabled>` around the fields.

---

## 6. Where actions live

| Placement | Use |
|---|---|
| `Page` `primaryAction` / `secondaryActions` | Page-level actions (top-right header) |
| `PageActions` | Footer action bar at the bottom of a long form |
| `SaveBar` | Contextual "unsaved changes" bar, tied to form dirty state |
| `CardAction` | An action in a card's header (menu, toggle) |

Describe actions as `{ content, onClick }` objects — the library builds the
themed button (with `loading`, `icon`, etc.). Pass a ReactNode only when you need
something custom.

---

## 7. Imports

- Default to the **barrel**: `import { Button, Card } from 'ngk-dashboard'`. It
  tree-shakes in any modern bundler (ESM, side effects scoped to CSS).
- Use a **subpath** to be explicit or to isolate a heavy component:
  `import { ChartContainer } from 'ngk-dashboard/ui/chart'` won't pull recharts
  into a view that only needs a Button.

---

## 8. Router integration

The library never imports a router. Give `DashboardLayout` (and `NavGroup`,
`TopNav`) a `renderLink` and a `currentPath`:

```tsx
<DashboardLayout
  nav={nav}
  currentPath={useLocation().pathname}
  renderLink={({ href, className, children, ...rest }) => (
    <Link to={href} className={className} {...rest}>{children}</Link>
  )}
/>
```

Same shape works for React Router, TanStack Router, and Next. Omit it and links
fall back to plain `<a>`.

---

## Quick do / don't

**Do**
- Theme once via `ThemeProvider` / CSS variables.
- Use theme tokens (`bg-primary`, `text-muted-foreground`) when you add classes.
- Use `BlockStack` / `InlineStack` / `Text` / `Layout` for structure.
- Render loading, empty, error, and ready states.
- Wire `error` props to your validation.

**Don't**
- Import `styles.css` more than once, or add global (`*`, `body`) CSS rules.
- Hardcode hex colors in components.
- Rebuild spinners/overlays by hand — use `loading` / `CardSkeleton` / `SkeletonPage`.
- Reach past a prop into internals when a prop already covers it.
