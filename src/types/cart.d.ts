import { Tables } from './supabase';

export type Product = Tables<'products'> & { brands: Tables<'brands'> };

export type CartItem = Pick<Tables<'products'>, 'product_id' | 'name' | 'price' | 'thumbnail' | 'sale_percent'> & {
  brands: Pick<Tables<'brands'>, 'brand_id' | 'name'>;
} & {
  size: string; // 선택한 사이즈
  quantity: number;
};

export type ServerCartItem = Pick<Tables<'cart_items'>, 'product_id' | 'size' | 'quantity' | 'price'> & {
  products: Pick<Tables<'products'>, 'name' | 'thumbnail' | 'price' | 'sale_percent'>;
} & {
  brands: Pick<Tables<'brands'>, 'brand_id' | 'name'>;
};
