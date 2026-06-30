import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ToastProvider } from "./context/ToastContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { Account } from "./pages/account";

const Register = lazy(() => import("./pages/register"));
const Artists = lazy(() => import("./pages/artists"));
const ArtistDetail = lazy(() => import("./pages/artist-detail"));
const Studios = lazy(() => import("./pages/studios"));
const StudioDetail = lazy(() => import("./pages/studio-detail"));
const Profile = lazy(() => import("./pages/profile"));
const Favorites = lazy(() => import("./pages/favorites"));
const DashboardArtist = lazy(() => import("./pages/dashboard-artist"));
const DashboardStudio = lazy(() => import("./pages/dashboard-studio"));
const DashboardAdmin = lazy(() => import("./pages/dashboard-admin"));
const ArtistOnboarding = lazy(() => import("./pages/artist-onboarding"));
const NotFound = lazy(() => import("./pages/not-found"));

function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <ToastProvider>
            <NotificationsProvider>
              <ScrollToTop />
              <Navbar />
              <main className="min-h-screen pt-16">
                <Suspense fallback={<PageLoading />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/:role" element={<Register />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/artists/:id" element={<ArtistDetail />} />
                    <Route path="/studios" element={<Studios />} />
                    <Route path="/studios/:id" element={<StudioDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route
                      path="/dashboard/artist"
                      element={<DashboardArtist />}
                    />
                    <Route
                      path="/dashboard/studio"
                      element={<DashboardStudio />}
                    />
                    <Route
                      path="/dashboard/admin"
                      element={<DashboardAdmin />}
                    />
                    <Route
                      path="/artist-onboarding"
                      element={<ArtistOnboarding />}
                    />
                    <Route path="/auth/:pathname" element={<Auth />} />
                    <Route path="/account/:pathname" element={<Account />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </NotificationsProvider>
          </ToastProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
