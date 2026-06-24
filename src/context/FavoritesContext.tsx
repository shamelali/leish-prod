"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (artistId: string) => boolean;
  toggleFavorite: (artistId: string) => void;
  addFavorite: (artistId: string) => void;
  removeFavorite: (artistId: string) => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "leish_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites, mounted]);

  const isFavorite = useCallback(
    (artistId: string) => favorites.includes(artistId),
    [favorites]
  );

  const toggleFavorite = useCallback((artistId: string) => {
    setFavorites((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  }, []);

  const addFavorite = useCallback((artistId: string) => {
    setFavorites((prev) =>
      prev.includes(artistId) ? prev : [...prev, artistId]
    );
  }, []);

  const removeFavorite = useCallback((artistId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== artistId));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    return {
      favorites: [] as string[],
      isFavorite: (_id: string) => false,
      toggleFavorite: (_id: string) => {},
      addFavorite: (_id: string) => {},
      removeFavorite: (_id: string) => {},
      count: 0,
    };
  }
  return ctx;
}
