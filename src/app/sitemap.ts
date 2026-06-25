import { locales, defaultLocale } from "@/lib/i18n";
import { MetadataRoute } from "next";

const baseUrl = "https://leish.my";

const staticRoutes = ["", "/artists", "/studios", "/register", "/register/artist", "/register/studio", "/login", "/favorites", "/profile", "/blog", "/dashboard/artist", "/dashboard/studio"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const url = `${baseUrl}/${locale}${route}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
