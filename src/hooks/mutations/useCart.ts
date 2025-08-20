import { CartItem } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 서버 장바구니 상품 추가
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CartItem) => {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      return response.json();
    },
    onMutate: (data) => {
      queryClient.setQueryData(['cart'], (old: CartItem[]) => {
        const existingItem = old.find((item) => item.product_id === data.product_id && item.size === data.size);
        if (existingItem) {
          return old.map((item) => (item.product_id === data.product_id && item.size === data.size ? old : item));
        }
        return [...old, data] as CartItem[];
      });
    },
    onSuccess: () => {
      // 장바구니 데이터 무효화하여 재조회
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// 서버 장바구니 상품 수정
// export const useUpdateCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: Pick<CartItem, 'product_id' | 'size' | 'quantity'>) => {
//       const response = await fetch('/api/cart', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update cart item');
//       }

//       return response.json();
//     },
//     onMutate: (data) => {
//       queryClient.setQueryData(['cart'], (old: CartItem[]) =>
//         old.map((item) => (item.product_id === data.product_id && item.size === data.size ? data : item))
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['cart'] });
//     },
//     onError: (error, data, variables) => {
//       queryClient.setQueryData(['cart'], (old: CartItem[]) =>
//         old.map((item) => (item.product_id === data.product_id && item.size === data.size ? data : item))
//       );
//     },
//   });
// };

// 서버 장바구니 상품 삭제
export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Pick<CartItem, 'product_id' | 'size'>) => {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      return response.json();
    },
    onMutate: (data) => {
      queryClient.setQueryData(['cart'], (old: CartItem[]) =>
        old.filter((item) => item.product_id !== data.product_id && item.size !== data.size)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error, data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// 서버 장바구니 전체 삭제
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      return response.json();
    },
  });
};
