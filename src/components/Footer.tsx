import { Link } from "react-router-dom";
import { Sparkles, Heart, MessageCircle, Camera, Mail } from "lucide-react";
import { categories } from "../data/artists";
import { getDictionary, type Locale } from "../lib/i18n";

export default function Footer({
  locale = "en",
  dict
}: {
  locale?: Locale;
  dict?: Record<string, any>;
} = {}) {
  const t = dict ?? getDictionary(locale as Locale);
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
              <span className="text-xl font-bold text-white">Leish!</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{t.footer.tagline}</p>
            <a href="https://wa.me/601137633788" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
              <MessageCircle className="w-4 h-4" /> {t.cta.chatWhatsApp}
            </a>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.categories}</h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}><Link to={`/artists?category=${cat.id}`} className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2"><span className="text-xs">{cat.icon}</span>{(t.categories as Record<string, any>)[cat.id] ?? cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">More</h3>
            <ul className="space-y-2.5">
              {categories.slice(4).map((cat) => (
                <li key={cat.id}><Link to={`/artists?category=${cat.id}`} className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2"><span className="text-xs">{cat.icon}</span>{(t.categories as Record<string, any>)[cat.id] ?? cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.explore}</h3>
            <ul className="space-y-2.5">
              <li><Link to="/#how-it-works" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">{t.howItWorks.title}</Link></li>
              <li><Link to="/artists" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">{t.footer.artists}</Link></li>
              <li><Link to="/studios" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">{t.footer.studios}</Link></li>
              <li><Link to="/register/artist" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Join as Artist</Link></li>
              <li><Link to="/register/studio" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Register Studio</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Portfolio</h3>
            <ul className="space-y-2.5">
              <li><a href="https://dutaintegra.my" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Duta Integra</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Leish! {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-rose-400 transition-colors" aria-label="Instagram"><Camera className="w-5 h-5" /></a>
            <a href="mailto:hello@leish.my" className="text-gray-500 hover:text-rose-400 transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
            <a href="https://wa.me/601137633788" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rose-400 transition-colors" aria-label="WhatsApp"><MessageCircle className="w-5 h-5" /></a>
            <p className="text-sm text-gray-500 flex items-center gap-1"><Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> {t.footer.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
