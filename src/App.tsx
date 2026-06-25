import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationsProvider } from './context/NotificationsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/home'));
const Artists = lazy(() => import('./pages/artists'));
const ArtistDetail = lazy(() => import('./pages/artist-detail'));
const Studios = lazy(() => import('./pages/studios'));
const StudioDetail = lazy(() => import('./pages/studio-detail'));
const Profile = lazy(() => import('./pages/profile'));
const Favorites = lazy(() => import('./pages/favorites'));
const DashboardArtist = lazy(() => import('./pages/dashboard-artist'));
const DashboardStudio = lazy(() => import('./pages/dashboard-studio'));
const DashboardAdmin = lazy(() => import('./pages/dashboard-admin'));
const Auth = lazy(() => import('./pages/auth'));
const Account = lazy(() => import('./pages/account'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <ToastProvider>
              <NotificationsProvider>
                <ScrollToTop />
                <Navbar />
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
                  </div>
                }>
                  <main className="min-h-screen pt-16">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/artists" element={<Artists />} />
                      <Route path="/artists/:id" element={<ArtistDetail />} />
                      <Route path="/studios" element={<Studios />} />
                      <Route path="/studios/:id" element={<StudioDetail />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/dashboard/artist" element={<DashboardArtist />} />
                      <Route path="/dashboard/studio" element={<DashboardStudio />} />
                      <Route path="/dashboard/admin" element={<DashboardAdmin />} />
                      <Route path="/auth/:pathname" element={<Auth />} />
                      <Route path="/account/:pathname" element={<Account />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </Suspense>
                <Footer />
              </NotificationsProvider>
            </ToastProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
