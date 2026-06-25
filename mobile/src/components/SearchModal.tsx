import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { artistsApi } from '../services/api';
import { Artist } from '../types/api';
import { Ionicons } from '@expo/vector-icons';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => artistsApi.search(query),
    enabled: query.length >= 2,
  });

  const handleSelect = useCallback(
    (artist: Artist) => {
      onClose();
      setQuery('');
      router.push(`/screens/ArtistDetailScreen?artistId=${artist.id}`);
    },
    [onClose, router]
  );

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.inputContainer}>
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Search artists..."
                placeholderTextColor="#999"
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={handleClear}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#6366f1" />
            </View>
          )}

          {!isLoading && query.length >= 2 && results.length === 0 && (
            <View style={styles.centered}>
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text style={styles.noResults}>No artists found</Text>
            </View>
          )}

          {query.length < 2 && (
            <View style={styles.centered}>
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text style={styles.hint}>Type at least 2 characters to search</Text>
            </View>
          )}

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultMeta}>
                    ★ {item.rating} · {item.location}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.resultsList}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: Platform.OS === 'ios' ? 60 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 8,
  },
  cancelButton: {
    marginLeft: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  resultMeta: {
    fontSize: 13,
    color: '#666',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  hint: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
    textAlign: 'center',
  },
});
