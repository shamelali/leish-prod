import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { userApi } from '../services/user';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (artistId: string) => Promise<void>;
  isFavorite: (artistId: string) => boolean;
  isLoading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'leish_favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialSyncDone, setInitialSyncDone] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (user && !initialSyncDone) {
      syncFromServer();
    }
  }, [user, initialSyncDone]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncFromServer = async () => {
    try {
      const serverFavorites = await userApi.getFavorites(user!.id);
      if (serverFavorites.length > 0) {
        const localStr = await AsyncStorage.getItem(STORAGE_KEY);
        const local: string[] = localStr ? JSON.parse(localStr) : [];
        const merged = [...new Set([...serverFavorites, ...local])];
        setFavorites(merged);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
    } catch (error) {
      console.error('Failed to sync favorites from server:', error);
    } finally {
      setInitialSyncDone(true);
    }
  };

  const saveToStorage = async (ids: string[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const toggleFavorite = useCallback(
    async (artistId: string) => {
      const newFavorites = favorites.includes(artistId)
        ? favorites.filter((id) => id !== artistId)
        : [...favorites, artistId];

      setFavorites(newFavorites);
      await saveToStorage(newFavorites);

      if (user) {
        if (newFavorites.includes(artistId)) {
          await userApi.addFavorite(user.id, artistId);
        } else {
          await userApi.removeFavorite(user.id, artistId);
        }
      }
    },
    [favorites, user]
  );

  const isFavorite = useCallback(
    (artistId: string) => favorites.includes(artistId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
