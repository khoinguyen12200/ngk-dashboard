# Component reference

Every export, grouped by what it's for. Each entry: what it does, the props
worth knowing (📦 = added by this package beyond shadcn/ui), and a short example.
Import anything from the barrel (`import { X } from 'ngk-dashboard'`) or its
subpath where noted.

- [Actions & buttons](#actions--buttons)
- [Form fields](#form-fields)
- [Selection & toggles](#selection--toggles)
- [Overlays & menus](#overlays--menus)
- [Navigation](#navigation)
- [Data display](#data-display)
- [Feedback & status](#feedback--status)
- [Layout & structure](#layout--structure)
- [Page scaffolding](#page-scaffolding)
- [Theming](#theming)
- [Utilities & hooks](#utilities--hooks)

---

## Actions & buttons

### Button
Themed button with six variants and built-in async/icon affordances.
- `variant`: `default` · `secondary` · `outline` · `ghost` · `destructive` · `link`
- `size`: `default` · `sm` · `lg` · `icon`
- 📦 `loading` (spinner + auto-disable) · `icon` / `iconRight` (lucide component) · `fullWidth` · `asChild`

```tsx
<Button variant="secondary" icon={Plus}>New</Button>
<Button loading={saving} fullWidth>Save</Button>
<Button asChild><a href="/x">Link</a></Button>
```

### Badge
Small status pill.
- `variant`: `default` · `secondary` · `destructive` · `outline` · 📦 `success` · `warning` · `info`
- 📦 `dot` (leading status dot) · `asChild`

```tsx
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending</Badge>
```

---

## Form fields

### Form
`react-hook-form` bindings: `Form`, `FormField`, `FormItem`, `FormLabel`,
`FormControl`, `FormDescription`, `FormMessage`, `useFormField`. Wire a field
once and validation + labels + messages are connected.

```tsx
<Form {...form}>
  <FormField name="email" control={form.control} render={({ field, fieldState }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl><Input error={!!fieldState.error} {...field} /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
</Form>
```

### Input
Text field. Stays a bare `<input>` until you use an addon.
- 📦 `error` (→ `aria-invalid`) · `icon` (leading) · `prefix` / `suffix` (text/node) · `loading` (trailing spinner) · `clearable` + `onClear`

```tsx
<Input icon={Search} placeholder="Search" clearable onClear={clear} />
<Input prefix="https://" suffix=".myshopify.com" />
<Input loading={checking} error={!available} />
```

### Textarea
Multi-line input.
- 📦 `error` · `showCount` (live counter, pairs with `maxLength`)

```tsx
<Textarea showCount maxLength={280} error={tooLong} />
```

### Label
Accessible label. `<Label htmlFor="email">Email</Label>`

### PasswordInput
Input with a show/hide toggle. Subpath: `ngk-dashboard/password-input`.
```tsx
<PasswordInput value={pw} onChange={e => setPw(e.target.value)} />
```

### InputOTP
One-time-code input. `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`.
```tsx
<InputOTP maxLength={6}><InputOTPGroup>{/* slots */}</InputOTPGroup></InputOTP>
```

### Calendar / DatePicker
`Calendar` is the raw date grid (react-day-picker). `DatePicker` is the prebuilt
popover-and-button combo. Subpath: `ngk-dashboard/date-picker`.
```tsx
const [date, setDate] = useState<Date>()
<DatePicker selected={date} onSelect={setDate} placeholder="Pick a date" />
```

---

## Selection & toggles

### Select
Dropdown select. `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`,
`SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`.
- 📦 `SelectTrigger` `error` · `size` (`sm`/`default`)

```tsx
<Select onValueChange={setV}>
  <SelectTrigger error={invalid}><SelectValue placeholder="Choose" /></SelectTrigger>
  <SelectContent><SelectItem value="a">A</SelectItem></SelectContent>
</Select>
```

### Checkbox
`<Checkbox checked={v} onCheckedChange={setV} />`

### RadioGroup
`<RadioGroup value={v} onValueChange={setV}><RadioGroupItem value="a" /></RadioGroup>`

### Switch
`<Switch checked={v} onCheckedChange={setV} />`

### Slider
`<Slider defaultValue={[50]} max={100} step={1} />`

### Toggle / ToggleGroup
Pressed-state buttons. `Toggle` is standalone; `ToggleGroup` + `ToggleGroupItem`
group them (`type="single" | "multiple"`).
```tsx
<ToggleGroup type="single" defaultValue="bold">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
</ToggleGroup>
```

---

## Overlays & menus

### Dialog
Modal. `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`,
`DialogDescription`, `DialogFooter`, `DialogClose`.
```tsx
<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader></DialogContent>
</Dialog>
```

### AlertDialog
Confirmation modal (must choose an action). Same shape as Dialog plus
`AlertDialogAction` / `AlertDialogCancel`.

### ConfirmDialog
📦 Prebuilt confirm — no assembly. Subpath: `ngk-dashboard/confirm-dialog`.
```tsx
<ConfirmDialog open={open} onOpenChange={setOpen} title="Delete?"
  onConfirm={remove} destructive />
```

### Sheet
Side panel (drawer from an edge). `Sheet`, `SheetTrigger`, `SheetContent` (`side="right|left|top|bottom"`), `SheetHeader`, `SheetTitle`, `SheetFooter`.

### Drawer
Bottom-sheet (vaul), mobile-friendly. `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`.

### Popover
Floating panel anchored to a trigger. `Popover`, `PopoverTrigger`, `PopoverContent`.

### HoverCard
Preview card on hover. `HoverCard`, `HoverCardTrigger`, `HoverCardContent`.

### Tooltip
`<Tooltip><TooltipTrigger asChild><Button/></TooltipTrigger><TooltipContent>Hint</TooltipContent></Tooltip>`

### DropdownMenu
Action menu. `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`,
`DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`,
`DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuSub*`.

### ContextMenu
Right-click menu — same parts as DropdownMenu (`ContextMenu*`).

### Menubar
App-style menu bar (`Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`).

### Command
⌘K command palette (cmdk). `Command`, `CommandInput`, `CommandList`,
`CommandItem`, `CommandGroup`, `CommandEmpty`, `CommandDialog`.

---

## Navigation

### Tabs
`<Tabs defaultValue="a"><TabsList><TabsTrigger value="a">A</TabsTrigger></TabsList><TabsContent value="a">…</TabsContent></Tabs>`

### Breadcrumb
`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`,
`BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.

### Pagination
`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`,
`PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`. Pair with the
`getPageNumbers()` helper.

### NavigationMenu
Top-level nav with flyouts (`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`).

### Sidebar
Full sidebar system: `SidebarProvider`, `Sidebar`, `SidebarHeader`,
`SidebarContent`, `SidebarFooter`, `SidebarGroup*`, `SidebarMenu`,
`SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuSub*`, `SidebarTrigger`,
`SidebarRail`, `SidebarInset`, `useSidebar`. Usually you want `DashboardLayout`
(below) instead of wiring these by hand.

---

## Data display

### Card
Container with header/body/footer — and interactive states.
- Parts: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`
  (top-right slot), `CardContent`, `CardFooter`.
- 📦 `loading` (spinner overlay) · `disabled` (dim + `inert` lock) · `interactive`
  (hover/focus/keyboard) · `selected` (ring) · `tone` (`info`/`success`/`warning`/`critical` stripe) · `asChild`
- 📦 `CardSkeleton` (`lines`, `header`) — initial-load placeholder.

```tsx
<Card loading={saving} disabled={saving}>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
    <CardDescription>This month</CardDescription>
    <CardAction><Button variant="ghost" size="icon">⋯</Button></CardAction>
  </CardHeader>
  <CardContent>{chart}</CardContent>
  <CardFooter><Button>View</Button></CardFooter>
</Card>
```

### StatCard
📦 KPI card: label + big metric + trend delta.
- `label`, `value`, `delta`, `trend` (`up`/`down`/`neutral`), `icon`, `helpText`
```tsx
<StatCard label="Revenue" value="$12,480" delta="+12.5%" trend="up" icon={DollarSign} />
```

### Table
Styled table parts: `Table`, `TableHeader`, `TableBody`, `TableFooter`,
`TableRow`, `TableHead`, `TableCell`, `TableCaption`. For sorting/filtering/
pagination use the DataTable suite.

### DataTable
📦 TanStack-Table building blocks. Subpath: `ngk-dashboard/data-table`.
`DataTableToolbar` (search + faceted filters), `DataTablePagination`,
`DataTableColumnHeader` (sortable), `DataTableViewOptions`, `DataTableFacetedFilter`,
`DataTableBulkActions`. You own the `useReactTable` instance. (Full example in the README.)

### Avatar
`<Avatar><AvatarImage src={url} /><AvatarFallback>AB</AvatarFallback></Avatar>`
Pair with the `getDisplayNameInitials(name)` helper for fallbacks.

### Chart
Recharts wrapper. Subpath: `ngk-dashboard/ui/chart`. `ChartContainer` (takes a
`ChartConfig`), `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`,
`ChartLegendContent`. Colors come from `--chart-1..5` tokens.

### Skeleton
`<Skeleton className="h-4 w-40" />` — a shimmering placeholder block.

### LongText
📦 Truncates long text with a tooltip/popover on overflow. `<LongText>{value}</LongText>`

---

## Feedback & status

### Alert
Inline note. `Alert`, `AlertTitle`, `AlertDescription`. `variant`: `default` · `destructive`.

### Banner
📦 Prominent status callout.
- `tone`: `info` · `success` · `warning` · `critical` · `title` · `onDismiss` · `icon`
```tsx
<Banner tone="success" title="Saved" onDismiss={hide}>Your changes are live.</Banner>
```

### Toaster / toast
Sonner toasts. Render `<Toaster />` once near the root; call `toast()` anywhere.
- `Toaster` `theme`: `light` · `dark` · `system`
```tsx
<Toaster theme="system" />
toast.success('Saved!')
```

### Progress
`<Progress value={60} />`

### EmptyState
📦 Zero-results / first-run placeholder. `heading`, `icon`, `action`.
```tsx
<EmptyState heading="No orders yet" icon={Inbox} action={<Button>Create</Button>}>Nothing here.</EmptyState>
```

### ErrorState
📦 Async-failure state with retry. `heading`, `icon`, `onRetry`, `retryLabel`, `action`.
```tsx
<ErrorState onRetry={refetch}>Couldn't load orders.</ErrorState>
```

### SkeletonPage
📦 Whole-page loading scaffold. `title`, `primaryAction`, `sections`.
```tsx
<SkeletonPage primaryAction sections={3} />
```

---

## Layout & structure

### BlockStack / InlineStack
📦 Gap-based spacing — use instead of hand-written flexbox.
- `gap` (0–12 scale) · `align` · `justify` · `as` · (InlineStack) `wrap`
```tsx
<BlockStack gap={4}><Text>…</Text><Card>…</Card></BlockStack>
<InlineStack gap={2} justify="between">…</InlineStack>
```

### Text
📦 Typographic scale.
- `variant`: `heading2xl`…`headingSm`, `bodyLg`/`bodyMd`/`bodySm`
- `tone` (`subdued`/`critical`/`success`/`caution`) · `weight` · `alignment` · `truncate` · `as`
```tsx
<Text variant="headingLg">Dashboard</Text>
<Text tone="subdued">Secondary detail</Text>
```

### Separator
`<Separator />` (horizontal) or `<Separator orientation="vertical" />`.

### ScrollArea
Custom-scrollbar container: `<ScrollArea className="h-72">…</ScrollArea>`.

### Accordion
`<Accordion type="single" collapsible><AccordionItem value="a"><AccordionTrigger>…</AccordionTrigger><AccordionContent>…</AccordionContent></AccordionItem></Accordion>`

### Collapsible
`Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` — show/hide a region.

### Resizable
Draggable split panes (`ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`).

### AspectRatio
`<AspectRatio ratio={16/9}><img /></AspectRatio>`

### Carousel
Embla carousel: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`.

---

## Page scaffolding

### DashboardLayout
📦 The app shell (sidebar + header + content) from a nav config. Wrap the whole app.
- `nav` · `logo` · `sidebarFooter` · `headerStart` / `headerEnd` · `currentPath` ·
  `renderLink` · `fixed` · `collapsible` · `variant` · `defaultOpen`. Subpath: `ngk-dashboard/layout`.

### Page
📦 One screen's title bar + actions + body. Subpath: `ngk-dashboard/page`.
- `title` · `subtitle` · `titleMetadata` · `backAction` · `primaryAction` ·
  `secondaryActions` · `fullWidth` / `narrowWidth`
```tsx
<Page title="Order #1024" backAction={{ href: '/orders' }}
  primaryAction={{ content: 'Save', onClick: save }}>…</Page>
```

### Layout / Layout.Section
📦 In-page columns (main + right aside).
- `Layout.Section` `variant`: `full` · `oneHalf` · `oneThird` · 📦 `sticky`
```tsx
<Layout>
  <Layout.Section>{main}</Layout.Section>
  <Layout.Section variant="oneThird" sticky>{aside}</Layout.Section>
</Layout>
```

### PageActions
📦 Footer action bar. `primaryAction`, `secondaryActions`.

### SaveBar
📦 Contextual "unsaved changes" bar. `open`, `onSave`, `onDiscard`, `saving`,
`saveDisabled`, `message`, labels.
```tsx
<SaveBar open={form.formState.isDirty} saving={saving}
  onSave={form.handleSubmit(save)} onDiscard={() => form.reset()} />
```

---

## Theming

### ThemeProvider
📦 Define your design basics once for a subtree. Subpath: `ngk-dashboard/theme`.
- `primary` · `primaryForeground` · `secondary` · `accent` · `destructive` ·
  `background` · `foreground` · `border` · `radius` · `font` · `tokens={{…}}` · `inline`
```tsx
<ThemeProvider primary="#5b5bd6" radius="0.5rem" font="Inter, sans-serif" inline>
  <App />
</ThemeProvider>
```

---

## Utilities & hooks

- **`cn(...classes)`** — merge class names (clsx + tailwind-merge). Use for all
  className composition.
- **`useIsMobile()`** — `boolean`, true below the mobile breakpoint.
- **`getPageNumbers(current, total)`** — page list with ellipses for `Pagination`.
- **`getDisplayNameInitials(name)`** — initials for `AvatarFallback`.
- **`sleep(ms)`** — promise-based delay (demos/tests).
