/**
 * Canonical origin of the deployed site. Set NEXT_PUBLIC_SITE_URL at build
 * time so canonical URLs, OG images, sitemap.xml, robots.txt, and JSON-LD
 * resolve to the real domain (falls back to localhost for local builds).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
