import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Sparkles, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SocialLoginButtons from "../components/SocialLoginButtons";
import { roleLabels, roleDescriptions } from "../lib/constants";

export default function Register() {
  const { role: paramRole } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState<"role" | "form">(
    paramRole ? "form" : "role",
  );
  const [role, setRole] = useState<"client" | "artist" | "studio">(
    (paramRole as any) || "client",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const selectRole = (r: "client" | "artist" | "studio") => {
    setRole(r);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const result = await register({
      ...form,
      role,
      location: "",
      area: "",
      specialties: [],
      languages: [],
      portfolio: [],
    });
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Registration failed");
      return;
    }

    setSuccess(
      `Account created! A welcome email has been sent to ${form.email}`,
    );
    setTimeout(() => navigate("/profile"), 2000);
  };

  if (step === "role") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Join Leish!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Choose how you want to use Leish!
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {(["client", "artist", "studio"] as const).map((r) => (
              <button
                key={r}
                onClick={() => selectRole(r)}
                className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-700 hover:shadow-lg transition-all text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {r === "client" ? (
                    <User className="w-6 h-6 text-white" />
                  ) : r === "artist" ? (
                    <Sparkles className="w-6 h-6 text-white" />
                  ) : (
                    <Building2 className="w-6 h-6 text-white" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {roleLabels[r]}
                </h3>
                <p className="text-sm text-gray-400">{roleDescriptions[r]}</p>
              </button>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Join Leish! and discover Malaysia's finest beauty artists
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 sm:p-8">
          <button
            onClick={() => setStep("role")}
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name *
              </label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address *
              </label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number *
              </label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="At least 8 chars"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6">
            <SocialLoginButtons mode="register" />
          </div>

          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
