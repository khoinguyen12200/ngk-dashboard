import * as React from 'react'
import { cn } from '@/lib/utils'

// Literal class lookups (Tailwind's scanner only compiles classes it can see as
// whole strings — never build `gap-${n}` dynamically).
const GAP: Record<string, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
}
const ALIGN: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}
const JUSTIFY: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

type Gap = keyof typeof GAP | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
type Align = keyof typeof ALIGN
type Justify = keyof typeof JUSTIFY

type StackOwnProps = {
  /** Spacing between children (Tailwind gap scale). */
  gap?: Gap
  /** Cross-axis alignment. */
  align?: Align
  /** Main-axis distribution. */
  justify?: Justify
  /** Render as a different element. */
  as?: React.ElementType
}

export type BlockStackProps = React.ComponentProps<'div'> & StackOwnProps
export type InlineStackProps = React.ComponentProps<'div'> &
  StackOwnProps & {
    /** Wrap onto multiple lines when out of room (default true). */
    wrap?: boolean
  }

/** Vertical stack — children flow top to bottom with even spacing. */
export function BlockStack({
  gap = 4,
  align,
  justify,
  as: Comp = 'div',
  className,
  ...props
}: BlockStackProps) {
  return (
    <Comp
      data-slot='block-stack'
      className={cn(
        'flex flex-col',
        GAP[String(gap)],
        align && ALIGN[align],
        justify && JUSTIFY[justify],
        className
      )}
      {...props}
    />
  )
}

/** Horizontal stack — children flow left to right, wrapping by default. */
export function InlineStack({
  gap = 2,
  align = 'center',
  justify,
  wrap = true,
  as: Comp = 'div',
  className,
  ...props
}: InlineStackProps) {
  return (
    <Comp
      data-slot='inline-stack'
      className={cn(
        'flex flex-row',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        GAP[String(gap)],
        ALIGN[align],
        justify && JUSTIFY[justify],
        className
      )}
      {...props}
    />
  )
}
