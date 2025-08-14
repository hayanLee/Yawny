import { OrderSummary } from '@/types/payment';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
  checkoutData: OrderSummary | null;
}

interface CheckoutActions {
  setCheckoutData: (data: OrderSummary) => void;
  clearCheckoutData: () => void;
}

type CheckoutStore = CheckoutState & CheckoutActions;

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      checkoutData: null,

      setCheckoutData: (data) => {
        set({ checkoutData: data });
      },

      clearCheckoutData: () => {
        set({ checkoutData: null });
      },
    }),
    {
      name: 'checkout',
    }
  )
);
