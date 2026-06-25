import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, cancelBooking } = useAuth();
  const { favorites } = useFavorites();
  const [showBookings, setShowBookings] = useState(false);

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => cancelBooking(bookingId),
        },
      ]
    );
  };

  const activeBookings = user?.bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = user?.bookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{activeBookings?.length || 0}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{pastBookings?.length || 0}</Text>
            <Text style={styles.statLabel}>Past</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowBookings(!showBookings)}
        >
          <Ionicons
            name="calendar"
            size={20}
            color="#6366f1"
            style={styles.menuIcon}
          />
          <Text style={styles.sectionTitle}>My Bookings</Text>
          <Ionicons
            name={showBookings ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        {showBookings && (
          <View style={styles.bookingsSection}>
            {activeBookings && activeBookings.length > 0 && (
              <>
                <Text style={styles.bookingSectionLabel}>Active</Text>
                {activeBookings.map((booking) => (
                  <View key={booking.id} style={styles.bookingCard}>
                    <View style={styles.bookingHeader}>
                      {booking.artistImage && (
                        <Image
                          source={{ uri: booking.artistImage }}
                          style={styles.bookingAvatar}
                        />
                      )}
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingArtist}>{booking.artistName}</Text>
                        <Text style={styles.bookingService}>{booking.service}</Text>
                      </View>
                      <View
                        style={[
                          styles.statusBadge,
                          booking.status === 'confirmed'
                            ? styles.confirmedBadge
                            : styles.pendingBadge,
                        ]}
                      >
                        <Text style={styles.statusText}>{booking.status}</Text>
                      </View>
                    </View>
                    <View style={styles.bookingDetails}>
                      <Text style={styles.bookingDetail}>
                        📅 {booking.date} at {booking.time}
                      </Text>
                      <Text style={styles.bookingPrice}>RM {booking.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancelBooking(booking.id)}
                    >
                      <Text style={styles.cancelText}>Cancel Booking</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

            {pastBookings && pastBookings.length > 0 && (
              <>
                <Text style={styles.bookingSectionLabel}>Past</Text>
                {pastBookings.map((booking) => (
                  <View key={booking.id} style={styles.bookingCard}>
                    <View style={styles.bookingHeader}>
                      {booking.artistImage && (
                        <Image
                          source={{ uri: booking.artistImage }}
                          style={styles.bookingAvatar}
                        />
                      )}
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingArtist}>{booking.artistName}</Text>
                        <Text style={styles.bookingService}>{booking.service}</Text>
                      </View>
                      <View
                        style={[
                          styles.statusBadge,
                          booking.status === 'completed'
                            ? styles.completedBadge
                            : styles.cancelledBadge,
                        ]}
                      >
                        <Text style={styles.statusText}>{booking.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.bookingDetail}>
                      📅 {booking.date}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {(!user?.bookings || user.bookings.length === 0) && (
              <Text style={styles.emptyBookings}>No bookings yet</Text>
            )}
          </View>
        )}

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/screens/DashboardArtistScreen')}
          >
            <Ionicons name="color-palette" size={20} color="#6366f1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Artist Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/screens/DashboardStudioScreen')}
          >
            <Ionicons name="business" size={20} color="#6366f1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Studio Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/screens/DashboardAdminScreen')}
          >
            <Ionicons name="shield" size={20} color="#f43f5e" style={styles.menuIcon} />
            <Text style={styles.menuText}>Admin Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card" size={20} color="#6366f1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Payment Methods</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications" size={20} color="#6366f1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="#6366f1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#ef4444" style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: '#ef4444' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bookingsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  bookingSectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 8,
  },
  bookingCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingArtist: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bookingService: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confirmedBadge: {
    backgroundColor: '#d1fae5',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
  },
  completedBadge: {
    backgroundColor: '#e0e7ff',
  },
  cancelledBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#1a1a1a',
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDetail: {
    fontSize: 13,
    color: '#666',
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  cancelText: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: '600',
  },
  emptyBookings: {
    textAlign: 'center',
    color: '#666',
    padding: 24,
  },
  menu: {
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
});
