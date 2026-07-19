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

## What's included

Primitives: Alert, AlertDialog, Avatar, Badge, Button, Calendar, Card,
Checkbox, Collapsible, Command, Dialog, DropdownMenu, Form, Input, InputOTP,
Label, Popover, RadioGroup, ScrollArea, Select, Separator, Sheet, Sidebar,
Skeleton, Switch, Table, Tabs, Textarea, Toaster (Sonner), Tooltip.

Helpers: `cn`, `useIsMobile`, and a few small utilities.

### Notes

- **Toaster** takes `theme` as a prop (`"light" | "dark" | "system"`, default
  `"system"`). Pass your app's current theme to keep it in sync.
- **Sidebar** needs its `SidebarProvider` wrapper (standard shadcn pattern).
- The theme references the **Inter** and **Manrope** font families but does not
  bundle them. Load them in your app if you want that exact look; otherwise it
  falls back to the system sans-serif.

## Develop

```bash
npm install
npm run build      # builds dist/index.js, dist/index.d.ts, dist/styles.css
```

## License

MIT
