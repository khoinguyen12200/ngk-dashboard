import type { RenderLink } from './types'

/** Zero-config fallback: a plain anchor (full-page navigation). */
export const defaultRenderLink: RenderLink = ({
  href,
  className,
  children,
  onClick,
  ...rest
}) => (
  <a href={href} className={className} onClick={onClick} {...rest}>
    {children}
  </a>
)

/** Router-neutral active-state check against the current path. */
export function checkIsActive(
  currentPath: string | undefined,
  href: string | undefined,
  subHrefs?: string[],
  mainNav = false
) {
  if (!currentPath || !href) {
    return !!subHrefs?.some((h) => h === currentPath)
  }
  const path = currentPath.split('?')[0]
  return (
    currentPath === href ||
    path === href ||
    !!subHrefs?.some((h) => h === currentPath || h === path) ||
    (mainNav &&
      path.split('/')[1] !== '' &&
      path.split('/')[1] === href.split('/')[1])
  )
}
