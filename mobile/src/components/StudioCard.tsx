import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Studio } from '../types/api';

interface StudioCardProps {
  studio: Studio;
}

export const StudioCard: React.FC<StudioCardProps> = ({ studio }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/screens/StudioDetailScreen?id=${encodeURIComponent(studio.id)}`)}
    >
      <Image source={{ uri: studio.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{studio.name}</Text>
        <Text style={styles.location}>{studio.location}, {studio.area}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>★ {studio.rating}</Text>
          <Text style={styles.reviewCount}>({studio.reviewCount} reviews)</Text>
        </View>
        <Text style={styles.artists}>{studio.artistsCount} artists</Text>
        <Text style={styles.price}>From RM {studio.price}/hr</Text>
      </View>
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
    height: 180,
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
  artists: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
});