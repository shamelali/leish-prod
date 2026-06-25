import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockBookings = [
  { id: 'b1', client: 'Catherine M.', service: 'Glam Full Package', date: '2026-06-25', time: '10:00', status: 'upcoming', price: 450 },
  { id: 'b2', client: 'Sarah L.', service: 'Event Glam', date: '2026-06-26', time: '14:00', status: 'upcoming', price: 250 },
  { id: 'b3', client: 'Priya K.', service: 'Natural Glam', date: '2026-06-22', time: '09:00', status: 'completed', price: 300 },
  { id: 'b4', client: 'Amirah H.', service: 'Touch-up Session', date: '2026-06-20', time: '11:00', status: 'completed', price: 150 },
  { id: 'b5', client: 'Nina W.', service: 'Event Glam', date: '2026-06-18', time: '16:00', status: 'cancelled', price: 250 },
];

const statusBadge = (status: string) => {
  const config: Record<string, { label: string; bg: string; color: string }> = {
    upcoming: { label: 'Upcoming', bg: '#dbeafe', color: '#1d4ed8' },
    completed: { label: 'Completed', bg: '#d1fae5', color: '#059669' },
    cancelled: { label: 'Cancelled', bg: '#fee2e2', color: '#dc2626' },
  };
  const s = config[status] || { label: status, bg: '#f3f4f6', color: '#6b7280' };
  return (
    <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
      <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
};

export default function DashboardArtistScreen() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const stats = [
    { icon: 'calendar', label: 'Total Bookings', value: '24', color: '#3b82f6', bg: '#eff6ff' },
    { icon: 'cash', label: 'Revenue', value: 'RM 8,400', color: '#22c55e', bg: '#f0fdf4' },
    { icon: 'star', label: 'Rating', value: '4.8', color: '#f59e0b', bg: '#fffbeb' },
    { icon: 'trending-up', label: 'Reviews', value: '127', color: '#f43f5e', bg: '#fff1f2' },
  ];

  const filteredBookings = filter === 'all'
    ? mockBookings
    : mockBookings.filter((b) => b.status === filter);

  const recentActivity = [
    { action: 'New booking', detail: 'Bridal Makeup - June 28', time: '2 hours ago' },
    { action: 'Review received', detail: '5 stars from Sarah', time: '1 day ago' },
    { action: 'Payment released', detail: 'RM 450 - Bridal Package', time: '3 days ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Artist Dashboard</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: stat.bg }]}>
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((item, i) => (
            <View key={i} style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityAction}>{item.action}</Text>
                <Text style={styles.activityDetail}>{item.detail}</Text>
              </View>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bookings</Text>
          <View style={styles.filterRow}>
            {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterChip, filter === f && styles.filterChipActive]}
                onPress={() => setFilter(f)}
              >
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingClient}>{booking.client}</Text>
                {statusBadge(booking.status)}
              </View>
              <Text style={styles.bookingService}>{booking.service}</Text>
              <View style={styles.bookingMeta}>
                <Text style={styles.bookingDate}>
                  📅 {booking.date} at {booking.time}
                </Text>
                <Text style={styles.bookingPrice}>RM {booking.price}</Text>
              </View>
            </View>
          ))}
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f43f5e',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  activityDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  filterChipActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  bookingCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingClient: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bookingService: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  bookingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDate: {
    fontSize: 12,
    color: '#666',
  },
  bookingPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6366f1',
  },
});
