import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { artistsApi } from '../services/api';
import { Artist } from '../types/api';
import { ArtistCard } from '../components/ArtistCard';

export default function FavoritesScreen() {
  const { favorites, isLoading } = useFavorites();
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    loadFavoriteArtists();
  }, [favorites]);

  const loadFavoriteArtists = async () => {
    if (favorites.length === 0) return;
    try {
      const allArtists = await artistsApi.getAll();
      const favoriteArtists = allArtists.filter(artist => favorites.includes(artist.id));
      setArtists(favoriteArtists);
    } catch (error) {
      console.error('Failed to load favorite artists:', error);
    }
  };

  const renderArtist = ({ item }: { item: Artist }) => (
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
              {isLoading ? 'Loading...' : 'No favorite artists yet'}
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