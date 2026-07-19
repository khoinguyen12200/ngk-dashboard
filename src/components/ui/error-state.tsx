import * as React from 'react'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

export interface ErrorStateProps extends React.ComponentProps<'div'> {
  /** Headline (default "Something went wrong"). */
  heading?: React.ReactNode
  /** Large icon above the heading (default a warning triangle). */
  icon?: React.ElementType
  /** Show a built-in retry button wired to this handler. */
  onRetry?: () => void
  retryLabel?: string
  /** Custom action(s) instead of the retry button. */
  action?: React.ReactNode
}

/** Centered failure state for async data that didn't load — with a retry. */
export function ErrorState({
  heading = 'Something went wrong',
  icon: Icon = TriangleAlert,
  onRetry,
  retryLabel = 'Try again',
  action,
  className,
  children,
  ...props
}: ErrorStateProps) {
  return (
    <div
      data-slot='error-state'
      role='alert'
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-12 text-center',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className='flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive'>
          <Icon className='size-6' />
        </div>
      )}
      {heading != null && <h3 className='text-lg font-semibold'>{heading}</h3>}
      {children != null && (
        <p className='max-w-sm text-sm text-muted-foreground'>{children}</p>
      )}
      {action ??
        (onRetry && (
          <Button
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={onRetry}
          >
            {retryLabel}
          </Button>
        ))}
    </div>
  )
}
