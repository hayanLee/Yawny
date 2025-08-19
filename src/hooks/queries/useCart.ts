import { CartItem } from '@/types/cart';
import { useQuery } from '@tanstack/react-query';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async (): Promise<CartItem[]> => {
      const response = await fetch('/api/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      return response.json();
    },
  });
};
