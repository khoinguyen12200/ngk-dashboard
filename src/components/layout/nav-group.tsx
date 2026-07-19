import { ChevronRight } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { checkIsActive, defaultRenderLink } from './render-link'
import type {
  NavCollapsible,
  NavGroup as NavGroupType,
  NavLink,
  RenderLink,
} from './types'

export interface NavGroupProps extends NavGroupType {
  /** The current route path, for active highlighting. */
  currentPath?: string
  /** How to render links. Defaults to a plain `<a>`. */
  renderLink?: RenderLink
}

export function NavGroup({
  title,
  items,
  currentPath,
  renderLink = defaultRenderLink,
}: NavGroupProps) {
  const { state, isMobile } = useSidebar()
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.href ?? ''}`

          if (!item.items)
            return (
              <SidebarMenuLink
                key={key}
                item={item}
                currentPath={currentPath}
                renderLink={renderLink}
              />
            )

          if (state === 'collapsed' && !isMobile)
            return (
              <SidebarMenuCollapsedDropdown
                key={key}
                item={item}
                currentPath={currentPath}
                renderLink={renderLink}
              />
            )

          return (
            <SidebarMenuCollapsible
              key={key}
              item={item}
              currentPath={currentPath}
              renderLink={renderLink}
            />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavBadge({ children }: { children: React.ReactNode }) {
  return <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>
}

type ItemProps<T> = {
  item: T
  currentPath?: string
  renderLink: RenderLink
}

function SidebarMenuLink({
  item,
  currentPath,
  renderLink,
}: ItemProps<NavLink>) {
  const { setOpenMobile } = useSidebar()
  const active = checkIsActive(currentPath, item.href)
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
        {renderLink({
          href: item.href,
          onClick: () => setOpenMobile(false),
          'aria-current': active ? 'page' : undefined,
          children: (
            <>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              {item.badge && <NavBadge>{item.badge}</NavBadge>}
            </>
          ),
        })}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarMenuCollapsible({
  item,
  currentPath,
  renderLink,
}: ItemProps<NavCollapsible>) {
  const { setOpenMobile } = useSidebar()
  const subHrefs = item.items.map((i) => i.href)
  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(currentPath, undefined, subHrefs, true)}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              const active = checkIsActive(currentPath, subItem.href)
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={active}>
                    {renderLink({
                      href: subItem.href,
                      onClick: () => setOpenMobile(false),
                      'aria-current': active ? 'page' : undefined,
                      children: (
                        <>
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                          {subItem.badge && (
                            <NavBadge>{subItem.badge}</NavBadge>
                          )}
                        </>
                      ),
                    })}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function SidebarMenuCollapsedDropdown({
  item,
  currentPath,
  renderLink,
}: ItemProps<NavCollapsible>) {
  const subHrefs = item.items.map((i) => i.href)
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={checkIsActive(currentPath, undefined, subHrefs)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='start' sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => (
            <DropdownMenuItem key={`${sub.title}-${sub.href}`} asChild>
              {renderLink({
                href: sub.href,
                className: checkIsActive(currentPath, sub.href)
                  ? 'bg-secondary'
                  : '',
                children: (
                  <>
                    {sub.icon && <sub.icon />}
                    <span className='max-w-52 text-wrap'>{sub.title}</span>
                    {sub.badge && (
                      <span className='ms-auto text-xs'>{sub.badge}</span>
                    )}
                  </>
                ),
              })}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
