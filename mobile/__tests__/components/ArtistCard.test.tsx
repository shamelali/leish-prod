import React from 'react';
import { render } from '@testing-library/react-native';
import { ArtistCard } from '../../src/components/ArtistCard';
import { FavoritesContext } from '../../src/context/FavoritesContext';

const mockArtist = {
  id: 'test-artist-1',
  name: 'Test Artist',
  slug: 'test-artist',
  image: 'https://example.com/image.jpg',
  location: 'Kuala Lumpur',
  area: 'KLCC',
  rating: 4.8,
  reviewCount: 42,
  categories: ['bridal'],
  price: 350,
  bio: 'Test bio',
  portfolio: [],
  verified: true,
  languages: ['English', 'Malay'],
  responseTime: 'Within 1 hour',
  yearsExperience: 5,
  featured: false,
  available: true,
};

const mockFavoritesContext = {
  favorites: [],
  toggleFavorite: jest.fn(),
  isFavorite: jest.fn().mockReturnValue(false),
  isLoading: false,
};

describe('ArtistCard', () => {
  it('renders artist name and location', () => {
    const { getByText } = render(
      <FavoritesContext.Provider value={mockFavoritesContext}>
        <ArtistCard artist={mockArtist} />
      </FavoritesContext.Provider>
    );

    expect(getByText('Test Artist')).toBeTruthy();
    expect(getByText('Kuala Lumpur')).toBeTruthy();
  });

  it('displays rating and review count', () => {
    const { getByText } = render(
      <FavoritesContext.Provider value={mockFavoritesContext}>
        <ArtistCard artist={mockArtist} />
      </FavoritesContext.Provider>
    );

    expect(getByText('★ 4.8')).toBeTruthy();
    expect(getByText('(42)')).toBeTruthy();
  });

  it('shows price in RM', () => {
    const { getByText } = render(
      <FavoritesContext.Provider value={mockFavoritesContext}>
        <ArtistCard artist={mockArtist} />
      </FavoritesContext.Provider>
    );

    expect(getByText('RM 350')).toBeTruthy();
  });

  it('shows filled heart when favorite', () => {
    const favContext = { ...mockFavoritesContext, isFavorite: jest.fn().mockReturnValue(true) };

    const { getByText } = render(
      <FavoritesContext.Provider value={favContext}>
        <ArtistCard artist={mockArtist} />
      </FavoritesContext.Provider>
    );

    expect(getByText('❤️')).toBeTruthy();
  });
});
