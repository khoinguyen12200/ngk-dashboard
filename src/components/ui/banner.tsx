import * as React from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const TONE: Record<
  string,
  { classes: string; icon: React.ElementType; iconColor: string }
> = {
  info: {
    classes: 'bg-primary/5 border-primary/30',
    icon: Info,
    iconColor: 'text-primary',
  },
  success: {
    classes: 'bg-emerald-500/10 border-emerald-500/30',
    icon: CircleCheck,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    classes: 'bg-amber-500/10 border-amber-500/30',
    icon: TriangleAlert,
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  critical: {
    classes: 'bg-destructive/10 border-destructive/30',
    icon: CircleAlert,
    iconColor: 'text-destructive',
  },
}

export type BannerProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  /** Status tone (default `info`). */
  tone?: keyof typeof TONE
  /** Bold heading line. */
  title?: React.ReactNode
  /** Show a dismiss button; called when clicked. */
  onDismiss?: () => void
  /** Override the tone's default icon; `null` hides it. */
  icon?: React.ElementType | null
}

/** Prominent status callout for the top of a page or section. */
export function Banner({
  tone = 'info',
  title,
  onDismiss,
  icon,
  className,
  children,
  ...props
}: BannerProps) {
  const config = TONE[tone]
  const Icon = icon === null ? null : (icon ?? config.icon)
  return (
    <div
      data-slot='banner'
      role='status'
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 text-sm',
        config.classes,
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon className={cn('mt-0.5 size-5 shrink-0', config.iconColor)} />
      )}
      <div className='min-w-0 flex-1'>
        {title != null && <p className='font-medium'>{title}</p>}
        {children != null && (
          <div className={cn('text-muted-foreground', title != null && 'mt-1')}>
            {children}
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          type='button'
          aria-label='Dismiss'
          onClick={onDismiss}
          className='-m-1 shrink-0 rounded-md p-1 text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10'
        >
          <X className='size-4' />
        </button>
      )}
    </div>
  )
}
