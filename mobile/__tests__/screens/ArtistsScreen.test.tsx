import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ArtistsScreen from '../../src/screens/ArtistsScreen';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  Stack: { Screen: () => null },
}));

jest.mock('../../src/services/api', () => ({
  artistsApi: {
    getAll: jest.fn().mockResolvedValue([]),
    search: jest.fn().mockResolvedValue([]),
  },
  categoriesApi: {
    getAll: jest.fn().mockResolvedValue([]),
  },
}));

jest.mock('../../src/context/AuthContext', () => ({
  useAuth: () => ({ user: null, isLoading: false }),
}));

jest.mock('../../src/context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    isFavorite: () => false,
    toggleFavorite: jest.fn(),
  }),
}));

describe('ArtistsScreen', () => {
  it('renders without crashing', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ArtistsScreen />
      </QueryClientProvider>
    );

    expect(getByText('Artists')).toBeTruthy();
  });
});
