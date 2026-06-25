import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userApi } from '../services/user';
import { useAuth } from '../context/AuthContext';

interface ReviewFormProps {
  artistId: string;
  artistName: string;
  onSubmitted?: () => void;
}

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function ReviewForm({ artistId, artistName, onSubmitted }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={48} color="#22c55e" />
        <Text style={styles.successTitle}>Thank you for your review!</Text>
        <Text style={styles.successText}>
          Your feedback helps other clients find great artists.
        </Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating');
      return;
    }
    if (text.trim().length < 10) {
      Alert.alert('Review Too Short', 'Please write at least 10 characters');
      return;
    }

    setSubmitting(true);
    try {
      await userApi.submitReview({
        userId: user.id,
        artistId,
        rating,
        text: text.trim(),
        author: user.name,
      });
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chatbubble" size={20} color="#6366f1" />
        <Text style={styles.title}>Write a Review</Text>
      </View>

      <Text style={styles.label}>
        Your Rating <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color={star <= rating ? '#f59e0b' : '#d1d5db'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
        {rating > 0 && (
          <Text style={styles.ratingLabel}>{ratingLabels[rating]}</Text>
        )}
      </View>

      <Text style={styles.label}>Your Review</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={`Share your experience with ${artistName}...`}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      <Text style={styles.charCount}>
        {text.length < 10
          ? `${10 - text.length} more characters needed`
          : '✓ Minimum reached'}
      </Text>

      <TouchableOpacity
        style={[
          styles.submitButton,
          (submitting || rating === 0 || text.trim().length < 10) &&
            styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={submitting || rating === 0 || text.trim().length < 10}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.submitText}>Submit Review</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginBottom: 24,
  },
  successContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
  },
  successText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  star: {
    marginRight: 4,
  },
  ratingLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#1a1a1a',
    minHeight: 100,
    marginBottom: 4,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
