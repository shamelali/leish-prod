import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Calendar,
  Sun,
  Moon,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNotifications } from "../context/NotificationsContext";
import SearchModal from "./SearchModal";
import NotificationsDropdown from "./NotificationsDropdown";
import { getDictionary } from "../lib/i18n";
import type { Locale } from "../lib/i18n";

export default function Navbar({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict?: Record<string, any>;
} = {}) {
  const t: any = dict ?? getDictionary(locale as Locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { count: favCount } = useFavorites();
  const { unread: _notifUnread, addNotification } = useNotifications();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      setProfileOpen(false);
    }
  }, [open]);

  // Notify on booking
  useEffect(() => {
    if (user && user.bookings.length > 0) {
      const latest = user.bookings[user.bookings.length - 1];
      if (
        latest.status === "confirmed" &&
        !sessionStorage.getItem(`notif-${latest.id}`)
      ) {
        addNotification({
          type: "booking_confirmed",
          title: "Booking Confirmed! ✅",
          message: `Your appointment with ${latest.artistName} on ${new Date(latest.date).toLocaleDateString("en-MY", { month: "short", day: "numeric" })} at ${latest.time} is confirmed.`,
          link: "/profile",
        });
        sessionStorage.setItem(`notif-${latest.id}`, "1");
      }
    }
  }, [user, addNotification]);

  const navBg = scrolled
    ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-2xl shadow-sm border-b border-rose-100/50 dark:border-neutral-800/50"
    : "bg-transparent border-b border-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/leishlogo.png" alt="Leish!" className="h-8 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
            >
              {t.nav.home}
            </Link>
            <Link
              to="/artists"
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
            >
              {t.nav.artists}
            </Link>
            <Link
              to="/studios"
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
            >
              {t.nav.studios}
            </Link>
            <Link
              to="/artists?category=event"
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
            >
              {t.nav.events}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <SearchModal />

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            {/* Notifications */}
            <NotificationsDropdown />

            {/* Favorites */}
            <Link
              to="/favorites"
              className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all relative"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 py-2 z-50 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-neutral-800">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      >
                        <User className="w-4 h-4" /> {t.nav.myProfile}
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      >
                        <Calendar className="w-4 h-4" /> {t.nav.myBookings}
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      >
                        <Heart className="w-4 h-4" /> {t.nav.favorites}
                        {favCount > 0 && (
                          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-full">
                            {favCount}
                          </span>
                        )}
                      </Link>
                      {user.role === "artist" && (
                        <Link
                          to="/dashboard/artist"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />{" "}
                          {t.nav.artistDashboard}
                        </Link>
                      )}
                      {user.role === "artist" && (
                        <Link
                          to="/onboarding/artist"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          <BookOpen className="w-4 h-4" /> Onboarding Guide
                        </Link>
                      )}
                      {user.role === "studio" && (
                        <Link
                          to="/dashboard/studio"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />{" "}
                          {t.nav.studioDashboard}
                        </Link>
                      )}
                      {(user.role === "artist" || user.role === "studio") && (
                        <Link
                          to="/dashboard/admin"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Admin
                          Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 dark:border-neutral-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" /> {t.common.logout}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
                >
                  {t.nav.login}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105 active:scale-100"
                >
                  {t.nav.signup}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-1">
            <SearchModal />
            <button
              onClick={toggle}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </button>
            <NotificationsDropdown />
            <Link
              to="/favorites"
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all relative"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-b border-rose-100 dark:border-neutral-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              to="/artists"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors"
            >
              {t.nav.browseArtists}
            </Link>
            <Link
              to="/studios"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors"
            >
              {t.nav.studios}
            </Link>
            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors"
            >
              <Heart className="w-4 h-4" /> {t.nav.favorites}
              {favCount > 0 && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-full">
                  {favCount}
                </span>
              )}
            </Link>

            <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 mt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"
                  >
                    <User className="w-4 h-4" /> {t.nav.myProfile}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"
                  >
                    <Calendar className="w-4 h-4" /> {t.nav.myBookings}
                  </Link>
                  {user.role === "artist" && (
                    <Link
                      to="/dashboard/artist"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"
                    >
                      <LayoutDashboard className="w-4 h-4" />{" "}
                      {t.nav.artistDashboard}
                    </Link>
                  )}
                  {user.role === "artist" && (
                    <Link
                      to="/onboarding/artist"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"
                    >
                      <BookOpen className="w-4 h-4" /> Onboarding Guide
                    </Link>
                  )}
                  {user.role === "studio" && (
                    <Link
                      to="/dashboard/studio"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"
                    >
                      <LayoutDashboard className="w-4 h-4" />{" "}
                      {t.nav.studioDashboard}
                    </Link>
                  )}
                  {(user.role === "artist" || user.role === "studio") && (
                    <Link
                      to="/dashboard/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl w-full text-left"
                  >
                    <LogOut className="w-4 h-4" /> {t.common.logout}
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="block text-center px-5 py-3 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                  >
                    {t.nav.signup}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
