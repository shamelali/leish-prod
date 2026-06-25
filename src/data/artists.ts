export interface Artist {
  id: string;
  name: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  price: number;
  bio: string;
  portfolio: string[];
  services: Service[];
  reviews: Review[];
  available: boolean;
  verified: boolean;
  experience: number;
  languages: string[];
  responseTime: string;
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
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  artists: number;
  price: number;
  categories: string[];
  description: string;
}

export const categories: Category[] = [];

export const artists: Artist[] = [];

export const studios: Studio[] = [];

export const testimonials: { quote: string; author: string; role: string; rating: number }[] = [];
