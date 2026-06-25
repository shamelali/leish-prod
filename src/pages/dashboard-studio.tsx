import { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, Star, TrendingUp } from 'lucide-react';
import Skeleton from '../components/Skeleton';

export default function DashboardStudio() {
  const [stats, setStats] = useState({ artists: 15, bookings: 89, revenue: 32000, rating: 4.7 });
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
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Studio Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: 'Artists', value: stats.artists, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
          { icon: BarChart3, label: 'Bookings', value: stats.bookings, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
          { icon: DollarSign, label: 'Revenue', value: `MYR ${stats.revenue}`, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
          { icon: Star, label: 'Rating', value: stats.rating, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`p-6 ${bg} rounded-2xl border border-gray-100 dark:border-neutral-800`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New artist joined', detail: 'Sophia Chen - Bridal MUA', time: '1 day ago' },
            { action: 'Studio booking', detail: 'Full-day event - June 30', time: '2 days ago' },
            { action: 'Payment received', detail: 'MYR 2,400 - Weekly batch', time: '3 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                <p className="text-xs text-gray-400">{item.detail}</p>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
