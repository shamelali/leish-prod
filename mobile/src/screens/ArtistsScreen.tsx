import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { artistsApi, categoriesApi } from '../services/api';
import { ArtistCard } from '../components/ArtistCard';
import SearchModal from '../components/SearchModal';
import { Category } from '../types/api';

export default function ArtistsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchVisible, setSearchVisible] = useState(false);

  const {
    data: artists = [],
    isLoading: artistsLoading,
    refetch: refetchArtists,
    isRefetching: artistsRefetching,
  } = useQuery({
    queryKey: ['artists', selectedCategory],
    queryFn: () => artistsApi.getAll(selectedCategory),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
  });

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryPill,
        selectedCategory === item.id && styles.categoryPillActive,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.id ? undefined : item.id)
      }
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.icon} {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderArtist = ({ item }: { item: import('../types/api').Artist }) => (
    <ArtistCard artist={item} />
  );

  if (artistsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Artists</Text>
        <TouchableOpacity
          onPress={() => setSearchVisible(true)}
          style={styles.searchButton}
        >
          <Ionicons name="search" size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      <FlatList
        data={artists}
        renderItem={renderArtist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={artistsRefetching}
            onRefresh={() => refetchArtists()}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No artists found</Text>
          </View>
        }
      />

      <SearchModal visible={searchVisible} onClose={() => setSearchVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
