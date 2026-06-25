import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Text } from 'react-native';

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

jest.mock('../../src/components/ArtistCard', () => ({
  ArtistCard: () => null,
}));

jest.mock('../../src/components/SearchModal', () => () => null);

import ArtistsScreen from '../../src/screens/ArtistsScreen';

describe('ArtistsScreen', () => {
  it('renders without crashing', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const { findByText } = await render(
      <QueryClientProvider client={queryClient}>
        <ArtistsScreen />
      </QueryClientProvider>
    );

    expect(await findByText('Artists')).toBeTruthy();
  });
});
