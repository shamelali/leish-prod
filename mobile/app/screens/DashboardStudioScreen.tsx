import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import DashboardStudioScreen from '../../src/screens/DashboardStudioScreen';

export default function DashboardStudioRoute() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/login" />;
  return <DashboardStudioScreen />;
}
