import * as React from 'react'
import { Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const BASE =
  'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30'
const RING =
  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
const INVALID =
  'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'

export type InputProps = Omit<
  React.ComponentProps<'input'>,
  'prefix' | 'suffix'
> & {
  /** Mark the field invalid (red ring + `aria-invalid`). */
  error?: boolean
  /** Leading icon component (e.g. a search glass). */
  icon?: React.ElementType
  /** Static text/node before the value (e.g. "https://"). */
  prefix?: React.ReactNode
  /** Static text/node after the value (e.g. ".00", a unit). */
  suffix?: React.ReactNode
  /** Trailing spinner (async validation / search in flight). */
  loading?: boolean
  /** Show a clear (✕) button; calls `onClear` when pressed. */
  clearable?: boolean
  onClear?: () => void
}

function Input({
  className,
  type,
  error = false,
  icon: Icon,
  prefix,
  suffix,
  loading = false,
  clearable = false,
  onClear,
  ...props
}: InputProps) {
  const hasAddons =
    !!Icon || prefix != null || suffix != null || loading || clearable

  // Fast path: no addons → a bare input (unchanged behavior).
  if (!hasAddons) {
    return (
      <input
        type={type}
        data-slot='input'
        aria-invalid={error || undefined}
        className={cn(BASE, RING, INVALID, className)}
        {...props}
      />
    )
  }

  // Addon path: a field-shaped shell owns the border/ring; the input sits flush.
  return (
    <div
      data-slot='input'
      data-invalid={error || undefined}
      className={cn(
        'flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] md:text-sm dark:bg-input/30',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        error &&
          'border-destructive ring-[3px] ring-destructive/20 dark:ring-destructive/40',
        className
      )}
    >
      {Icon && <Icon className='size-4 shrink-0 text-muted-foreground' />}
      {prefix != null && (
        <span className='shrink-0 text-sm text-muted-foreground'>{prefix}</span>
      )}
      <input
        type={type}
        data-slot='input-control'
        aria-invalid={error || undefined}
        className='min-w-0 flex-1 bg-transparent py-1 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
        {...props}
      />
      {loading && (
        <Loader2 className='size-4 shrink-0 animate-spin text-muted-foreground' />
      )}
      {clearable && !loading && (
        <button
          type='button'
          aria-label='Clear'
          onClick={onClear}
          className='shrink-0 rounded-sm text-muted-foreground hover:text-foreground'
        >
          <X className='size-4' />
        </button>
      )}
      {suffix != null && (
        <span className='shrink-0 text-sm text-muted-foreground'>{suffix}</span>
      )}
    </div>
  )
}

export { Input }
