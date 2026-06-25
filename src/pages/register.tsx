import { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, Building2, Sparkles, Globe, Image, Check, ChevronDown, X, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SocialLoginButtons from '../components/SocialLoginButtons';
import {
  malaysianStates, malaysiaDistricts, southeastAsianLanguages, specialties,
  roleLabels, roleDescriptions,
} from '../lib/constants';

export default function Register() {
  const { role: paramRole } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState<'role' | 'form'>(paramRole ? 'form' : 'role');
  const [role, setRole] = useState<'client' | 'artist' | 'studio'>((paramRole as any) || 'client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    area: '',
    specialties: [] as string[],
    languages: [] as string[],
    portfolio: [] as string[],
  });
  const [customSpecialty, setCustomSpecialty] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [langSearch, setLangSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (dataUrl: string): Promise<string> => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: dataUrl }),
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url;
    } catch {
      return dataUrl;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploads: string[] = [];
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        });
        const url = await uploadToCloudinary(dataUrl);
        if (!form.portfolio.includes(url)) {
          uploads.push(url);
        }
      }
    }
    if (uploads.length > 0) {
      setForm((prev) => ({ ...prev, portfolio: [...prev.portfolio, ...uploads] }));
    }
    if (e.target) e.target.value = '';
  };

  const selectRole = (r: 'client' | 'artist' | 'studio') => {
    setRole(r);
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const result = await register({ ...form, role });
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Registration failed');
      return;
    }

    setSuccess(`Account created! A welcome email has been sent to ${form.email}`);
    setTimeout(() => navigate('/profile'), 2000);
  };

  const toggleArrayItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const addCustomSpecialty = () => {
    const s = customSpecialty.trim();
    if (s && !form.specialties.includes(s)) {
      setForm({ ...form, specialties: [...form.specialties, s] });
    }
    setCustomSpecialty('');
  };

  const addPortfolioUrl = () => {
    const url = portfolioUrl.trim();
    if (url && url.match(/^https?:\/\/.+/) && !form.portfolio.includes(url)) {
      setForm({ ...form, portfolio: [...form.portfolio, url] });
    }
    setPortfolioUrl('');
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Join Leish!</h1>
            <p className="text-gray-500 dark:text-gray-400">Choose how you want to use Leish!</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {(['client', 'artist', 'studio'] as const).map((r) => (
              <button
                key={r}
                onClick={() => selectRole(r)}
                className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-700 hover:shadow-lg transition-all text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {r === 'client' ? <User className="w-6 h-6 text-white" /> :
                   r === 'artist' ? <Sparkles className="w-6 h-6 text-white" /> :
                   <Building2 className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{roleLabels[r]}</h3>
                <p className="text-sm text-gray-400">{roleDescriptions[r]}</p>
              </button>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-rose-500 hover:text-rose-600 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }

  const districts = malaysiaDistricts[form.location] || [];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {role === 'artist' ? 'Artist Sign Up' : role === 'studio' ? 'Studio Sign Up' : 'Create Account'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {role === 'artist' ? 'Share your talent with clients across Malaysia' :
             role === 'studio' ? 'List your studio and team of artists on Leish!' :
             'Join Leish! and discover Malaysia\'s finest beauty artists'}
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 sm:p-8">
          <button
            onClick={() => setStep('role')}
            className="text-sm text-gray-400 hover:text-rose-500 mb-6 flex items-center gap-1 transition-colors"
          >
            &larr; Change role
          </button>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-xl text-sm text-green-600 dark:text-green-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Siti Nurhaliza"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+60 12-345 6789"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="At least 8 chars"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Location / Area */}
            {role !== 'client' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State / Location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value, area: '' })}
                      className="w-full pl-9 pr-8 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">Select state</option>
                      {malaysianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Area / City</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      disabled={!form.location}
                      className="w-full pl-9 pr-8 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all appearance-none disabled:opacity-50"
                    >
                      <option value="">Select area</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Specialties */}
            {role !== 'client' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Specialties</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {specialties.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, specialties: toggleArrayItem(form.specialties, s) })}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        form.specialties.includes(s)
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-neutral-700 hover:border-rose-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {/* Custom specialty input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSpecialty}
                    onChange={(e) => setCustomSpecialty(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomSpecialty(); } }}
                    placeholder="Add custom specialty..."
                    className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addCustomSpecialty}
                    disabled={!customSpecialty.trim()}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-50 transition-all"
                  >
                    Add
                  </button>
                </div>
                {form.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.specialties.filter((s) => !specialties.includes(s)).map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs rounded-full">
                        {s}
                        <button type="button" onClick={() => setForm({ ...form, specialties: form.specialties.filter((x) => x !== s) })}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Languages */}
            {role !== 'client' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Languages</label>
                <div className="relative mb-2">
                  <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700">
                  {southeastAsianLanguages
                    .filter((l) => l.toLowerCase().includes(langSearch.toLowerCase()))
                    .map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setForm({ ...form, languages: toggleArrayItem(form.languages, l) })}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          form.languages.includes(l)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white dark:bg-neutral-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-neutral-600 hover:border-blue-300'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                </div>
                {form.languages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.languages.map((l) => (
                      <span key={l} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        {l}
                        <button type="button" onClick={() => setForm({ ...form, languages: form.languages.filter((x) => x !== l) })}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Portfolio Images */}
            {(role === 'artist' || role === 'studio') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Portfolio Images</label>

                {/* File upload */}
                <div className="mb-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-500 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    Upload photos from device
                  </button>
                </div>

                {/* URL input */}
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <Image className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPortfolioUrl(); } }}
                      placeholder="Or paste an image URL..."
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addPortfolioUrl}
                    disabled={!portfolioUrl.trim()}
                    className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-50 transition-all"
                  >
                    Add
                  </button>
                </div>
                {form.portfolio.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {form.portfolio.map((url, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={url}
                          alt={`Portfolio ${i + 1}`}
                          className="w-full aspect-square object-cover rounded-lg border border-gray-200 dark:border-neutral-700"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150/e2e8f0/94a3b8?text=Image'; }}
                        />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, portfolio: form.portfolio.filter((_, j) => j !== i) })}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6">
            <SocialLoginButtons mode="register" />
          </div>

          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-rose-500 hover:text-rose-600 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
