/**
 * Base-path helper.
 *
 * The site serves from a sub-path (/CobraWebsite/) until the custom domain
 * lands, and from / afterwards. Every internal link and asset path must go
 * through href() — a hardcoded leading "/" works in dev and 404s in
 * production, which is the classic GitHub-Pages-project-site bug.
 *
 *   href('/people/')            -> /CobraWebsite/people/
 *   href('/assets/logo.svg')    -> /CobraWebsite/assets/logo.svg
 *
 * External URLs (http…, mailto:, #anchor) pass through untouched.
 */
export function href(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL; // "/CobraWebsite/" or "/"
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/** Absolute URL, for OG tags / JSON-LD / sitemap-adjacent metadata. */
export function absoluteUrl(path: string, origin: string): string {
  return new URL(href(path), origin).toString();
}

/** True when `path` is the current page (or an ancestor of it) — for nav highlighting. */
export function isActive(path: string, currentPathname: string): boolean {
  const target = href(path);
  if (target === href('/')) return currentPathname === target;
  return currentPathname.startsWith(target);
}
