import type * as React from 'react'

/**
 * Router-neutral link renderer. The layout never imports a router; instead it
 * asks the consumer how to render a link. Defaults to a plain `<a>` (see
 * `defaultRenderLink`), so it works with zero config — pass your router's Link
 * (TanStack, React Router, Next) to get client-side navigation.
 */
export type RenderLinkArgs = {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  'aria-current'?: React.AriaAttributes['aria-current']
}

export type RenderLink = (args: RenderLinkArgs) => React.ReactNode

type NavBaseItem = {
  title: string
  badge?: React.ReactNode
  icon?: React.ElementType
}

/** A single navigable item. */
export type NavLink = NavBaseItem & {
  href: string
  items?: never
}

/** A parent item that expands into sub-items (no href of its own). */
export type NavCollapsible = NavBaseItem & {
  href?: never
  items: (NavBaseItem & { href: string })[]
}

export type NavItem = NavLink | NavCollapsible

/** A titled section of the sidebar nav. */
export type NavGroup = {
  title?: string
  items: NavItem[]
}
