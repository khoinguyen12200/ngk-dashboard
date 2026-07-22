import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePageHeaderSlots } from '@/components/layout/page-header-context'

export interface SaveBarProps extends React.ComponentProps<'div'> {
  /** Show the bar (wire this to your form's dirty state). */
  open: boolean
  /** Left-side message (default "Unsaved changes"). */
  message?: React.ReactNode
  /** Save handler. */
  onSave?: () => void
  /** Discard handler (revert). */
  onDiscard?: () => void
  /** Spinner + disable on the Save button while saving. */
  saving?: boolean
  /** Disable Save (e.g. invalid form) without hiding the bar. */
  saveDisabled?: boolean
  saveLabel?: string
  discardLabel?: string
}

/**
 * Contextual save bar — the Shopify/Polaris pattern. Open it when a form goes
 * dirty; it offers Discard + Save. Inside a DashboardLayout it takes over the
 * top header bar (rather than adding a second strip); used standalone it pins
 * itself to the top of the page. Controlled: pair `open` with your form state
 * (e.g. react-hook-form's `formState.isDirty`).
 *
 *   <SaveBar
 *     open={form.formState.isDirty}
 *     saving={saving}
 *     onSave={form.handleSubmit(save)}
 *     onDiscard={() => form.reset()}
 *   />
 */
export function SaveBar({
  open,
  message = 'Unsaved changes',
  onSave,
  onDiscard,
  saving = false,
  saveDisabled = false,
  saveLabel = 'Save',
  discardLabel = 'Discard',
  className,
  ...props
}: SaveBarProps) {
  const slots = usePageHeaderSlots()
  const setSaveBarOpen = slots?.setSaveBarOpen

  React.useEffect(() => {
    if (!setSaveBarOpen) return
    setSaveBarOpen(open)
    return () => setSaveBarOpen(false)
  }, [open, setSaveBarOpen])

  const content = (
    <>
      <span className='truncate text-sm font-medium'>{message}</span>
      <div className='ms-auto flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={onDiscard}
          disabled={saving}
        >
          {discardLabel}
        </Button>
        <Button
          size='sm'
          onClick={onSave}
          loading={saving}
          disabled={saveDisabled}
        >
          {saveLabel}
        </Button>
      </div>
    </>
  )

  // Inside a DashboardLayout: take over the header bar via its overlay outlet.
  if (slots?.overlayNode) {
    return open ? createPortal(content, slots.overlayNode) : null
  }

  // Standalone: pin to the top of the page.
  if (!open) return null
  return (
    <div
      data-slot='save-bar'
      role='region'
      aria-label='Unsaved changes'
      className={cn(
        'sticky top-0 z-50 flex items-center gap-3 border-b bg-background/95 px-4 py-2.5 shadow-sm backdrop-blur',
        'animate-in fade-in slide-in-from-top-2',
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}
