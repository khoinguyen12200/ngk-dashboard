import * as React from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type Action, renderAction, renderActions } from './action'

export type BackAction = {
  onClick?: () => void
  href?: string
  label?: string
}

export interface PageProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /** Page title (shown large at the top). */
  title?: React.ReactNode
  /** Secondary line under the title. */
  subtitle?: React.ReactNode
  /** Rendered next to the title (e.g. a <Badge>). */
  titleMetadata?: React.ReactNode
  /** Back button shown before the title. */
  backAction?: BackAction
  /** Primary action, top-right. Pass `{ content, onClick }` or a ReactNode. */
  primaryAction?: Action
  /** Secondary actions, top-right, before the primary one. */
  secondaryActions?: Action[]
  /** Remove the centered max-width cap (full-bleed content). */
  fullWidth?: boolean
  /** Narrow, centered content column (e.g. settings/forms). */
  narrowWidth?: boolean
}

/**
 * Polaris-style page wrapper: a title bar (back action, title/subtitle,
 * metadata, primary + secondary actions) above your content, with a sensible
 * centered max-width. Describe the actions and it builds the buttons for you.
 */
export function Page({
  title,
  subtitle,
  titleMetadata,
  backAction,
  primaryAction,
  secondaryActions,
  fullWidth = false,
  narrowWidth = false,
  className,
  children,
  ...props
}: PageProps) {
  const hasHeader =
    title != null ||
    subtitle != null ||
    backAction != null ||
    primaryAction != null ||
    (secondaryActions?.length ?? 0) > 0

  return (
    <div
      data-slot='page'
      className={cn(
        'mx-auto flex w-full flex-col gap-5 px-4 py-6 sm:px-6',
        !fullWidth && !narrowWidth && 'max-w-5xl',
        narrowWidth && 'max-w-xl',
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div
          data-slot='page-header'
          className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'
        >
          <div className='flex min-w-0 items-start gap-2'>
            {backAction &&
              (backAction.href ? (
                <Button
                  asChild
                  variant='outline'
                  size='icon'
                  className='mt-0.5 size-8 shrink-0'
                >
                  <a
                    href={backAction.href}
                    aria-label={backAction.label ?? 'Back'}
                  >
                    <ChevronLeft />
                  </a>
                </Button>
              ) : (
                <Button
                  variant='outline'
                  size='icon'
                  className='mt-0.5 size-8 shrink-0'
                  aria-label={backAction.label ?? 'Back'}
                  onClick={backAction.onClick}
                >
                  <ChevronLeft />
                </Button>
              ))}
            <div className='min-w-0'>
              <div className='flex items-center gap-2'>
                {title != null &&
                  (typeof title === 'string' ? (
                    <h1 className='truncate text-2xl font-semibold tracking-tight'>
                      {title}
                    </h1>
                  ) : (
                    title
                  ))}
                {titleMetadata}
              </div>
              {subtitle != null && (
                <p className='mt-1 text-sm text-muted-foreground'>{subtitle}</p>
              )}
            </div>
          </div>

          {(primaryAction != null || (secondaryActions?.length ?? 0) > 0) && (
            <div
              data-slot='page-actions'
              className='flex shrink-0 items-center gap-2'
            >
              {renderActions(secondaryActions, 'outline')}
              {renderAction(primaryAction, 'default')}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  )
}
