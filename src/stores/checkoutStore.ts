import { OrderSummary } from '@/types/payment';
import { create } from 'zustand';

interface CheckoutState {
  checkoutData: OrderSummary | null;
}

interface CheckoutActions {
  setCheckoutData: (data: OrderSummary) => void;
  clearCheckoutData: () => void;
}

type CheckoutStore = CheckoutState & CheckoutActions;

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  checkoutData: null,

  setCheckoutData: (data) => {
    set({ checkoutData: data });
  },

  clearCheckoutData: () => {
    set({ checkoutData: null });
  },
}));
