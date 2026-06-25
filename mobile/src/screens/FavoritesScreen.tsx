import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '../context/FavoritesContext';
import { artistsApi } from '../services/api';
import { ArtistCard } from '../components/ArtistCard';

export default function FavoritesScreen() {
  const { favorites, isLoading: favsLoading } = useFavorites();

  const { data: allArtists = [] } = useQuery({
    queryKey: ['artists'],
    queryFn: () => artistsApi.getAll(),
    enabled: favorites.length > 0,
  });

  const artists = useMemo(
    () => allArtists.filter((a) => favorites.includes(a.id)),
    [allArtists, favorites]
  );

  const renderArtist = ({ item }: { item: import('../types/api').Artist }) => (
    <ArtistCard artist={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      <FlatList
        data={artists}
        renderItem={renderArtist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyText}>
              {favsLoading ? 'Loading...' : 'No favorite artists yet'}
            </Text>
            <Text style={styles.emptySubtext}>
              Tap the heart on artists you love!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  list: {
    padding: 16,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
});