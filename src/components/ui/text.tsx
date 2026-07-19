import * as React from 'react'
import { cn } from '@/lib/utils'

const VARIANT: Record<string, string> = {
  heading2xl: 'text-3xl font-semibold tracking-tight',
  headingXl: 'text-2xl font-semibold tracking-tight',
  headingLg: 'text-xl font-semibold',
  headingMd: 'text-lg font-semibold',
  headingSm: 'text-sm font-semibold',
  bodyLg: 'text-base',
  bodyMd: 'text-sm',
  bodySm: 'text-xs',
}
const TONE: Record<string, string> = {
  default: '',
  subdued: 'text-muted-foreground',
  critical: 'text-destructive',
  success: 'text-emerald-600 dark:text-emerald-400',
  caution: 'text-amber-600 dark:text-amber-400',
}
const WEIGHT: Record<string, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}
const ALIGN: Record<string, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
}

export type TextVariant = keyof typeof VARIANT

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Typographic role. Defaults to `bodyMd`. */
  variant?: TextVariant
  /** Color intent. */
  tone?: keyof typeof TONE
  /** Override the font weight the variant sets. */
  weight?: keyof typeof WEIGHT
  /** Text alignment. */
  alignment?: keyof typeof ALIGN
  /** Truncate to a single line with an ellipsis. */
  truncate?: boolean
  /** Element to render (defaults to a sensible tag for the variant). */
  as?: React.ElementType
}

function defaultTag(variant: TextVariant): React.ElementType {
  if (variant.startsWith('heading')) return 'h2'
  return 'p'
}

/** Typographic primitive — consistent type scale + tone across the system. */
export function Text({
  variant = 'bodyMd',
  tone = 'default',
  weight,
  alignment,
  truncate = false,
  as,
  className,
  ...props
}: TextProps) {
  const Comp = as ?? defaultTag(variant)
  return (
    <Comp
      data-slot='text'
      className={cn(
        VARIANT[variant],
        TONE[tone],
        weight && WEIGHT[weight],
        alignment && ALIGN[alignment],
        truncate && 'truncate',
        className
      )}
      {...props}
    />
  )
}
