import type { CSSProperties } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// Re-export sonner's imperative API so consumers can `import { toast }` straight
// from ngk-dashboard without a separate sonner dependency.
export { toast } from 'sonner'

// Standalone: theme comes in as a prop (default 'system', which Sonner resolves
// from the OS). Pass theme="dark" / "light" to force it from your own toggle.
export function Toaster({ theme = 'system', ...props }: ToasterProps) {
  return (
    <Sonner
      theme={theme}
      className='toaster group [&_div[data-content]]:w-full'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as CSSProperties
      }
      {...props}
    />
  )
}
