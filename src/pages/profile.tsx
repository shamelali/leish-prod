import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Star, Clock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile, cancelBooking } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please log in</h2>
        <p className="text-gray-500">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
            <div className="mt-4 text-xs text-gray-400">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
              >
                {editing ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="space-y-4">
              {[
                { icon: User, label: 'Name', value: form.name, key: 'name' as const },
                { icon: Mail, label: 'Email', value: form.email, key: 'email' as const },
                { icon: Phone, label: 'Phone', value: form.phone, key: 'phone' as const },
              ].map(({ icon: Icon, label, value, key }) => (
                <div key={key} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{label}</p>
                    {editing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full bg-transparent text-gray-900 dark:text-white font-medium focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {editing && (
              <button
                onClick={() => { setEditing(false); setForm({ name: user.name, email: user.email, phone: user.phone }); }}
                className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Bookings</h3>
            {user.bookings.length === 0 ? (
              <p className="text-sm text-gray-400">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {user.bookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {b.artistName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{b.artistName}</p>
                      <p className="text-xs text-gray-400">{b.service}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        b.status === 'confirmed' ? 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400' :
                        b.status === 'completed' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' :
                        'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                      }`}>
                        {b.status}
                      </span>
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="block mt-2 text-xs text-red-500 hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
