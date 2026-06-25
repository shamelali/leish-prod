export interface Artist {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  price: number;
  bio: string;
  portfolio: string[];
  verified: boolean;
  languages: string[];
  responseTime: string;
  yearsExperience: number;
  featured: boolean;
  available: boolean;
  services?: Service[];
  reviews?: Review[];
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface Review {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  count: number;
}

export interface Studio {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  artistsCount: number;
  price: number;
  categories: string[];
  bio: string;
  featured: boolean;
  available: boolean;
  createdAt: string;
}

export interface StudioDetail extends Studio {
  artists?: Artist[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  artistId: string;
  artistName: string;
  artistImage?: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}