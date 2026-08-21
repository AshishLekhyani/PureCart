/** Canonical origin. Vercel supplies the deployment host; fall back for local builds. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const siteName = "PureCart";

export const siteDescription =
  "PureCart is a ready-to-wear label for women, men, and the home. Plain materials, considered cuts, nothing louder than it needs to be.";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
