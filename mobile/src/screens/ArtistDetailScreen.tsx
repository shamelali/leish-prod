import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { artistsApi } from '../services/api';
import { paymentsApi } from '../services/user';
import { Artist, Service } from '../types/api';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

export default function ArtistDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const artistId = params.artistId as string;
  const { user, addBooking } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadArtist();
  }, [artistId]);

  const loadArtist = async () => {
    try {
      const data = await artistsApi.getById(artistId);
      if (data.services) {
        setServices(data.services);
        setArtist(data);
      } else {
        setArtist(data);
      }
    } catch {
      try {
        const allArtists = await artistsApi.getAll();
        const found = allArtists.find((a) => a.id === artistId);
        if (found) {
          setArtist(found);
          setServices(found.services ?? []);
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to book a service');
      return;
    }
    if (!selectedService) {
      Alert.alert('Select Service', 'Please select a service first');
      return;
    }

    setBookingLoading(true);
    try {
      addBooking({
        artistId: artistId,
        artistName: artist?.name ?? 'Artist',
        service: selectedService.name,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' }),
        price: selectedService.price,
      });

      const bookingId = `b${Date.now()}`;
      const result = await paymentsApi.createBill({
        bookingId,
        amount: selectedService.price,
        description: `${selectedService.name} with ${artist?.name}`,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });

      if (result.bill?.url) {
        router.push(
          `/screens/PaymentScreen?url=${encodeURIComponent(result.bill.url)}&bookingId=${bookingId}&paymentId=${result.payment?.id || ''}`
        );
      } else {
        Alert.alert('Booking Confirmed', `Your ${selectedService.name} booking with ${artist?.name} has been created.`);
        router.push('/(tabs)/profile');
      }
    } catch {
      Alert.alert('Booking Created', `Your ${selectedService?.name} booking with ${artist?.name} has been saved.`);
      router.push('/(tabs)/profile');
    } finally {
      setBookingLoading(false);
    }
  };

  const favorite = isFavorite(artistId);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  if (!artist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.notFoundText}>Artist not found</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: artist.image }} style={styles.heroImage} />
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.favButton, favorite && styles.favButtonActive]}
          onPress={() => toggleFavorite(artistId)}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={24}
            color={favorite ? '#ef4444' : '#fff'}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name}>{artist.name}</Text>
          <Text style={styles.location}>
            📍 {artist.location}
            {artist.area ? `, ${artist.area}` : ''}
          </Text>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>★ {artist.rating}</Text>
            <Text style={styles.reviewCount}>({artist.reviewCount} reviews)</Text>
            {artist.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#059669" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>★ {artist.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{artist.yearsExperience}+</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>RM {artist.price}</Text>
              <Text style={styles.statLabel}>From</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{artist.bio}</Text>
            {artist.languages && (
              <Text style={styles.languages}>
                🗣️ Speaks {artist.languages.join(', ')}
              </Text>
            )}
            <Text style={styles.responseTime}>⏱ {artist.responseTime}</Text>
          </View>

          {services.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Services</Text>
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    selectedService?.id === service.id && styles.serviceCardSelected,
                  ]}
                  onPress={() => setSelectedService(service)}
                >
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceDuration}>⏱ {service.duration}</Text>
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                  </View>
                  <View style={styles.servicePrice}>
                    <Text style={styles.price}>RM {service.price}</Text>
                    {service.popular && (
                      <Text style={styles.popularTag}>Popular</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {artist.portfolio && artist.portfolio.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Portfolio</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {artist.portfolio.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.portfolioImage}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {(artist.reviews ?? []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {(artist.reviews ?? []).map((review, index) => (
                <View key={index} style={styles.reviewCard}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <Text style={styles.reviewRating}>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </Text>
                  <Text style={styles.reviewText}>{review.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {selectedService && (
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerService}>{selectedService.name}</Text>
            <Text style={styles.footerPrice}>RM {selectedService.price}</Text>
          </View>
          <TouchableOpacity
            style={[styles.bookButton, bookingLoading && styles.bookButtonDisabled]}
            onPress={handleBook}
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.bookButtonText}>Book Now</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  heroImage: {
    width,
    height: 350,
    backgroundColor: '#e5e7eb',
  },
  backArrow: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 8,
  },
  languages: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  responseTime: {
    fontSize: 14,
    color: '#666',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  serviceInfo: {
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
  servicePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
  },
  popularTag: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  portfolioImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 14,
    color: '#f59e0b',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerInfo: {},
  footerService: {
    fontSize: 14,
    color: '#666',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  bookButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    opacity: 0.6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
