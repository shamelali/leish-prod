import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { getDictionary, type Locale } from "../lib/i18n";

export default function CTASection({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict?: Record<string, any>;
} = {}) {
  const t = dict ?? getDictionary(locale as Locale);
  return (
    <section className="py-24 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 text-xs font-semibold rounded-full mb-6 backdrop-blur-sm border border-white/20">
          <Sparkles className="w-3.5 h-3.5" /> {t.cta.readyToGlow}
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
          {t.cta.title}
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.cta.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/artists"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-rose-600 font-bold rounded-2xl hover:bg-rose-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 text-base"
          >
            {t.cta.browseArtists} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/601137633788"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/25 hover:bg-white/20 transition-all backdrop-blur-sm text-base"
          >
            <MessageCircle className="w-4 h-4" /> {t.cta.chatWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
}
