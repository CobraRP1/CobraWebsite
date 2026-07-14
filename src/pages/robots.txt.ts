import type { APIRoute } from 'astro';

// Generated rather than static so the sitemap URL follows `site` in astro.config.mjs
// through the custom-domain cutover instead of silently pointing at the old host.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(
    `${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`,
    site,
  );

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.toString()}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
