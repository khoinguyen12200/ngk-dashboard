import * as React from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps extends React.ComponentProps<'div'> {
  /** Headline, e.g. "No orders yet". */
  heading?: React.ReactNode
  /** Large icon above the heading. */
  icon?: React.ElementType
  /** Action(s) below the description (e.g. a <Button>). */
  action?: React.ReactNode
}

/** Centered placeholder for empty lists, zero-results, and first-run screens. */
export function EmptyState({
  heading,
  icon: Icon,
  action,
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot='empty-state'
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-12 text-center',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className='flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground'>
          <Icon className='size-6' />
        </div>
      )}
      {heading != null && <h3 className='text-lg font-semibold'>{heading}</h3>}
      {children != null && (
        <p className='max-w-sm text-sm text-muted-foreground'>{children}</p>
      )}
      {action && <div className='mt-2 flex items-center gap-2'>{action}</div>}
    </div>
  )
}
