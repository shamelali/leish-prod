import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-gray-200 dark:text-neutral-800">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
        Page not found
      </h2>
      <p className="text-gray-400 mt-2 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all"
      >
        <Home className="w-4 h-4" /> Go Home
      </Link>
    </div>
  );
}
