import { CartItem } from '@/types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
}

interface CartActions {
  setItems: (items: CartItem[]) => void; // 초기화용
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      setItems: (items) => {
        set({ items });
      },

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product_id === newItem.product_id && item.size === newItem.size);
        if (existingItem) {
          // 기존 아이템이 있으면 수량만 증가
          set({
            items: items.map((item) =>
              item.product_id === existingItem.product_id && item.size === existingItem.size
                ? { ...item, quantity: item.quantity + 1 }
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

      updateQuantity: (productId, size, quantity) => {
        if (quantity < 1) {
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product_id === productId && item.size === size ? { ...item, quantity } : item
          ),
        });
      },

      removeItem: (productId, size) => {
        set({ items: get().items.filter((item) => !(item.product_id === productId && item.size === size)) });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
