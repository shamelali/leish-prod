import { useState, useEffect } from 'react';
import { Users, Building2, DollarSign, BarChart3, TrendingUp, Calendar, Star, Shield } from 'lucide-react';
import Skeleton from '../components/Skeleton';

const mockStats = {
  totalUsers: 2847,
  totalArtists: 64,
  totalStudios: 12,
  totalBookings: 1234,
  revenue: 185000,
  avgRating: 4.7,
  pendingPayouts: 12400,
  newUsersThisMonth: 312,
};

const recentActivity = [
  { action: 'New artist verified', detail: 'Priya Kaur - Bridal MUA', time: '30 min ago', type: 'artist' },
  { action: 'Payout processed', detail: 'RM 2,400 - Aiko Nakamura', time: '2 hours ago', type: 'payment' },
  { action: 'Booking completed', detail: 'Bridal Package - RM 800', time: '3 hours ago', type: 'booking' },
  { action: 'New user registered', detail: 'Sarah L. - Kuala Lumpur', time: '5 hours ago', type: 'user' },
  { action: 'Studio application', detail: 'GlamHouse Studio - Penang', time: '1 day ago', type: 'studio' },
  { action: 'Review flagged', detail: 'Inappropriate content reported', time: '1 day ago', type: 'flag' },
  { action: 'Payment dispute', detail: 'Booking #1024 - RM 350', time: '2 days ago', type: 'dispute' },
  { action: 'System backup', detail: 'Database backup completed', time: '2 days ago', type: 'system' },
];

const typeIcons: Record<string, React.ComponentType<any>> = {
  artist: Users, payment: DollarSign, booking: Calendar,
  user: Users, studio: Building2, flag: Shield, dispute: Shield, system: BarChart3,
};

export default function DashboardAdmin() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 dark:bg-rose-950/30 rounded-full">
          <Shield className="w-4 h-4 text-rose-500" />
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">Admin</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: 'Total Users', value: mockStats.totalUsers.toLocaleString(), sub: `+${mockStats.newUsersThisMonth} this month`, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
          { icon: Building2, label: 'Artists / Studios', value: `${mockStats.totalArtists} / ${mockStats.totalStudios}`, sub: `${mockStats.totalArtists + mockStats.totalStudios} total vendors`, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
          { icon: Calendar, label: 'Total Bookings', value: mockStats.totalBookings.toLocaleString(), sub: 'Across all services', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
          { icon: DollarSign, label: 'Total Revenue', value: `MYR ${mockStats.revenue.toLocaleString()}`, sub: `MYR ${mockStats.pendingPayouts.toLocaleString()} pending`, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
          { icon: Star, label: 'Average Rating', value: mockStats.avgRating, sub: 'Platform-wide', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
          { icon: TrendingUp, label: 'Growth Rate', value: '+18%', sub: 'vs last month', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          { icon: DollarSign, label: 'Pending Payouts', value: `MYR ${mockStats.pendingPayouts.toLocaleString()}`, sub: `${Math.ceil(mockStats.pendingPayouts / 350)} payouts`, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
          { icon: BarChart3, label: 'Conversion Rate', value: '12.4%', sub: 'Views to bookings', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
        ].map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className={`p-6 ${bg} rounded-2xl border border-gray-100 dark:border-neutral-800`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Platform Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => {
            const Icon = typeIcons[item.type] || BarChart3;
            return (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                <div className={`p-1.5 rounded-lg ${
                  item.type === 'artist' ? 'bg-violet-100 dark:bg-violet-900/30' :
                  item.type === 'payment' ? 'bg-green-100 dark:bg-green-900/30' :
                  item.type === 'booking' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  item.type === 'user' ? 'bg-amber-100 dark:bg-amber-900/30' :
                  'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    item.type === 'artist' ? 'text-violet-500' :
                    item.type === 'payment' ? 'text-green-500' :
                    item.type === 'booking' ? 'text-blue-500' :
                    item.type === 'user' ? 'text-amber-500' :
                    'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
