/**
 * Generates blog URLs using the configured base path.
 * The base path comes from blogSettings.blogBasePath (default: "blog").
 *
 * Note: The actual Next.js routes live under /blog/* — next.config.ts
 * sets up rewrites from the custom path to /blog/* at build time.
 * These helpers generate the public-facing URLs using the custom path.
 */

export function blogUrl(basePath: string, postSlug?: string): string {
  const base = `/${basePath || 'blog'}`
  if (!postSlug) return base
  return `${base}/${postSlug}`
}

export function blogCategoryUrl(basePath: string, categorySlug: string): string {
  return `/${basePath || 'blog'}/kategorie/${categorySlug}`
}
