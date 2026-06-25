import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Artist } from '../types/api';
import { useFavorites } from '../context/FavoritesContext';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(artist.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/screens/ArtistDetailScreen?artistId=${artist.id}`)}
    >
      <Image source={{ uri: artist.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.location}>{artist.location}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>★ {artist.rating}</Text>
          <Text style={styles.reviewCount}>({artist.reviewCount})</Text>
        </View>
        <Text style={styles.price}>RM {artist.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.favoriteBtn, favorite && styles.favoriteActive]}
        onPress={async () => {
          await toggleFavorite(artist.id);
        }}
      >
        <Text style={styles.favoriteText}>{favorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteActive: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  favoriteText: {
    fontSize: 20,
  },
});