import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Omit the cva-owned keys from the native props so they can't collide with a
// consumer's ambient JSX augmentation of <button> (e.g. Shopify App Bridge
// adds its own `variant`). A published library must own the keys its cva defines.
export type ButtonProps = Omit<
  React.ComponentProps<'button'>,
  keyof VariantProps<typeof buttonVariants>
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Show a spinner and disable the button while an action is in flight. */
    loading?: boolean
    /** Leading icon component (e.g. a lucide icon). Hidden while `loading`. */
    icon?: React.ElementType
    /** Trailing icon component. */
    iconRight?: React.ElementType
    /** Stretch to the full width of the container. */
    fullWidth?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    fullWidth && 'w-full',
    className
  )

  // With asChild the single child owns rendering; icon/loading don't apply
  // (injecting extra nodes would break Slot's single-child contract).
  if (asChild) {
    return (
      <Slot data-slot='button' className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button
      data-slot='button'
      className={classes}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      {...props}
    >
      {loading ? <Loader2 className='animate-spin' /> : Icon ? <Icon /> : null}
      {children}
      {IconRight && !loading ? <IconRight /> : null}
    </button>
  )
}

export { Button, buttonVariants }
