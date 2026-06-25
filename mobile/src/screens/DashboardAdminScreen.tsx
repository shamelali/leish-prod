import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const stats = [
  { icon: 'people', label: 'Total Users', value: '2,847', sub: '+312 this month', color: '#3b82f6', bg: '#eff6ff' },
  { icon: 'business', label: 'Artists / Studios', value: '64 / 12', sub: '76 total vendors', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: 'calendar', label: 'Total Bookings', value: '1,234', sub: 'Across all services', color: '#22c55e', bg: '#f0fdf4' },
  { icon: 'cash', label: 'Total Revenue', value: 'RM 185K', sub: 'RM 12.4K pending', color: '#f59e0b', bg: '#fffbeb' },
  { icon: 'star', label: 'Avg Rating', value: '4.7', sub: 'Platform-wide', color: '#f43f5e', bg: '#fff1f2' },
  { icon: 'trending-up', label: 'Growth Rate', value: '+18%', sub: 'vs last month', color: '#10b981', bg: '#ecfdf5' },
  { icon: 'cash-outline', label: 'Pending Payouts', value: 'RM 12.4K', sub: '35 payouts', color: '#f97316', bg: '#fff7ed' },
  { icon: 'bar-chart', label: 'Conversion', value: '12.4%', sub: 'Views to bookings', color: '#06b6d4', bg: '#ecfeff' },
];

const recentActivity = [
  { action: 'New artist verified', detail: 'Priya Kaur - Bridal MUA', time: '30m ago', type: 'person' },
  { action: 'Payout processed', detail: 'RM 2,400 - Aiko Nakamura', time: '2h ago', type: 'cash' },
  { action: 'Booking completed', detail: 'Bridal Package - RM 800', time: '3h ago', type: 'calendar' },
  { action: 'New user registered', detail: 'Sarah L. - Kuala Lumpur', time: '5h ago', type: 'person-add' },
  { action: 'Review flagged', detail: 'Inappropriate content', time: '1d ago', type: 'flag' },
];

const typeColors: Record<string, string> = {
  person: '#8b5cf6', cash: '#22c55e', calendar: '#3b82f6',
  'person-add': '#f59e0b', flag: '#ef4444',
};

export default function DashboardAdminScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Admin Dashboard</Text>
              <Text style={styles.subtitle}>Platform overview</Text>
            </View>
            <View style={styles.adminBadge}>
              <Ionicons name="shield" size={14} color="#f43f5e" />
              <Text style={styles.adminText}>Admin</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: stat.bg }]}>
              <Ionicons name={stat.icon as any} size={22} color={stat.color} />
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statSub}>{stat.sub}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Platform Activity</Text>
          {recentActivity.map((item, i) => (
            <View key={i} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: (typeColors[item.type] || '#666') + '20' }]}>
                <Ionicons name={item.type as any} size={18} color={typeColors[item.type] || '#666'} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityAction}>{item.action}</Text>
                <Text style={styles.activityDetail}>{item.detail}</Text>
              </View>
              <Text style={styles.activityTime}>{item.time}</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  adminText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#f43f5e',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    width: '47%',
    padding: 14,
    borderRadius: 16,
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  statSub: {
    fontSize: 10,
    color: '#999',
    marginTop: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 24,
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
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 11,
    color: '#999',
  },
});
