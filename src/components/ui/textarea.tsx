import * as React from 'react'
import { cn } from '@/lib/utils'

const BASE =
  'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40'

export type TextareaProps = React.ComponentProps<'textarea'> & {
  /** Mark the field invalid (red ring + `aria-invalid`). */
  error?: boolean
  /** Show a live character counter (pairs with `maxLength`). */
  showCount?: boolean
}

function Textarea({
  className,
  error = false,
  showCount = false,
  maxLength,
  onChange,
  value,
  defaultValue,
  ...props
}: TextareaProps) {
  const initial = String(value ?? defaultValue ?? '').length
  const [count, setCount] = React.useState(initial)
  const len = value != null ? String(value).length : count

  const textarea = (
    <textarea
      data-slot='textarea'
      aria-invalid={error || undefined}
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        setCount(e.target.value.length)
        onChange?.(e)
      }}
      className={cn(BASE, !showCount && className)}
      {...props}
    />
  )

  if (!showCount) return textarea

  return (
    <div
      data-slot='textarea-field'
      className={cn('flex flex-col gap-1', className)}
    >
      {textarea}
      <span
        className={cn(
          'self-end text-xs tabular-nums text-muted-foreground',
          maxLength != null && len > maxLength && 'text-destructive'
        )}
      >
        {maxLength != null ? `${len} / ${maxLength}` : len}
      </span>
    </div>
  )
}

export { Textarea }
