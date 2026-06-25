import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import DashboardArtistScreen from '../../src/screens/DashboardArtistScreen';

export default function DashboardArtistRoute() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/login" />;
  return <DashboardArtistScreen />;
}
