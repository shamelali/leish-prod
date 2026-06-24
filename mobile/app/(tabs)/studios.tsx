import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import StudiosScreen from '../../src/screens/StudiosScreen';

export default function Studios() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <StudiosScreen />;
}