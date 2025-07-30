import { Tables } from '@/types/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = Pick<Tables<'products'>, 'product_id' | 'name' | 'price' | 'thumbnail' | 'brand_id'> & {
  brand_name: string;
  size: string;
  quantity: number;
  discount_price: number;
};

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const { items } = get();

        const existingItem = items.find((item) => item.product_id === newItem.product_id && item.size === newItem.size);

        if (existingItem) {
          // 기존 아이템이 있으면 수량만 증가
          set({
            items: items.map((item) =>
              item.product_id === existingItem.product_id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
        } else {
          // 새 아이템 추가
          set({
            items: [...items, newItem],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product_id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        // 1개면 삭제
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) => (item.product_id === productId ? { ...item, quantity } : item)),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
