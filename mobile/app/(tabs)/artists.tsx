import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import ArtistsScreen from '../../src/screens/ArtistsScreen';

export default function Artists() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <ArtistsScreen />;
}