import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, BadgeCheck, Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import ImageWithFallback from '../components/ImageWithFallback';
import ReviewForm from '../components/ReviewForm';
import Skeleton from '../components/Skeleton';

export default function ArtistDetail() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/artists/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setArtist(data.artist);
        setServices(data.services);
        setReviews(data.reviews);
        setSimilar(data.similar);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Artist not found</h2>
        <Link to="/artists" className="text-rose-600 hover:underline mt-4 inline-block">Back to artists</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/artists" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to artists
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative rounded-2xl overflow-hidden">
            <ImageWithFallback src={artist.image} alt={artist.name} className="w-full aspect-[3/2] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
                  <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{artist.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{artist.response_time || 'Fast response'}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(String(artist.id))}
                  className={`p-3 rounded-full transition-all ${
                    isFavorite(String(artist.id))
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(String(artist.id)) ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-gray-900 dark:text-white">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                {artist.rating}
              </div>
              <p className="text-xs text-gray-400">{artist.review_count} reviews</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{artist.experience}+</div>
              <p className="text-xs text-gray-400">Years exp.</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">MYR {artist.price}</div>
              <p className="text-xs text-gray-400">Starting from</p>
            </div>
            {artist.verified && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                <BadgeCheck className="w-4 h-4" /> Verified
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{artist.bio}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Services</h2>
            <div className="space-y-3">
              {services.map((service: any) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedService === String(service.id)
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30'
                      : 'border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-rose-200 dark:hover:border-rose-800'
                  }`}
                  onClick={() => setSelectedService(String(service.id))}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">MYR {service.price}</p>
                      {service.popular && (
                        <span className="text-[10px] font-medium text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                  </div>
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
                    <span className="ml-auto text-xs text-gray-400">{review.service}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {user && <ReviewForm artistId={id!} artistName={artist?.name || ''} services={services.map((s: any) => ({ id: String(s.id), name: s.name }))} />}
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 sticky top-24">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Book Appointment</h3>
            {!user ? (
              <p className="text-sm text-gray-400 mb-4">Please log in to book an appointment.</p>
            ) : !selectedService ? (
              <p className="text-sm text-gray-400 mb-4">Select a service above to book.</p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selected service: {services.find((s) => String(s.id) === selectedService)?.name}
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all">
                  Proceed to Book
                </button>
              </div>
            )}
          </div>

          {similar.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Similar Artists</h3>
              <div className="space-y-3">
                {similar.map((s: any) => (
                  <Link key={s.id} to={`/artists/${s.id}`} className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 transition-all">
                    <ImageWithFallback src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {s.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
