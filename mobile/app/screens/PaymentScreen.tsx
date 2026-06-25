import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import PaymentScreen from '../../src/screens/PaymentScreen';

export default function PaymentRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <PaymentScreen />;
}
