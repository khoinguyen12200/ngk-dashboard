import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Polaris-style in-page column layout. Put a main `Layout.Section` next to a
 * smaller `Layout.Section variant="oneThird"` and they sit side-by-side on
 * desktop (main flexes, aside is a fixed fraction) and stack on mobile.
 *
 *   <Layout>
 *     <Layout.Section>{main}</Layout.Section>
 *     <Layout.Section variant="oneThird">{aside}</Layout.Section>
 *   </Layout>
 */
function LayoutRoot({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='layout'
      className={cn('flex flex-col gap-4 lg:flex-row lg:gap-5', className)}
      {...props}
    />
  )
}

export interface LayoutSectionProps extends React.ComponentProps<'div'> {
  /** `oneThird`/`oneHalf` make a narrower column (the right aside); default fills. */
  variant?: 'full' | 'oneHalf' | 'oneThird'
}

function LayoutSection({
  variant = 'full',
  className,
  ...props
}: LayoutSectionProps) {
  return (
    <div
      data-slot='layout-section'
      data-variant={variant}
      className={cn(
        'flex min-w-0 flex-col gap-4',
        variant === 'full' && 'flex-1',
        variant === 'oneHalf' && 'w-full lg:w-1/2',
        variant === 'oneThird' && 'w-full shrink-0 lg:w-1/3 lg:max-w-sm',
        className
      )}
      {...props}
    />
  )
}

// Compound API so `Layout.Section` reads like Polaris, while the named exports
// (Layout, LayoutSection) stay tree-shakeable.
export const Layout = Object.assign(LayoutRoot, { Section: LayoutSection })
export { LayoutSection }
