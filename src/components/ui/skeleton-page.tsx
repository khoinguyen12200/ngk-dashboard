import * as React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

export type SkeletonPageProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  /** Show a title-bar placeholder (default true). */
  title?: boolean
  /** Show a primary-action placeholder in the title bar. */
  primaryAction?: boolean
  /** Number of card placeholders to render (default 2). */
  sections?: number
}

/** Loading scaffold shaped like a page — drop in while data is fetching. */
export function SkeletonPage({
  title = true,
  primaryAction = false,
  sections = 2,
  className,
  ...props
}: SkeletonPageProps) {
  return (
    <div
      data-slot='skeleton-page'
      aria-busy='true'
      className={cn(
        'mx-auto flex w-full max-w-5xl flex-col gap-5 p-6',
        className
      )}
      {...props}
    >
      {title && (
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-7 w-48' />
            <Skeleton className='h-4 w-32' />
          </div>
          {primaryAction && <Skeleton className='h-9 w-24' />}
        </div>
      )}
      {Array.from({ length: Math.max(0, sections) }).map((_, i) => (
        <div
          key={i}
          className='flex flex-col gap-4 rounded-xl border bg-card p-6'
        >
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      ))}
    </div>
  )
}
