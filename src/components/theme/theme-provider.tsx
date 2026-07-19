import * as React from 'react'
import { cn } from '@/lib/utils'

/** Named basics → the CSS variable each one drives. */
const TOKEN_VARS = {
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  accent: '--accent',
  destructive: '--destructive',
  background: '--background',
  foreground: '--foreground',
  border: '--border',
  radius: '--radius',
} as const

export interface ThemeProviderProps extends React.ComponentProps<'div'> {
  /**
   * Brand color — any CSS color (hex, oklch, hsl). Everything accented (buttons,
   * links, focus rings, active nav) derives from it: the one value most
   * dashboards need.
   */
  primary?: string
  primaryForeground?: string
  /** Neutral surfaces / emphasis. */
  secondary?: string
  accent?: string
  /** Danger color (destructive buttons, invalid fields). */
  destructive?: string
  /** Page background + default text color. */
  background?: string
  foreground?: string
  /** Default border/divider color. */
  border?: string
  /** Corner radius for the whole system, e.g. '0.5rem'. */
  radius?: string
  /** Font family applied to everything beneath, e.g. `'Inter, sans-serif'`. */
  font?: string
  /**
   * Any other theme token by name, e.g. `{ muted: '...', ring: '...' }` or with
   * an explicit `--` prefix. Escape hatch for the full token set.
   */
  tokens?: Record<string, string>
  /**
   * Apply the theme via `display: contents` (no layout box) — use when wrapping
   * your whole app.
   */
  inline?: boolean
}

/**
 * Define your design basics once. Wrap your app (or any subtree); the CSS
 * variables cascade to every ngk-dashboard component beneath — Card, Button,
 * Separator, inputs, the layout, all of it. No stylesheet edits, no Tailwind
 * config. This is the Polaris-style "theme it in one place" entry point.
 *
 *   <ThemeProvider primary='#5b5bd6' radius='0.5rem' font='Inter, sans-serif' inline>
 *     <App />
 *   </ThemeProvider>
 *
 * Prefer zero runtime? Set the same variables in your global CSS:
 *   :root { --primary: #5b5bd6; --radius: 0.5rem; }
 */
export function ThemeProvider({
  font,
  tokens,
  inline = false,
  className,
  style,
  ...rest
}: ThemeProviderProps) {
  const vars: Record<string, string> = {}

  // Named basics.
  for (const [prop, cssVar] of Object.entries(TOKEN_VARS)) {
    const value = (rest as Record<string, unknown>)[prop]
    if (typeof value === 'string') {
      vars[cssVar] = value
      delete (rest as Record<string, unknown>)[prop]
    }
  }

  // Font applies as a real font-family (cascades) and as --font-sans.
  if (font) {
    vars['--font-sans'] = font
    vars.fontFamily = font
  }

  // Arbitrary tokens by name or explicit --var.
  if (tokens) {
    for (const [key, value] of Object.entries(tokens)) {
      vars[key.startsWith('--') ? key : `--${key}`] = value
    }
  }

  if (inline) vars.display = 'contents'

  return (
    <div
      data-slot='theme'
      className={cn(className)}
      style={{ ...vars, ...style } as React.CSSProperties}
      {...rest}
    />
  )
}
