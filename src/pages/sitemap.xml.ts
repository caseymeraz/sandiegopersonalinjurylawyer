import type { APIRoute } from 'astro';
import lawyers from '../data/lawyers.json';

const baseUrl = 'https://sandiegopersonalinjurylawyer.co';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/what-to-do-after-car-accident-san-diego/', priority: '0.8', changefreq: 'monthly' },
  { url: '/san-diego-dangerous-intersections/', priority: '0.8', changefreq: 'monthly' },
  { url: '/first-consultation-checklist/', priority: '0.8', changefreq: 'monthly' },
  { url: '/editorial-standards/', priority: '0.5', changefreq: 'monthly' },
];

const profilePages = lawyers.map(lawyer => ({
  url: `/lawyers/${(lawyer as any).slug}/`,
  priority: '0.7',
  changefreq: 'monthly' as const,
}));

export const GET: APIRoute = () => {
  const allPages = [...staticPages, ...profilePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
