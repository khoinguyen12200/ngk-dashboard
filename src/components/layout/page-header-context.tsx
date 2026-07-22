import * as React from 'react'

/**
 * Wiring for the "header outlet": DashboardLayout owns the top header bar and
 * exposes portal targets so a Page (or SaveBar) mounted anywhere in the content
 * can project its title, actions, and save state up into that bar. When this
 * context is absent (a standalone Page/SaveBar/Header), consumers fall back to
 * their inline rendering. See header.tsx / page.tsx / save-bar.tsx.
 */
export interface PageHeaderSlots {
  /** Left-zone portal target: breadcrumbs, back, title, metadata. */
  titleNode: HTMLElement | null
  /** Right-zone portal target: primary + secondary actions. */
  actionsNode: HTMLElement | null
  /** Overlay portal target: the save-bar takeover that covers the header. */
  overlayNode: HTMLElement | null
  setTitleNode: (el: HTMLElement | null) => void
  setActionsNode: (el: HTMLElement | null) => void
  setOverlayNode: (el: HTMLElement | null) => void
  /** True while a SaveBar is open, so the header shows its overlay. */
  saveBarOpen: boolean
  setSaveBarOpen: (open: boolean) => void
}

export const PageHeaderContext = React.createContext<PageHeaderSlots | null>(
  null
)

/**
 * Access the header outlet, or `null` when not inside a DashboardLayout. A
 * `null` return is the signal to render inline instead of projecting.
 */
export function usePageHeaderSlots(): PageHeaderSlots | null {
  return React.useContext(PageHeaderContext)
}
