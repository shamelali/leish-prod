import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import FavoritesScreen from '../../src/screens/FavoritesScreen';

export default function Favorites() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <FavoritesScreen />;
}