import * as React from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePageHeaderSlots } from '@/components/layout/page-header-context'
import { type Action, renderAction, renderActions } from './action'
import {
  BreadcrumbTrail,
  type Crumb,
  PageHeaderActions,
  PageTitleBar,
} from './page-title-bar'

export type { Crumb }

export type BackAction = {
  onClick?: () => void
  href?: string
  label?: string
}

export interface PageProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /** Page title. Inside a DashboardLayout it renders in the top header bar. */
  title?: React.ReactNode
  /** Secondary line under the title (shown on desktop; hidden if breadcrumbs). */
  subtitle?: React.ReactNode
  /** Rendered next to the title (e.g. a <Badge>). */
  titleMetadata?: React.ReactNode
  /** Ancestor trail leading to this page. Shown as breadcrumbs in the header;
   *  on mobile it collapses into a single "back to parent" affordance. */
  breadcrumbs?: Crumb[]
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
  /** Force the title/actions to render inline (in-body) even inside a layout. */
  titleInHeader?: boolean
}

/**
 * Polaris-style page wrapper. Inside a `DashboardLayout`, its title, breadcrumbs,
 * and actions project into the top header bar (and a `SaveBar` takes it over when
 * dirty). Used standalone, it renders the same chrome inline above the content.
 * Describe the actions and it builds the buttons for you.
 */
export function Page({
  title,
  subtitle,
  titleMetadata,
  breadcrumbs,
  backAction,
  primaryAction,
  secondaryActions,
  fullWidth = false,
  narrowWidth = false,
  titleInHeader,
  className,
  children,
  ...props
}: PageProps) {
  const slots = usePageHeaderSlots()
  const shouldProject = !!slots && titleInHeader !== false

  const hasActions =
    primaryAction != null || (secondaryActions?.length ?? 0) > 0
  const hasCrumbs = (breadcrumbs?.length ?? 0) > 0
  const hasInlineHeader =
    title != null ||
    subtitle != null ||
    backAction != null ||
    hasCrumbs ||
    hasActions

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
      {shouldProject ? (
        <>
          {slots!.titleNode &&
            createPortal(
              <PageTitleBar
                title={title}
                subtitle={subtitle}
                titleMetadata={titleMetadata}
                backAction={backAction}
                breadcrumbs={breadcrumbs}
              />,
              slots!.titleNode
            )}
          {hasActions &&
            slots!.actionsNode &&
            createPortal(
              <PageHeaderActions
                primaryAction={primaryAction}
                secondaryActions={secondaryActions}
              />,
              slots!.actionsNode
            )}
        </>
      ) : (
        hasInlineHeader && (
          <div data-slot='page-header' className='flex flex-col gap-3'>
            {hasCrumbs && <BreadcrumbTrail items={breadcrumbs!} />}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
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
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {hasActions && (
                <div
                  data-slot='page-actions'
                  className='flex shrink-0 items-center gap-2'
                >
                  {renderActions(secondaryActions, 'outline')}
                  {renderAction(primaryAction, 'default')}
                </div>
              )}
            </div>
          </div>
        )
      )}

      {children}
    </div>
  )
}
