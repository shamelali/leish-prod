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
  Linking,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { studiosApi, artistsApi } from '../services/api';
import { StudioDetail, Artist } from '../types/api';

const { width } = Dimensions.get('window');

export default function StudioDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const studioId = params.id as string;
  const [studio, setStudio] = useState<StudioDetail | null>(null);
  const [studioArtists, setStudioArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudio();
  }, [studioId]);

  const loadStudio = async () => {
    try {
      const data = await studiosApi.getById(studioId);
      setStudio(data);
      if (data.artists) {
        setStudioArtists(data.artists);
      }
    } catch {
      try {
        const allStudios = await studiosApi.getAll();
        const found = allStudios.find((s) => s.id === studioId);
        if (found) {
          setStudio(found as StudioDetail);
        } else {
          setError('Studio not found');
        }
      } catch {
        setError('Failed to load studio');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    Linking.openURL('tel:+601137633788');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/601137633788');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !studio) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error || 'Studio not found'}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: studio.image }} style={styles.heroImage} />
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name}>{studio.name}</Text>
          <Text style={styles.location}>📍 {studio.location}, {studio.area}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>★ {studio.rating}</Text>
            <Text style={styles.reviewCount}>({studio.reviewCount} reviews)</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>★ {studio.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>RM {studio.price}</Text>
              <Text style={styles.statLabel}>From /hr</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{studio.artistsCount}</Text>
              <Text style={styles.statLabel}>Artists</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{studio.reviewCount}+</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{studio.bio}</Text>
            <View style={styles.categoryTags}>
              {studio.categories.map((cat, i) => (
                <View key={i} style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>

          {studioArtists.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Our Team</Text>
              {studioArtists.map((artist) => (
                <TouchableOpacity
                  key={artist.id}
                  style={styles.artistRow}
                  onPress={() => router.push(`/screens/ArtistDetailScreen?artistId=${artist.id}`)}
                >
                  <Image source={{ uri: artist.image }} style={styles.artistAvatar} />
                  <View style={styles.artistInfo}>
                    <Text style={styles.artistName}>{artist.name}</Text>
                    <Text style={styles.artistMeta}>
                      ★ {artist.rating} · RM {artist.price}/hr
                    </Text>
                  </View>
                  <Text style={styles.artistArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
              <Text style={styles.contactButtonText}>📞 Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactButton, styles.whatsappButton]}
              onPress={handleWhatsApp}
            >
              <Text style={[styles.contactButtonText, styles.whatsappText]}>
                💬 Chat on WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  heroImage: {
    width,
    height: 300,
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
  backArrowText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  categoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryTagText: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '500',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  artistAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  artistMeta: {
    fontSize: 13,
    color: '#666',
  },
  artistArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  contactButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappButton: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  whatsappText: {
    color: '#16a34a',
  },
});
