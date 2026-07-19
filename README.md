# ngk-dashboard

A ready-to-use React component library. Themed [shadcn/ui](https://ui.shadcn.com) primitives with dark mode baked in — install, import one stylesheet, and use the components. No Tailwind or shadcn setup required in your app.

## Install

```bash
npm install ngk-dashboard
```

Peer dependencies: `react` and `react-dom` (v18 or newer).

## Use it

Import the stylesheet **once** at your app's entry point:

```tsx
// main.tsx / App.tsx / layout — wherever your app boots
import 'ngk-dashboard/styles.css'
```

Then use any component:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'ngk-dashboard'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Narrow (subpath) imports

The barrel above tree-shakes in any modern bundler (the package is ESM with
side effects scoped to CSS). If you want to be explicit — or you're pulling in
just one heavy component — import from its subpath so nothing else is even
resolved:

```tsx
import { Button } from 'ngk-dashboard/ui/button'   // no recharts/embla/vaul
import { ChartContainer } from 'ngk-dashboard/ui/chart'
import { DashboardLayout } from 'ngk-dashboard/layout'
import { DataTablePagination } from 'ngk-dashboard/data-table'
```

### Embedding safety

The stylesheet ships Tailwind's theme + utilities **without** Preflight (the
global reset). Its base rules are scoped to this library's own elements, so
importing `ngk-dashboard/styles.css` is safe next to Polaris, a storefront, or
any app with its own global CSS — it won't reset your margins, headings, or box
sizing.

## Page & Layout (Polaris-style)

Prebuilt page scaffolding so a screen is a few lines. `Page` gives you the title
bar + actions; `Layout` gives you a main column with a smaller aside on the
right (stacks on mobile). Describe actions as `{ content, onClick }` and it
builds the themed buttons for you.

```tsx
import { Page, Layout, PageActions, Card, CardContent } from 'ngk-dashboard'

export function OrderPage() {
  return (
    <Page
      title='Order #1024'
      subtitle='Placed today'
      backAction={{ href: '/orders' }}
      primaryAction={{ content: 'Save', onClick: save }}
      secondaryActions={[{ content: 'Export' }, { content: 'Delete' }]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <CardContent>Line items, timeline…</CardContent>
          </Card>
        </Layout.Section>
        <Layout.Section variant='oneThird'>
          <Card>
            <CardContent>Customer, notes…</CardContent>
          </Card>
        </Layout.Section>
      </Layout>

      <PageActions primaryAction={{ content: 'Save', onClick: save }} />
    </Page>
  )
}
```

`Layout.Section` variants: default (fills), `oneHalf`, `oneThird` (the aside).
Buttons also gained Polaris-like conveniences — `loading` (spinner + disabled)
and `icon` / `iconRight`:

```tsx
<Button loading={saving} icon={Save}>Save</Button>
```

Pair this with `DashboardLayout` (the app shell) below: the sidebar/header wrap
the app, and each screen renders a `Page` inside it.

## Form field states

The form primitives carry the states a real form needs — no wrapper markup:

```tsx
import { Input, Textarea, Button, Badge } from 'ngk-dashboard'
import { Search } from 'lucide-react'

<Input icon={Search} placeholder="Search orders" clearable onClear={clear} />
<Input prefix="https://" suffix=".myshopify.com" />
<Input loading={checking} error={!available} />       {/* async check + invalid */}

<Textarea showCount maxLength={280} error={tooLong} />  {/* live counter */}

<Button fullWidth loading={saving}>Save</Button>

<Badge variant="success" dot>Active</Badge>            {/* success | warning | info */}
```

Input props: `icon`, `prefix`, `suffix`, `loading`, `clearable`/`onClear`,
`error`. Textarea: `error`, `showCount`. Select: `<SelectTrigger error />`.

## Card states

The Card carries its own interactive states, so you don't hand-wire overlays.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardSkeleton, ErrorState } from 'ngk-dashboard'

// 1. Initial load — no content yet:
{isLoading ? <CardSkeleton lines={4} /> : <Card>…</Card>}

// 2. Refreshing in place — spinner overlay, content stays, layout doesn't jump:
<Card loading={isRefetching}>
  <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
  <CardContent>{chart}</CardContent>
</Card>

// 3. Saving — spinner + lock the whole card (mouse AND keyboard, via `inert`):
<Card loading={saving} disabled={saving}>
  <form>…</form>
</Card>

// 4. Async failure — a retry state:
{error
  ? <ErrorState onRetry={refetch}>Couldn't load orders.</ErrorState>
  : <Card>…</Card>}

// 5. Selectable / clickable (plan pickers, drill-downs):
<Card interactive selected={plan === 'pro'} onClick={() => setPlan('pro')}>…</Card>
<Card asChild interactive><a href="/orders/1024">…</a></Card>   {/* whole card is a link */}

// 6. Needs-attention accent stripe:
<Card tone="warning">…</Card>   {/* default | info | success | warning | critical */}
```

**Prop summary** (all optional, all compose):

| Prop | What it does |
|---|---|
| `loading` | Spinner overlay over content; sets `aria-busy` |
| `disabled` | Dims + fully locks the subtree (mouse + keyboard, via `inert`) |
| `interactive` | Hover elevation, focus ring, pointer/keyboard activation |
| `selected` | Highlight ring (choice/plan cards) |
| `tone` | Left status stripe: `info`/`success`/`warning`/`critical` |
| `asChild` | Render the card as its child (e.g. wrap in a link) |

Related: `CardSkeleton` (initial load), `ErrorState` (async failure + retry),
`SkeletonPage` (whole-page loading), `EmptyState` (zero results).

## Theme it once

Define your design basics in one place and everything beneath inherits them —
Card, Button, Separator, inputs, the layout, all of it. `primary` is usually the
only value you need; it drives buttons, links, focus rings, and active nav.

```tsx
import { ThemeProvider } from 'ngk-dashboard'

<ThemeProvider
  primary='#5b5bd6'        // any CSS color; the whole accent system derives from it
  radius='0.5rem'
  font='Inter, sans-serif'
  inline                    // no layout box — wrap your whole app
>
  <App />
</ThemeProvider>
```

`ThemeProvider` also accepts `secondary`, `accent`, `destructive`, `background`,
`foreground`, `border`, and a `tokens={{ … }}` escape hatch for any other token.

Prefer zero runtime? Set the same variables in your global CSS — no provider:

```css
:root {
  --primary: #5b5bd6;
  --radius: 0.5rem;
}
```

## Dark mode

The theme ships as CSS variables plus a `.dark` variant. Toggle dark mode by
putting a `dark` class on a parent element (usually `<html>`):

```ts
document.documentElement.classList.toggle('dark')
```

Everything flips automatically. There's no theme provider to wire up.

## Dashboard layout

Don't assemble the shell yourself — `DashboardLayout` gives you a themed
sidebar + header + content area from a nav config. Pass `nav` and `children`
and you have a working dashboard; everything else is optional.

```tsx
import { DashboardLayout, Button } from 'ngk-dashboard'
import { LayoutDashboard, Settings, Users } from 'lucide-react'

const nav = [
  {
    title: 'General',
    items: [
      { title: 'Dashboard', href: '/', icon: LayoutDashboard },
      { title: 'Users', href: '/users', icon: Users, badge: 4 },
      {
        title: 'Settings',
        icon: Settings,
        items: [
          { title: 'Profile', href: '/settings/profile' },
          { title: 'Billing', href: '/settings/billing' },
        ],
      },
    ],
  },
]

export function App() {
  return (
    <DashboardLayout
      nav={nav}
      logo={<span className='px-2 font-semibold'>Acme</span>}
      headerEnd={<Button size='sm'>New</Button>}
    >
      <h1>Welcome</h1>
    </DashboardLayout>
  )
}
```

It is **router-neutral**. By default links are plain `<a>` tags (full-page
navigation). To get client-side routing and active highlighting, pass
`renderLink` and `currentPath`:

```tsx
import { Link, useRouterState } from '@tanstack/react-router'

<DashboardLayout
  nav={nav}
  currentPath={useRouterState({ select: (s) => s.location.pathname })}
  renderLink={({ href, className, children, onClick, ...rest }) => (
    <Link to={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  )}
>
  {/* … */}
</DashboardLayout>
```

The same `renderLink` shape works for React Router (`<Link to={href}>`) or
Next (`<Link href={href}>`). Prefer to build your own shell? The pieces are
exported too: `Header`, `Main`, `NavGroup`, `TopNav`, plus the `Sidebar*`
primitives.

## What's included

Full shadcn/ui parity — every primitive in the registry:

Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button,
Calendar, Card, Carousel, Chart (Recharts), Checkbox, Collapsible, Command,
ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP,
Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup,
Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider,
Switch, Table, Tabs, Textarea, Toaster (Sonner), Toggle, ToggleGroup, Tooltip.

Layout: DashboardLayout (ready-made shell) plus the router-neutral pieces
Header, Main, NavGroup, TopNav. Page scaffolding: Page, Layout/Layout.Section,
PageActions, SaveBar (contextual save bar). Content primitives: BlockStack, InlineStack (gap-based spacing),
Text (type scale), Banner, EmptyState, SkeletonPage, StatCard (KPI). Theming:
ThemeProvider. `Layout.Section` supports a `sticky` right-hand aside.

Composed dashboard components: DataTable (TanStack Table — column header,
toolbar, faceted filter, view options, pagination, bulk actions), DatePicker,
ConfirmDialog, PasswordInput, LongText.

Helpers: `cn`, `useIsMobile`, `getPageNumbers`, `getDisplayNameInitials`,
`sleep`.

### Notes

- **Toaster** takes `theme` as a prop (`"light" | "dark" | "system"`, default
  `"system"`). Pass your app's current theme to keep it in sync.
- **Sidebar** needs its `SidebarProvider` wrapper (standard shadcn pattern).
- The theme references the **Inter** and **Manrope** font families but does not
  bundle them. Load them in your app if you want that exact look; otherwise it
  falls back to the system sans-serif.
- The simple primitives (Button, Card, Input, Dialog, Tabs, …) are used exactly
  like [shadcn/ui](https://ui.shadcn.com/docs/components) — just import them
  from `ngk-dashboard` instead of copying files. TypeScript types cover the
  props. The recipes below are only for the components that need extra setup.

## Recipes

Some components wrap a third-party library that ships **with** ngk-dashboard
(no extra install needed) but that you import hooks/types from directly:
`react-hook-form` (Form), `@tanstack/react-table` (DataTable),
`recharts` (Chart), `date-fns` (DatePicker).

### Toasts

Render `<Toaster />` once near your app root, then call `toast()` anywhere:

```tsx
import { Toaster, Button, toast } from 'ngk-dashboard'

function App() {
  return (
    <>
      <Button onClick={() => toast.success('Saved!')}>Save</Button>
      <Toaster theme='system' />
    </>
  )
}
```

### Form (react-hook-form)

```tsx
import { useForm } from 'react-hook-form'
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Input, Button,
} from 'ngk-dashboard'

export function ProfileForm() {
  const form = useForm({ defaultValues: { username: '' } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => console.log(v))}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='ada' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
```

### Chart (Recharts)

Wrap Recharts primitives in `ChartContainer` and pass a `ChartConfig` that maps
each series to a label and color (use the built-in `--chart-1…5` tokens):

```tsx
import { Bar, BarChart, XAxis } from 'recharts'
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from 'ngk-dashboard'

const data = [
  { month: 'Jan', sales: 186 },
  { month: 'Feb', sales: 305 },
]

const config = {
  sales: { label: 'Sales', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function SalesChart() {
  return (
    <ChartContainer config={config} className='h-64 w-full'>
      <BarChart data={data}>
        <XAxis dataKey='month' />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='sales' fill='var(--color-sales)' radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

### DataTable (TanStack Table)

The `DataTable*` components are composable pieces, not one component. You own
the table instance (`useReactTable`) and drop the toolbar/pagination around a
plain `<Table>`:

```tsx
import {
  useReactTable, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, flexRender, type ColumnDef,
} from '@tanstack/react-table'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  DataTableToolbar, DataTablePagination,
} from 'ngk-dashboard'

type Person = { name: string; role: string }

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
]

export function PeopleTable({ data }: { data: Person[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} searchKey='name' />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}
```

`DataTableToolbar` also accepts `filters` (faceted filters) and
`searchPlaceholder`; `DataTableColumnHeader`, `DataTableViewOptions`, and
`DataTableBulkActions` are available for richer tables.

### DatePicker

Controlled — you hold the `Date` in state:

```tsx
import { useState } from 'react'
import { DatePicker } from 'ngk-dashboard'

export function Example() {
  const [date, setDate] = useState<Date>()
  return <DatePicker selected={date} onSelect={setDate} placeholder='Pick a date' />
}
```

### Sidebar

Wrap the app in `SidebarProvider`; use `SidebarTrigger` to toggle it:

```tsx
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarTrigger,
} from 'ngk-dashboard'

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>{/* menu items */}</SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
```

## Develop

```bash
npm install
npm run dev          # tsup watch
npm run build        # dist/index.js, dist/index.d.ts, dist/styles.css + subpaths
npm run verify       # typecheck + type-regression + unit/smoke tests (CI gate)
npm test             # vitest
npm run test:types   # type-level regression suite (type-tests/)
npm run format       # prettier --write
```

Every push and PR runs `verify` in CI (`.github/workflows/ci.yml`). Add
components with `/add-component`; the barrel (`src/index.ts`) and the `exports`
map in `package.json` are the two places a new component must be registered.

## Releasing

Publishing is automated via GitHub Actions — no manual `npm publish`. Pushing a
`v*.*.*` tag runs `.github/workflows/publish.yml`, which typechecks, builds, and
publishes (with npm provenance).

```bash
npm version patch        # bumps package.json + creates the matching v* tag
git push --follow-tags   # CI publishes on the tag
```

The tag must match the version in `package.json` (the workflow enforces this).

**One-time setup** — add an npm token as a repo secret so CI can authenticate:

1. Create an **Automation** token at npmjs.com → Access Tokens → Generate Token
   → *Automation* (this type bypasses 2FA; a Granular token with "bypass 2FA"
   also works). It needs read-write publish access to `ngk-dashboard`.
2. In the GitHub repo → Settings → Secrets and variables → Actions → New
   repository secret, name it **`NPM_TOKEN`** and paste the token.

That's it — every tagged release publishes itself.

## License

MIT
