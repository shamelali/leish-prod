import { Suspense } from "react";
import ArtistsPageClient from "./ArtistsPageClient";

export default function ArtistsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading artists...</p>
        </div>
      </main>
    }>
      <ArtistsPageClient />
    </Suspense>
  );
}
