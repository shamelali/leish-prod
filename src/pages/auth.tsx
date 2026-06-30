import { AuthView } from "@neondatabase/auth/react/ui";
import { useParams } from "react-router-dom";

export function Auth() {
  const { pathname } = useParams();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-md mx-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 p-6">
        <AuthView pathname={pathname} />
      </div>
    </div>
  );
}
