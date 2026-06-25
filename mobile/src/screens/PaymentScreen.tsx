import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { paymentsApi } from '../services/user';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const billUrl = params.url as string;
  const bookingId = params.bookingId as string;
  const paymentId = params.paymentId as string;
  const [status, setStatus] = useState<'opening' | 'waiting' | 'success' | 'failed'>('opening');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    openBillplz();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pollUntilPaid = () => {
    intervalRef.current = setInterval(async () => {
      try {
        const result = await paymentsApi.checkStatus(paymentId);
        if (result.payment?.status === 'paid') {
          clearInterval(intervalRef.current!);
          setStatus('success');
        }
      } catch {}
    }, 3000);
  };

  const openBillplz = async () => {
    try {
      await WebBrowser.openBrowserAsync(billUrl);
      setStatus('waiting');
      pollUntilPaid();
      setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, 60000);
    } catch {
      setStatus('failed');
    }
  };

  const handleDone = () => {
    if (status === 'success') {
      router.replace('/(tabs)/profile');
    } else {
      router.back();
    }
  };

  if (status === 'opening') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Opening payment gateway...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'success') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successText}>
            Your booking has been confirmed. View it in your profile.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleDone}>
            <Text style={styles.buttonText}>View My Bookings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        {status === 'failed' ? (
          <>
            <Ionicons name="close-circle" size={80} color="#ef4444" />
            <Text style={styles.failTitle}>Payment Failed</Text>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Checking payment status...</Text>
          </>
        )}
        <Text style={styles.successText}>
          {status === 'failed'
            ? 'Your payment could not be processed.'
            : 'Please wait while we confirm your payment.'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>
            {status === 'failed' ? 'Go Back' : 'Check Later'}
          </Text>
        </TouchableOpacity>
        {status === 'waiting' && (
          <TouchableOpacity style={styles.retryButton} onPress={openBillplz}>
            <Text style={styles.retryText}>Open Payment Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 16,
    color: '#666',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 24,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    marginTop: 12,
  },
  failTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ef4444',
    marginBottom: 12,
    marginTop: 24,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    marginTop: 12,
    padding: 12,
  },
  retryText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
});
