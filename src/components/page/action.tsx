import * as React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'

/**
 * A prebuilt action. Pass a plain descriptor — `{ content, onClick }` — and it
 * renders a themed Button for you (the Polaris-style "just describe it"
 * ergonomic). Or pass any ReactNode (e.g. your own <Button asChild><Link/>) for
 * full control.
 */
export type ActionDescriptor = {
  content: string
  onClick?: () => void
  icon?: React.ElementType
  loading?: boolean
  disabled?: boolean
  variant?: ButtonProps['variant']
}

export type Action = ActionDescriptor | React.ReactNode

function isDescriptor(action: Action): action is ActionDescriptor {
  return (
    !!action &&
    typeof action === 'object' &&
    !React.isValidElement(action) &&
    'content' in action
  )
}

export function renderAction(
  action: Action,
  fallbackVariant: ButtonProps['variant'] = 'default'
): React.ReactNode {
  if (action == null || action === false) return null
  if (!isDescriptor(action)) return action
  return (
    <Button
      size='sm'
      variant={action.variant ?? fallbackVariant}
      onClick={action.onClick}
      disabled={action.disabled}
      loading={action.loading}
      icon={action.icon}
    >
      {action.content}
    </Button>
  )
}

export function renderActions(
  actions: Action[] | undefined,
  fallbackVariant: ButtonProps['variant'] = 'outline'
): React.ReactNode {
  if (!actions?.length) return null
  return actions.map((action, i) => (
    <React.Fragment key={i}>
      {renderAction(action, fallbackVariant)}
    </React.Fragment>
  ))
}
