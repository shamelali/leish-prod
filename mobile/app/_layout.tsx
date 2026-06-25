import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/lib/queryClient';
import { AuthProvider } from '../src/context/AuthContext';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" options={{ presentation: 'modal' }} />
            <Stack.Screen name="signup" options={{ presentation: 'modal' }} />
          <Stack.Screen name="screens/ArtistDetailScreen" options={{ presentation: 'card' }} />
          <Stack.Screen name="screens/StudioDetailScreen" options={{ presentation: 'card' }} />
          <Stack.Screen name="screens/PaymentScreen" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="screens/DashboardArtistScreen" options={{ presentation: 'card' }} />
          <Stack.Screen name="screens/DashboardStudioScreen" options={{ presentation: 'card' }} />
          </Stack>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}