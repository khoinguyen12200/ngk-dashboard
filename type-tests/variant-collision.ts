// Regression guard for the App Bridge `variant` collision.
//
// With `app-bridge.d.ts` in scope, the intrinsic <button>/<a> elements carry a
// `variant?: 'primary' | 'breadcrumb'`. If our components spread the raw native
// props, TypeScript would intersect the two unions and the ONLY legal variant
// values would become 'primary' | 'breadcrumb' — breaking every real usage.
//
// Because each component Omits its cva-owned keys before adding VariantProps,
// the assignments below must type-check, and the App Bridge values must NOT.
import type { ButtonProps, BadgeProps, AlertProps } from '@/index'

const buttonVariant: ButtonProps['variant'] = 'secondary'
const badgeVariant: BadgeProps['variant'] = 'outline'
const alertVariant: AlertProps['variant'] = 'destructive'

// @ts-expect-error 'primary' is App Bridge's variant, not one of ours.
const leaked: ButtonProps['variant'] = 'primary'

void buttonVariant
void badgeVariant
void alertVariant
void leaked
