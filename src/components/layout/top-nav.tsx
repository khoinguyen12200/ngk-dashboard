import * as React from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { checkIsActive, defaultRenderLink } from './render-link'
import type { RenderLink } from './types'

export type TopNavLink = {
  title: string
  href: string
  disabled?: boolean
}

export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: TopNavLink[]
  /** The current route path, for active highlighting. */
  currentPath?: string
  /** How to render links. Defaults to a plain `<a>`. */
  renderLink?: RenderLink
}

export function TopNav({
  className,
  links,
  currentPath,
  renderLink = defaultRenderLink,
  ...props
}: TopNavProps) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            className={cn('md:size-7 lg:hidden', className)}
          >
            <Menu />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align='start'>
          {links.map(({ title, href, disabled }) => (
            <DropdownMenuItem
              key={`${title}-${href}`}
              asChild
              disabled={disabled}
            >
              {renderLink({
                href,
                className: checkIsActive(currentPath, href)
                  ? ''
                  : 'text-muted-foreground',
                children: title,
              })}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <nav
        className={cn(
          'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
          className
        )}
        {...props}
      >
        {links.map(({ title, href }) => (
          <React.Fragment key={`${title}-${href}`}>
            {renderLink({
              href,
              className: cn(
                'text-sm font-medium transition-colors hover:text-primary',
                !checkIsActive(currentPath, href) && 'text-muted-foreground'
              ),
              children: title,
            })}
          </React.Fragment>
        ))}
      </nav>
    </>
  )
}
