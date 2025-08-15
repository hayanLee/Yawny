import { CartItem } from '@/types/cart';
import { OrderSummary } from '@/types/payment';

export const createOrderSummary = (items: CartItem[]): OrderSummary => {
  const totalAmount = items.reduce((total, item) => total + item.quantity * (item.discount_price || item.price), 0);
  const shippingFee = totalAmount >= 50000 ? 0 : 3000; // 5만원 이상 무료배송
  const finalAmount = totalAmount + shippingFee;

  return {
    orderItems: items,
    totalAmount,
    shippingFee,
    finalAmount,
  };
};
