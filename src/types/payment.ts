import { CartItem } from '@/stores/cartStore';

// 포트원 요청
export interface PaymentRequest {
  storeId: string; // env
  channelKey: string; // env
  paymentId: string; // 주문번호
  orderName: string; // 주문명
  totalAmount: number; // 총 결제 금액
  currency: 'KRW';
  payMethod: 'EASY_PAY'; // 간편 결제로 고정
  easyPay: {
    easyPayProvider: 'KAKAO' | 'TOSS'; // 카카오, 토스로 고정
  };
  customData: {
    orderId: string;
    orderDate: string;
    orderAmount: number;
    orderCurrency: 'KRW';
    orderStatus: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  };
}

export interface PaymentResponse {
  code?: string;
  message?: string;
  paymentId: string;
  status?: string;
}

export type OrderItem = CartItem;

export interface OrderSummary {
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  finalAmount: number;
}

export interface PaymentStatus {
  status: 'IDLE' | 'PENDING' | 'PAID' | 'FAILED';
  message?: string;
}
