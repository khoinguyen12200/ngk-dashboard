import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

// Status accent (a left stripe) — separate from the brand accent.
const TONE: Record<string, string> = {
  default: '',
  info: 'border-l-4 border-l-primary',
  success: 'border-l-4 border-l-emerald-500',
  warning: 'border-l-4 border-l-amber-500',
  critical: 'border-l-4 border-l-destructive',
}

export type CardProps = React.ComponentProps<'div'> & {
  /** Overlay a spinner on the card's content (data refreshing in place). */
  loading?: boolean
  /** Dim and fully lock the card — mouse and keyboard (via `inert`). */
  disabled?: boolean
  /** Hover elevation + focus ring + pointer/keyboard affordance. */
  interactive?: boolean
  /** Highlight as chosen (e.g. a plan/option picker). */
  selected?: boolean
  /** Status accent stripe down the left edge. */
  tone?: keyof typeof TONE
  /** Render as the child element (e.g. wrap the whole card in a link). */
  asChild?: boolean
}

function Card({
  className,
  loading = false,
  disabled = false,
  interactive = false,
  selected = false,
  tone = 'default',
  asChild = false,
  onClick,
  onKeyDown,
  children,
  ...props
}: CardProps) {
  const classes = cn(
    'relative flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
    TONE[tone],
    interactive &&
      'cursor-pointer transition-shadow outline-none hover:shadow-md focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
    selected && 'border-primary ring-2 ring-primary',
    disabled && 'opacity-60',
    className
  )

  // asChild hands rendering to a single child (e.g. an <a>); overlays/inert
  // don't apply in that mode.
  if (asChild) {
    return (
      <Slot data-slot='card' className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  const keyboard =
    interactive && onClick && !disabled
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.currentTarget.click()
          }
          onKeyDown?.(e)
        }
      : onKeyDown

  return (
    <div
      data-slot='card'
      aria-busy={loading || undefined}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      inert={disabled || undefined}
      role={interactive && onClick ? 'button' : undefined}
      tabIndex={interactive && onClick && !disabled ? 0 : undefined}
      onClick={onClick}
      onKeyDown={keyboard}
      className={classes}
      {...props}
    >
      {children}
      {loading && (
        <div
          data-slot='card-loading'
          className='absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-card/60 backdrop-blur-[1px]'
        >
          <Loader2 className='size-5 animate-spin text-muted-foreground' />
        </div>
      )}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export interface CardSkeletonProps extends React.ComponentProps<'div'> {
  /** Number of body placeholder lines (default 3). */
  lines?: number
  /** Show a header placeholder (default true). */
  header?: boolean
}

/** Card-shaped placeholder for initial load, before there's any content. */
function CardSkeleton({
  lines = 3,
  header = true,
  className,
  ...props
}: CardSkeletonProps) {
  return (
    <Card className={cn('gap-4', className)} aria-busy {...props}>
      {header && (
        <CardHeader className='gap-2'>
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-4 w-24' />
        </CardHeader>
      )}
      <CardContent className='flex flex-col gap-3'>
        {Array.from({ length: Math.max(0, lines) }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardSkeleton,
}
