import { AuthProvider } from '../src/context/AuthContext';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import TabLayout from '../src/navigation/TabLayout';

export default function TabLayoutWrapper() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <TabLayout />
      </FavoritesProvider>
    </AuthProvider>
  );
}