import { useState, useEffect } from 'react';
import { BarChart3, Calendar, DollarSign, Star, TrendingUp, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Skeleton from '../components/Skeleton';

const mockBookings = [
  { id: 'b1', client: 'Catherine M.', service: 'Glam Full Package', date: '2026-06-25', time: '10:00', status: 'upcoming', price: 450 },
  { id: 'b2', client: 'Sarah L.', service: 'Event Glam', date: '2026-06-26', time: '14:00', status: 'upcoming', price: 250 },
  { id: 'b3', client: 'Priya K.', service: 'Natural Glam', date: '2026-06-22', time: '09:00', status: 'completed', price: 300 },
  { id: 'b4', client: 'Amirah H.', service: 'Touch-up Session', date: '2026-06-20', time: '11:00', status: 'completed', price: 150 },
  { id: 'b5', client: 'Nina W.', service: 'Event Glam', date: '2026-06-18', time: '16:00', status: 'cancelled', price: 250 },
  { id: 'b6', client: 'Siti Z.', service: 'Bridal Package', date: '2026-06-15', time: '08:00', status: 'completed', price: 800 },
  { id: 'b7', client: 'Linda K.', service: 'Editorial Shoot', date: '2026-06-12', time: '13:00', status: 'completed', price: 500 },
  { id: 'b8', client: 'Maya R.', service: 'Glam Full Package', date: '2026-06-10', time: '11:00', status: 'completed', price: 450 },
  { id: 'b9', client: 'June T.', service: 'Natural Glam', date: '2026-06-08', time: '10:00', status: 'completed', price: 300 },
  { id: 'b10', client: 'Farah D.', service: 'Event Glam', date: '2026-06-05', time: '15:00', status: 'completed', price: 250 },
  { id: 'b11', client: 'Zara N.', service: 'Bridal Package', date: '2026-06-02', time: '07:00', status: 'completed', price: 800 },
  { id: 'b12', client: 'Aina M.', service: 'Touch-up Session', date: '2026-05-28', time: '12:00', status: 'cancelled', price: 150 },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'upcoming': return <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full">Upcoming</span>;
    case 'completed': return <span className="px-2 py-0.5 text-[10px] font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">Completed</span>;
    case 'cancelled': return <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full">Cancelled</span>;
    default: return null;
  }
};

export default function DashboardArtist() {
  const [stats] = useState({ bookings: 24, revenue: 8400, rating: 4.8, reviews: 127 });
  const [loading, setLoading] = useState(true);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsPerPage, setBookingsPerPage] = useState(5);
  const [bookingsFilter, setBookingsFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = mockBookings.filter((b) => bookingsFilter === 'all' || b.status === bookingsFilter);
  const totalPages = Math.ceil(filtered.length / bookingsPerPage);
  const paged = filtered.slice((bookingsPage - 1) * bookingsPerPage, bookingsPage * bookingsPerPage);

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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Artist Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Calendar, label: 'Total Bookings', value: stats.bookings, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
          { icon: DollarSign, label: 'Revenue', value: `MYR ${stats.revenue}`, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
          { icon: Star, label: 'Rating', value: stats.rating, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
          { icon: TrendingUp, label: 'Reviews', value: stats.reviews, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
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

      {/* Recent Activity */}
      <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New booking', detail: 'Bridal Makeup - June 28', time: '2 hours ago' },
            { action: 'Review received', detail: '5 stars from Sarah', time: '1 day ago' },
            { action: 'Payment released', detail: 'MYR 450 - Bridal Package', time: '3 days ago' },
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

      {/* Bookings Table with Pagination */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="p-5 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-bold text-gray-900 dark:text-white">All Bookings</h2>
            <div className="flex items-center gap-3">
              {/* Status filter */}
              <div className="flex gap-1 bg-gray-100 dark:bg-neutral-800 rounded-lg p-0.5">
                {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => { setBookingsFilter(f); setBookingsPage(1); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                      bookingsFilter === f
                        ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {/* Page size selector */}
              <select
                value={bookingsPerPage}
                onChange={(e) => { setBookingsPerPage(Number(e.target.value)); setBookingsPage(1); }}
                className="px-3 py-1.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={25}>25 / page</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-neutral-800">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Client</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Service</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-neutral-800">
              {paged.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{b.client}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{b.service}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{b.date} {b.time}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">RM {b.price}</td>
                  <td className="px-5 py-3">{statusBadge(b.status)}</td>
                  <td className="px-5 py-3">
                    {b.status === 'upcoming' && (
                      <button className="text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 mr-2">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {b.status === 'upcoming' && (
                      <button className="text-xs font-medium text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Numbered Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page {bookingsPage} of {totalPages} ({filtered.length} total)
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setBookingsPage((p) => Math.max(1, p - 1))}
                disabled={bookingsPage <= 1}
                className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setBookingsPage(p)}
                  className={`min-w-[2.25rem] h-9 text-sm font-medium rounded-xl transition-all ${
                    p === bookingsPage
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setBookingsPage((p) => Math.min(totalPages, p + 1))}
                disabled={bookingsPage >= totalPages}
                className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
