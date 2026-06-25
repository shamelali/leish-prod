import { locales, defaultLocale, isLocale, getDictionary } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedArtists from "@/components/FeaturedArtists";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar locale={locale} dict={dict} />
      <HeroSection locale={locale} dict={dict} />
      <CategoriesSection dict={dict} />
      <FeaturedArtists dict={dict} />
      <HowItWorks dict={dict} />
      <Testimonials dict={dict} />
      <CTASection dict={dict} />
      <Footer locale={locale} dict={dict} />
    </main>
  );
}
