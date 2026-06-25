import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import ArtistDetailScreen from '../../src/screens/ArtistDetailScreen';

export default function ArtistDetailRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <ArtistDetailScreen />;
}
