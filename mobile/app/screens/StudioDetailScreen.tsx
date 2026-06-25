import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import StudioDetailScreen from '../../src/screens/StudioDetailScreen';

export default function StudioDetailRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <StudioDetailScreen />;
}
