import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, Heart, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ImageWithFallback from '../components/ImageWithFallback';
import Skeleton from '../components/Skeleton';

export default function Artists() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('rating');
  const [artists, setArtists] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationMode, setPaginationMode] = useState<'load-more' | 'numbered'>('load-more');
  const { isFavorite, toggleFavorite } = useFavorites();
  const PER_PAGE = 6;

  const fetchArtists = useCallback(async (pageNum: number, append: boolean) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    const params = new URLSearchParams({ sort, page: String(pageNum), limit: String(PER_PAGE) });
    if (search) params.set('search', search);
    if (category && category !== 'all') params.set('category', category);
    try {
      const r = await fetch(`/api/artists?${params}`);
      const data = await r.json();
      if (append) {
        setArtists((prev) => [...prev, ...data.artists]);
      } else {
        setArtists(data.artists);
      }
      setCategories(data.categories);
      setTotalPages(data.pagination.totalPages);
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [sort, category, search, PER_PAGE]);

  useEffect(() => {
    setPage(1);
    fetchArtists(1, false);
  }, [sort, category]);

  const handleSearch = () => {
    setPage(1);
    fetchArtists(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArtists(nextPage, true);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchArtists(newPage, false);
  };

  const totalItems = totalPages * PER_PAGE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Artists</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Discover top makeup artists near you</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search artists, locations..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent text-sm text-gray-700 dark:text-gray-200 focus:outline-none">
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low</option>
            <option value="price-high">Price: High</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {artists.length} artist{artists.length !== 1 ? 's' : ''} shown
        </p>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 rounded-lg p-0.5">
          <button
            onClick={() => { setPaginationMode('load-more'); setPage(1); fetchArtists(1, false); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              paginationMode === 'load-more'
                ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Load More
          </button>
          <button
            onClick={() => { setPaginationMode('numbered'); setPage(1); fetchArtists(1, false); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              paginationMode === 'numbered'
                ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Pages
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800">
              <Skeleton className="aspect-[4/5]" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist: any) => (
              <div key={artist.id} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl transition-all duration-300">
                <Link to={`/artists/${artist.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithFallback src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{artist.rating}</span>
                      <span className="text-[10px] text-gray-400">({artist.review_count})</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                      <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{artist.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => toggleFavorite(String(artist.id))}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isFavorite(String(artist.id))
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(String(artist.id)) ? 'fill-white' : ''}`} />
                </button>
                <Link to={`/artists/${artist.id}`}>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(artist.categories || []).slice(0, 3).map((cat: any, ci: number) => (
                        <span key={ci} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full">{cat.name}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">MYR {artist.price}</span>
                      </div>
                      <span className="text-sm font-medium text-rose-600 dark:text-rose-400">View Profile</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {paginationMode === 'load-more' && page < totalPages && (
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

          {paginationMode === 'numbered' && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 pb-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                let pageNum: number | string;
                const start = Math.max(1, page - 4);
                const end = Math.min(totalPages, start + 9);
                if (totalPages <= 10) {
                  pageNum = i + 1;
                } else {
                  const pages: (number | string)[] = [];
                  for (let p = start; p <= end; p++) pages.push(p);
                  pageNum = pages[i] ?? '';
                }
                return (
                  <button
                    key={String(pageNum)}
                    onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                    className={`w-10 h-10 text-sm font-medium rounded-xl transition-all ${
                      pageNum === page
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
