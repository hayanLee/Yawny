import { CartItem, Product, ServerCartItem } from '@/types/cart';
import { Tables } from '@/types/supabase';

export const getItemKey = (item: CartItem | Tables<'cart_items'>) => `${item.product_id}::${item.size}`;

export const formatPrice = (price: number) => price.toLocaleString('ko-KR');

// Product(상품 정보) → CartItem(선택한 상품) 변환
export const productToCartItem = (product: Product, options: { size: string; quantity: number }): CartItem => ({
  product_id: product.product_id,
  name: product.name,
  price: product.price,
  thumbnail: product.thumbnail,
  sale_percent: product.sale_percent,
  brands: {
    brand_id: product.brand_id,
    name: product.brands.name,
  },
  size: options.size,
  quantity: options.quantity,
});

// 서버 장바구니 아이템 → CartItem 변환
export const serverCartItemToCartItem = (serverCartItem: ServerCartItem): CartItem => ({
  product_id: serverCartItem.product_id,
  name: serverCartItem.products.name,
  price: serverCartItem.products.price,
  thumbnail: serverCartItem.products.thumbnail,
  sale_percent: serverCartItem.products.sale_percent,
  brands: {
    brand_id: serverCartItem.brands.brand_id,
    name: serverCartItem.brands.name,
  },
  size: serverCartItem.size,
  quantity: serverCartItem.quantity,
});
