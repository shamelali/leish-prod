import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import ProfileScreen from '../../src/screens/ProfileScreen';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <ProfileScreen />;
}