import { lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import '@neondatabase/neon-js/ui/css';
import './neon-auth.css';
import { authClient } from './lib/auth-client';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationsProvider } from './context/NotificationsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

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
const ArtistOnboarding = lazy(() => import('./pages/artist-onboarding'));
const Register = lazy(() => import('./pages/register'));
const Auth = lazy(() => import('./pages/auth'));
const Account = lazy(() => import('./pages/account'));
const NotFound = lazy(() => import('./pages/not-found'));

function AppLayout() {
  const navigate = useNavigate();

  return (
    <NeonAuthUIProvider
      emailOTP
      authClient={authClient}
      navigate={navigate}
      Link={Link}
      social={{ providers: ['google', 'github'] }}
    >
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
                      <Route path="/dashboard/artist" element={<ProtectedRoute allowedRoles={['artist']}><DashboardArtist /></ProtectedRoute>} />
                      <Route path="/dashboard/studio" element={<ProtectedRoute allowedRoles={['studio']}><DashboardStudio /></ProtectedRoute>} />
                      <Route path="/dashboard/admin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
                      <Route path="/onboarding/artist" element={<ArtistOnboarding />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/register/:role" element={<Register />} />
                      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
                      <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
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
    </NeonAuthUIProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
