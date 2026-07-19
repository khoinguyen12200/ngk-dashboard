import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MainProps extends React.HTMLAttributes<HTMLElement> {
  /** Fill remaining height and manage its own scroll (pairs with a fixed Header). */
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

/** Full-width content container (no max-width cap). */
export function Main({ fixed, className, ...props }: MainProps) {
  return (
    <main
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        'px-4 py-6',
        fixed && 'flex grow flex-col overflow-hidden',
        className
      )}
      {...props}
    />
  )
}
