/** Public site URL and contact emails */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() || "https://ideologos.site";

export const CONTACT_EMAILS = {
  info: "info@ideologos.site",
  support: "support@ideologos.site",
  partnerships: "partnerships@ideologos.site",
  privacy: "privacy@ideologos.site",
} as const;
