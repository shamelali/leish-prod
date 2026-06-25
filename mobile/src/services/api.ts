import axios from 'axios';
import { Artist, Studio, StudioDetail, Category } from '../types/api';

const API_BASE = 'https://leish-clone-cvybwdbg7-shamelalis-projects.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const artistsApi = {
  getAll: async (category?: string): Promise<Artist[]> => {
    const params = category ? `?category=${category}` : '';
    const response = await api.get(`/artists${params}`);
    return response.data.artists ?? response.data;
  },

  getById: async (id: string): Promise<Artist> => {
    const response = await api.get(`/artists/${id}`);
    return response.data.artist ?? response.data;
  },

  search: async (query: string): Promise<Artist[]> => {
    const response = await api.get(`/artists?search=${encodeURIComponent(query)}`);
    return response.data.artists ?? response.data;
  },
};

export const studiosApi = {
  getAll: async (): Promise<Studio[]> => {
    const response = await api.get('/studios');
    return response.data.studios ?? response.data;
  },

  getById: async (id: string): Promise<StudioDetail> => {
    const response = await api.get(`/studios/${id}`);
    return response.data.studio ?? response.data;
  },
};

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    return [
      { id: 'event', name: 'Event Makeup', description: 'Statement-ready glam', icon: '🎉', image: '', count: 18 },
      { id: 'photoshoot', name: 'Photoshoot Makeup', description: 'Camera-ready artistry', icon: '📸', image: '', count: 9 },
      { id: 'sfx', name: 'SFX Makeup', description: 'Transformational SFX', icon: '🎭', image: '', count: 6 },
      { id: 'lessons', name: 'Makeup Lessons', description: 'Learn techniques', icon: '🎓', image: '', count: 8 },
      { id: 'hari-raya', name: 'Hari Raya Makeup', description: 'Festive celebrations', icon: '🌙', image: '', count: 14 },
      { id: 'chinese-new-year', name: 'Chinese New Year', description: 'Auspicious styles', icon: '🧧', image: '', count: 10 },
      { id: 'traditional-malay', name: 'Traditional Malay', description: 'Authentic heritage', icon: '🌺', image: '', count: 11 },
      { id: 'hijab', name: 'Hijab-Friendly', description: 'Modest beauty', icon: '👗', image: '', count: 7 },
    ];
  },
};

export default api;