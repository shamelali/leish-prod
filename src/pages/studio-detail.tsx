import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ArrowLeft, Users } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import Skeleton from '../components/Skeleton';

export default function StudioDetail() {
  const { id } = useParams<{ id: string }>();
  const [studio, setStudio] = useState<any>(null);
  const [artists, setArtists] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/studios/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setStudio(data.studio);
        setArtists(data.artists);
        setServices(data.services);
        setReviews(data.reviews);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-96 rounded-2xl mb-8" />
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-96" />
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Studio not found</h2>
        <Link to="/studios" className="text-rose-600 hover:underline mt-4 inline-block">Back to studios</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/studios" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to studios
      </Link>

      <div className="relative rounded-2xl overflow-hidden mb-8">
        <ImageWithFallback src={studio.image} alt={studio.name} className="w-full aspect-[2/1] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold text-white">{studio.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{studio.location}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{artists.length} artists</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{studio.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-lg font-bold text-gray-900 dark:text-white">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              {studio.rating}
            </div>
            <span className="text-sm text-gray-400">({studio.review_count} reviews)</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Artists</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {artists.map((a: any) => (
                <Link key={a.id} to={`/artists/${a.id}`} className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 transition-all">
                  <ImageWithFallback src={a.image} alt={a.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{a.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {a.rating}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Services</h2>
            <div className="space-y-2">
              {services.map((service: any) => (
                <div key={service.id} className="flex justify-between items-center p-4 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{service.name}</p>
                    <p className="text-sm text-gray-400">{service.duration}</p>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">MYR {service.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review.id} className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{review.author}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 sticky top-24 h-fit">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Studio Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Artists</span>
              <span className="font-medium text-gray-900 dark:text-white">{artists.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Services</span>
              <span className="font-medium text-gray-900 dark:text-white">{services.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rating</span>
              <span className="font-medium text-gray-900 dark:text-white">{studio.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
