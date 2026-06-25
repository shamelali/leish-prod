import { locales, defaultLocale, isLocale, localeHrefLangs, getDictionary } from "@/lib/i18n";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = "https://leish.my";

  return {
    title: {
      default: dict.seo.homeTitle,
      template: `%s | Leish!`,
    },
    description: dict.seo.homeDesc,
    keywords: [
      "makeup artist",
      "beauty booking",
      "Malaysia",
      "makeup studio",
      "Hari Raya",
      "hijab makeup",
      "bridal makeup",
      "event makeup",
    ],
    authors: [{ name: "Leish!" }],
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_MY" : locale === "ms" ? "ms_MY" : "zh_CN",
      siteName: "Leish!",
      title: dict.seo.homeTitle,
      description: dict.seo.homeDesc,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.homeTitle,
      description: dict.seo.homeDesc,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [localeHrefLangs[l], `${baseUrl}/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  return <>{children}</>;
}
