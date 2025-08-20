import { useCartStore } from '@/stores/cartStore';
import { CartItem, ServerCartItem } from '@/types/cart';
import { serverCartItemToCartItem } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useAuth from './useAuth';

export const useCart = () => {
  const { data: user } = useAuth();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const query = useQuery<ServerCartItem[], Error, CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        body: JSON.stringify({ localItems: items }),
      }).then((res) => res.json());
      return response.data;
    },
    enabled: !!user,
    select: (data): CartItem[] => data.map(serverCartItemToCartItem),
  });

  useEffect(() => {
    if (query.data && user) {
      clearCart();
    }
  }, [query.data, user, clearCart]);

  return query;
};
