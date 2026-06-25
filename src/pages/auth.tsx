import { useParams } from 'react-router-dom';

export default function Auth() {
  const { pathname } = useParams<{ pathname: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {pathname === 'login' ? 'Welcome Back' : pathname === 'signup' ? 'Create Account' : pathname === 'otp' ? 'Verify OTP' : 'Auth'}
        </h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          {pathname === 'login' ? 'Sign in to your account' : pathname === 'signup' ? 'Join the Leish! community' : 'Enter verification code'}
        </p>
        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl text-sm text-rose-600 dark:text-rose-400 text-center">
          Neon Auth integration coming soon
        </div>
      </div>
    </div>
  );
}
