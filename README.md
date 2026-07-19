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
Header, Main, NavGroup, TopNav.

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
npm run build      # builds dist/index.js, dist/index.d.ts, dist/styles.css
```

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
