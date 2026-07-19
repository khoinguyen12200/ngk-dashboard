// Mimics @shopify/app-bridge-types: it ambiently augments the intrinsic
// <button> and <a> elements with its own `variant`. This is exactly what
// previously collapsed our components' variant unions down to
// 'primary' | 'breadcrumb' when the library was consumed inside a Shopify app.
import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      button: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      > & { variant?: 'primary' | 'breadcrumb' }
      a: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      > & { variant?: 'primary' | 'breadcrumb' }
    }
  }
}
