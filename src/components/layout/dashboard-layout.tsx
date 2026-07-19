import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Header } from './header'
import { Main } from './main'
import { NavGroup } from './nav-group'
import { defaultRenderLink } from './render-link'
import type { NavGroup as NavGroupType, RenderLink } from './types'

export interface DashboardLayoutProps {
  /** Sidebar navigation, grouped into titled sections. */
  nav: NavGroupType[]
  /** Page content. */
  children: React.ReactNode
  /** Rendered in the sidebar header (logo / app title / team switcher). */
  logo?: React.ReactNode
  /** Rendered in the sidebar footer (user menu, etc.). */
  sidebarFooter?: React.ReactNode
  /** Left side of the top header, after the sidebar trigger. */
  headerStart?: React.ReactNode
  /** Right side of the top header (pushed to the end). */
  headerEnd?: React.ReactNode
  /** Current route path, for active nav highlighting. */
  currentPath?: string
  /** How to render nav links. Defaults to a plain `<a>`. */
  renderLink?: RenderLink
  /** Sticky header + self-scrolling content region. */
  fixed?: boolean
  /** Sidebar collapse behavior (shadcn Sidebar prop). */
  collapsible?: React.ComponentProps<typeof Sidebar>['collapsible']
  /** Sidebar visual variant (shadcn Sidebar prop). */
  variant?: React.ComponentProps<typeof Sidebar>['variant']
  /** Whether the sidebar starts open (uncontrolled). */
  defaultOpen?: boolean
  /** Class applied to the <main> content container. */
  className?: string
}

/**
 * Opinionated, ready-to-use dashboard shell: sidebar + header + content,
 * pre-wired and themed. Pass a `nav` config and `children` and you have a
 * working dashboard — everything else is optional. Router-neutral: supply
 * `renderLink` + `currentPath` to get client-side navigation and active states.
 */
export function DashboardLayout({
  nav,
  children,
  logo,
  sidebarFooter,
  headerStart,
  headerEnd,
  currentPath,
  renderLink = defaultRenderLink,
  fixed = false,
  collapsible = 'icon',
  variant = 'inset',
  defaultOpen = true,
  className,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible={collapsible} variant={variant}>
        {logo && <SidebarHeader>{logo}</SidebarHeader>}
        <SidebarContent>
          {nav.map((group, i) => (
            <NavGroup
              key={group.title ?? i}
              {...group}
              currentPath={currentPath}
              renderLink={renderLink}
            />
          ))}
        </SidebarContent>
        {sidebarFooter && <SidebarFooter>{sidebarFooter}</SidebarFooter>}
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Header fixed={fixed}>
          {headerStart}
          {headerEnd && (
            <div className='ms-auto flex items-center gap-2'>{headerEnd}</div>
          )}
        </Header>
        <Main fixed={fixed} className={className}>
          {children}
        </Main>
      </SidebarInset>
    </SidebarProvider>
  )
}
