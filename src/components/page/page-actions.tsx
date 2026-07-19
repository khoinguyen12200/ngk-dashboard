import * as React from 'react'
import { cn } from '@/lib/utils'
import { type Action, renderAction, renderActions } from './action'

export interface PageActionsProps extends React.ComponentProps<'div'> {
  /** Primary action, right-aligned. */
  primaryAction?: Action
  /** Secondary actions, left-aligned. */
  secondaryActions?: Action[]
}

/**
 * A footer action bar for the bottom of a page or form: secondary actions on
 * the left, primary on the right, with a top divider.
 */
export function PageActions({
  primaryAction,
  secondaryActions,
  className,
  ...props
}: PageActionsProps) {
  const hasSecondary = (secondaryActions?.length ?? 0) > 0
  return (
    <div
      data-slot='page-actions-footer'
      className={cn(
        'flex items-center gap-2 border-t pt-4',
        hasSecondary ? 'justify-between' : 'justify-end',
        className
      )}
      {...props}
    >
      {hasSecondary && (
        <div className='flex items-center gap-2'>
          {renderActions(secondaryActions, 'outline')}
        </div>
      )}
      {renderAction(primaryAction, 'default')}
    </div>
  )
}
