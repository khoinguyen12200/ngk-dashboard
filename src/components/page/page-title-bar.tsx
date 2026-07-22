import * as React from 'react'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  type Action,
  isDescriptor,
  renderAction,
  renderActions,
} from './action'

/** A single ancestor link in the breadcrumb trail leading to this page. */
export type Crumb = {
  label: string
  href?: string
  onClick?: () => void
}

type BackTarget = { href?: string; onClick?: () => void; label?: string }

function BackButton({
  href,
  onClick,
  label,
  className,
}: BackTarget & { className?: string }) {
  const cls = cn('size-8 shrink-0', className)
  if (href) {
    return (
      <Button asChild variant='outline' size='icon' className={cls}>
        <a href={href} aria-label={label ?? 'Back'}>
          <ChevronLeft />
        </a>
      </Button>
    )
  }
  return (
    <Button
      variant='outline'
      size='icon'
      className={cls}
      aria-label={label ?? 'Back'}
      onClick={onClick}
    >
      <ChevronLeft />
    </Button>
  )
}

/** The breadcrumb trail shared by the header projection and the inline Page. */
export function BreadcrumbTrail({
  items,
  className,
  listClassName,
}: {
  items: Crumb[]
  className?: string
  listClassName?: string
}) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={listClassName}>
        {items.map((crumb, i) => (
          <React.Fragment key={i}>
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              ) : crumb.onClick ? (
                <BreadcrumbLink asChild>
                  <button type='button' onClick={crumb.onClick}>
                    {crumb.label}
                  </button>
                </BreadcrumbLink>
              ) : (
                <span>{crumb.label}</span>
              )}
            </BreadcrumbItem>
            {i < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export interface PageTitleBarProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  titleMetadata?: React.ReactNode
  backAction?: BackTarget
  breadcrumbs?: Crumb[]
}

/**
 * The compact title block projected into the top header bar (h-16, so max two
 * lines): a context line (breadcrumb trail or subtitle) above the title line.
 * On mobile the trail collapses into a single "back to parent" affordance so a
 * long path never overflows a phone header.
 */
export function PageTitleBar({
  title,
  subtitle,
  titleMetadata,
  backAction,
  breadcrumbs,
}: PageTitleBarProps) {
  const hasCrumbs = (breadcrumbs?.length ?? 0) > 0
  const lastCrumb = hasCrumbs
    ? breadcrumbs![breadcrumbs!.length - 1]
    : undefined

  return (
    <div className='flex min-w-0 items-center gap-2'>
      {backAction ? (
        <BackButton {...backAction} />
      ) : (
        // Mobile-only: the trail becomes one tap back to the nearest ancestor.
        lastCrumb && (
          <BackButton
            href={lastCrumb.href}
            onClick={lastCrumb.onClick}
            label={`Back to ${lastCrumb.label}`}
            className='sm:hidden'
          />
        )
      )}

      <div className='flex min-w-0 flex-col justify-center gap-0.5'>
        {hasCrumbs ? (
          <BreadcrumbTrail
            items={breadcrumbs!}
            className='hidden sm:block'
            listClassName='text-xs'
          />
        ) : subtitle != null ? (
          <p className='hidden truncate text-xs text-muted-foreground sm:block'>
            {subtitle}
          </p>
        ) : null}

        <div className='flex items-center gap-2'>
          {title != null &&
            (typeof title === 'string' ? (
              <h1 className='truncate text-sm font-semibold leading-tight sm:text-base'>
                {title}
              </h1>
            ) : (
              title
            ))}
          {titleMetadata}
        </div>
      </div>
    </div>
  )
}

export interface PageHeaderActionsProps {
  primaryAction?: Action
  secondaryActions?: Action[]
}

/**
 * Actions for the header's right zone. On desktop, secondaries + primary render
 * inline; on mobile, descriptor secondaries collapse into a "⋯" menu so the bar
 * stays uncluttered, with the primary action always visible.
 */
export function PageHeaderActions({
  primaryAction,
  secondaryActions,
}: PageHeaderActionsProps) {
  const descriptorSecondaries = (secondaryActions ?? []).filter(isDescriptor)
  const nodeSecondaries = (secondaryActions ?? []).filter(
    (a) => !isDescriptor(a)
  )

  return (
    <>
      <div className='hidden items-center gap-2 sm:flex'>
        {renderActions(secondaryActions, 'outline')}
        {renderAction(primaryAction, 'default')}
      </div>

      <div className='flex items-center gap-2 sm:hidden'>
        {nodeSecondaries.map((a, i) => (
          <React.Fragment key={i}>{renderAction(a)}</React.Fragment>
        ))}
        {descriptorSecondaries.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='size-8'
                aria-label='More actions'
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {descriptorSecondaries.map((a, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={a.onClick}
                  disabled={a.disabled}
                >
                  {a.icon && <a.icon />}
                  {a.content}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {renderAction(primaryAction, 'default')}
      </div>
    </>
  )
}
