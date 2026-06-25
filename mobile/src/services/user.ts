import api from './api';

interface FavoritesResponse {
  favorites?: Array<{ artist_id: string }>;
}

export const userApi = {
  getFavorites: async (userId: string): Promise<string[]> => {
    try {
      const response = await api.get(`/user?action=favorites&userId=${userId}`);
      const data: FavoritesResponse = response.data;
      return data.favorites?.map((f) => f.artist_id) ?? [];
    } catch {
      return [];
    }
  },

  addFavorite: async (userId: string, artistId: string): Promise<boolean> => {
    try {
      await api.post(`/user?action=favorites&userId=${userId}`, { artistId });
      return true;
    } catch {
      return false;
    }
  },

  removeFavorite: async (userId: string, artistId: string): Promise<boolean> => {
    try {
      await api.delete(`/user?action=favorites&userId=${userId}`, {
        data: { artistId },
      });
      return true;
    } catch {
      return false;
    }
  },

  submitReview: async (data: {
    userId: string;
    artistId: string;
    rating: number;
    text: string;
    author: string;
    service?: string;
  }) => {
    const response = await api.post('/user?action=review', data);
    return response.data;
  },

  cancelBooking: async (bookingId: string) => {
    const response = await api.post('/user?action=cancel-booking', { bookingId });
    return response.data;
  },
};

interface CreateBillParams {
  bookingId: string;
  amount: number;
  description: string;
  name: string;
  email: string;
  phone?: string;
}

interface PaymentStatusResponse {
  payment: {
    id: string;
    booking_id: string;
    amount: number;
    status: string;
    billplz_id: string | null;
  };
  billplz?: {
    paid_at: string | null;
    url: string;
  };
}

export const paymentsApi = {
  createBill: async (params: CreateBillParams) => {
    const response = await api.post('/payments?action=create-bill', params);
    return response.data;
  },

  checkStatus: async (paymentId: string): Promise<PaymentStatusResponse> => {
    const response = await api.get(`/payments?action=status&paymentId=${paymentId}`);
    return response.data;
  },

  releasePayment: async (paymentId: string) => {
    const response = await api.post('/payments?action=release', { paymentId });
    return response.data;
  },
};
