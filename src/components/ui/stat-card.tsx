import * as React from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'

const TREND: Record<
  string,
  { classes: string; icon: React.ElementType | null }
> = {
  up: {
    classes: 'text-emerald-600 dark:text-emerald-400',
    icon: TrendingUp,
  },
  down: { classes: 'text-destructive', icon: TrendingDown },
  neutral: { classes: 'text-muted-foreground', icon: null },
}

export interface StatCardProps extends React.ComponentProps<typeof Card> {
  /** Metric name, e.g. "Revenue". */
  label: React.ReactNode
  /** The big number, e.g. "$12,480". */
  value: React.ReactNode
  /** Change vs. the comparison period, e.g. "+12.5%". */
  delta?: React.ReactNode
  /** Colors the delta and picks an arrow. */
  trend?: 'up' | 'down' | 'neutral'
  /** Icon shown top-right (e.g. a lucide icon). */
  icon?: React.ElementType
  /** Muted line under the value, e.g. "vs. last month". */
  helpText?: React.ReactNode
}

/** Prebuilt KPI card: label, big metric, and a trend delta — the dashboard staple. */
export function StatCard({
  label,
  value,
  delta,
  trend = 'neutral',
  icon: Icon,
  helpText,
  className,
  ...props
}: StatCardProps) {
  const t = TREND[trend]
  const TrendIcon = t.icon
  return (
    <Card data-slot='stat-card' className={cn('gap-0', className)} {...props}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums'>
          {value}
        </CardTitle>
        {Icon && (
          <div
            data-slot='card-action'
            className='col-start-2 row-span-2 row-start-1 self-start justify-self-end text-muted-foreground'
          >
            <Icon className='size-5' />
          </div>
        )}
      </CardHeader>
      {(delta != null || helpText != null) && (
        <CardContent className='pt-3'>
          <div className='flex items-center gap-2 text-sm'>
            {delta != null && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 font-medium',
                  t.classes
                )}
              >
                {TrendIcon && <TrendIcon className='size-4' />}
                {delta}
              </span>
            )}
            {helpText != null && (
              <span className='text-muted-foreground'>{helpText}</span>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
