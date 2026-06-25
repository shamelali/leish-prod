import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, ChevronDown, Search, X } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import Skeleton from '../components/Skeleton';

export default function Studios() {
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const PER_PAGE = 6;

  const fetchStudios = useCallback(async (pageNum: number, append: boolean) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    const params = new URLSearchParams({ page: String(pageNum), limit: String(PER_PAGE) });
    if (search) params.set('search', search);
    try {
      const r = await fetch(`/api/studios?${params}`);
      const data = await r.json();
      if (append) {
        setStudios((prev) => [...prev, ...data.studios]);
      } else {
        setStudios(data.studios);
      }
      setTotalPages(data.pagination.totalPages);
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [search, PER_PAGE]);

  useEffect(() => {
    setPage(1);
    fetchStudios(1, false);
  }, [search]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStudios(nextPage, true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800">
              <Skeleton className="aspect-video" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Studios</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Premium beauty studios near you</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search studios, locations..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {studios.length} studio{studios.length !== 1 ? 's' : ''} found
      </p>

      {studios.length === 0 ? (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-gray-200 dark:text-neutral-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No studios found</h2>
          <p className="text-gray-400">Try adjusting your search.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio: any) => (
              <Link key={studio.id} to={`/studios/${studio.id}`} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback src={studio.image} alt={studio.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full text-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{studio.rating}</span>
                    <span className="text-[10px] text-gray-400">({studio.review_count})</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">{studio.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{studio.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{studio.artist_count} artists</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(studio.categories || []).slice(0, 4).map((cat: any, ci: number) => (
                      <span key={ci} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full">{cat.name}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {page < totalPages && (
            <div className="flex justify-center py-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-neutral-900 border-2 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 dark:hover:border-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {loadingMore ? 'Loading...' : `Load More`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
