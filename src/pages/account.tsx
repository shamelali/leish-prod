import { useParams } from 'react-router-dom';

export default function Account() {
  const { pathname } = useParams<{ pathname: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>
        <p className="text-center text-sm text-gray-400">
          Account management page: {pathname}
        </p>
      </div>
    </div>
  );
}
