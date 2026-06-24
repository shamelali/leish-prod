"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, MapPin, Building2, Upload, Users, Check, ChevronRight, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/artists";

export default function RegisterStudioPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    studioName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    area: "",
    address: "",
    artistCount: "",
    categories: [] as string[],
    description: "",
    website: "",
    instagram: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleCategory = (catId: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter((c) => c !== catId)
        : [...prev.categories, catId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError("You must agree to the Terms of Service."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/register/studio/success");
  };

  const canProceed1 = form.studioName && form.ownerName && form.email && form.phone && form.password && form.confirmPassword;
  const canProceed2 = form.location && form.area && form.artistCount && form.categories.length > 0;

  const inputCls = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const plainInputCls = "w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Register Your Studio</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">List your studio and team of artists on Leish!</p>
          </div>

          {/* Role chooser */}
          <div className="grid grid-cols-3 gap-2 mb-6 animate-fade-in-up delay-75">
            <Link href="/register" className="flex flex-col items-center gap-1.5 px-2 py-3 bg-white dark:bg-neutral-800 border-2 border-gray-100 dark:border-neutral-700 hover:border-rose-300 dark:hover:border-rose-700 rounded-xl text-center transition-all">
              <User className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Client</p>
            </Link>
            <Link href="/register/artist" className="flex flex-col items-center gap-1.5 px-2 py-3 bg-white dark:bg-neutral-800 border-2 border-gray-100 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 rounded-xl text-center transition-all">
              <Camera className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Artist</p>
            </Link>
            <div className="flex flex-col items-center gap-1.5 px-2 py-3 bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-500 rounded-xl text-center">
              <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <p className="text-xs font-semibold text-gray-900 dark:text-white">Studio</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up delay-100">
            {[
              { num: 1, label: "Account" },
              { num: 2, label: "Studio" },
              { num: 3, label: "Review" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  step === s.num ? "bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                    : step > s.num ? "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-gray-500"
                }`}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20">
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300 dark:text-neutral-600 mx-1" />}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 animate-fade-in-up delay-200">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Account Details</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Studio owner / manager information</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.studioName} onChange={(e) => handleChange("studioName", e.target.value)} placeholder="Glam Studio KL" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Owner / Manager Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.ownerName} onChange={(e) => handleChange("ownerName", e.target.value)} placeholder="Your full name" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="hello@yourstudio.com" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+60 12-345 6789" className={inputCls} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Min 8 chars" className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm</label>
                      <input type="password" value={form.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} placeholder="Re-enter" className={plainInputCls} required />
                    </div>
                  </div>

                  <button type="button" onClick={() => canProceed1 ? setStep(2) : setError("Please fill in all fields.")} className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Studio Details</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Tell us about your studio</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State / Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="Selangor" className={inputCls} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Area / City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={form.area} onChange={(e) => handleChange("area", e.target.value)} placeholder="Petaling Jaya" className={inputCls} required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Address</label>
                    <input type="text" value={form.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Unit, Building, Street" className={plainInputCls} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Number of Artists</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select value={form.artistCount} onChange={(e) => handleChange("artistCount", e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all appearance-none" required>
                        <option value="">Select</option>
                        <option value="1-2">1-2 artists</option>
                        <option value="3-5">3-5 artists</option>
                        <option value="6-10">6-10 artists</option>
                        <option value="10+">10+ artists</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)} className={`px-3 py-2 text-xs font-medium rounded-xl border-2 transition-all ${form.categories.includes(cat.id) ? "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" : "border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-rose-200 dark:hover:border-rose-800"}`}>
                          {cat.icon} {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Description</label>
                    <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Describe your studio, atmosphere, and what makes it special..." rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Photos</label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl p-8 text-center hover:border-rose-300 dark:hover:border-rose-800 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Upload studio interior & exterior photos</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG up to 5MB each</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Website (optional)</label>
                      <input type="url" value={form.website} onChange={(e) => handleChange("website", e.target.value)} placeholder="https://..." className={plainInputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Instagram (optional)</label>
                      <input type="text" value={form.instagram} onChange={(e) => handleChange("instagram", e.target.value)} placeholder="@yourstudio" className={plainInputCls} />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="button" onClick={() => canProceed2 ? setStep(3) : setError("Please fill in location, artist count, and select specialties.")} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                      Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Review & Submit</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Confirm your studio details</p>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Account</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Studio:</strong> {form.studioName}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Owner:</strong> {form.ownerName}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Email:</strong> {form.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Studio</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Location:</strong> {form.location}, {form.area}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Artists:</strong> {form.artistCount}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Specialties:</strong> {form.categories.map((c) => categories.find((cat) => cat.id === c)?.name).join(", ")}</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? "bg-rose-500 border-rose-500" : "border-gray-300 dark:border-neutral-600 group-hover:border-rose-300 dark:group-hover:border-rose-700"}`}>
                        {agreed && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      I agree to the <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Studio Terms of Service</a> and <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Privacy Policy</a>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="submit" disabled={loading || !agreed} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Building2 className="w-4 h-4" /> Submit Studio Application</>}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <Link href="/register" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Client Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/register/artist" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Artist Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Already have an account?</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
