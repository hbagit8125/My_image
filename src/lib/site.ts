// Public address of the site. On Vercel this is filled in automatically;
// set NEXT_PUBLIC_SITE_URL if you attach a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
