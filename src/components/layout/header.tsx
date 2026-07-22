import * as React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePageHeaderSlots } from './page-header-context'

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Stick to the top with a blur/shadow that appears on scroll. */
  fixed?: boolean
  /** App-level content pinned to the right (user menu, notifications, …). */
  end?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}

export function Header({
  className,
  fixed,
  children,
  end,
  ...props
}: HeaderProps) {
  const [offset, setOffset] = React.useState(0)
  const slots = usePageHeaderSlots()

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-16',
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative flex h-full items-center gap-3 p-4 sm:gap-4',
          offset > 10 &&
            fixed &&
            'after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg'
        )}
      >
        <SidebarTrigger variant='outline' className='max-md:scale-125' />
        <Separator orientation='vertical' className='h-6' />
        {children}

        {slots && (
          <div
            ref={slots.setTitleNode}
            className='flex min-w-0 items-center gap-2 empty:hidden'
          />
        )}

        <div className='ms-auto flex items-center gap-2'>
          {slots && (
            <div
              ref={slots.setActionsNode}
              className='flex items-center gap-2 empty:hidden'
            />
          )}
          {end}
        </div>

        {slots && (
          <div
            ref={slots.setOverlayNode}
            className={cn(
              'absolute inset-0 flex items-center gap-3 bg-background px-4 sm:px-6',
              !slots.saveBarOpen && 'hidden'
            )}
          />
        )}
      </div>
    </header>
  )
}
