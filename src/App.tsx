import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Artists from './pages/artists';
import ArtistDetail from './pages/artist-detail';
import Studios from './pages/studios';
import StudioDetail from './pages/studio-detail';
import Profile from './pages/profile';
import Favorites from './pages/favorites';
import DashboardArtist from './pages/dashboard-artist';
import DashboardStudio from './pages/dashboard-studio';
import Auth from './pages/auth';
import Account from './pages/account';
import NotFound from './pages/not-found';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationsProvider } from './context/NotificationsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

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
                    <Route path="/auth/:pathname" element={<Auth />} />
                    <Route path="/account/:pathname" element={<Account />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </NotificationsProvider>
            </ToastProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
