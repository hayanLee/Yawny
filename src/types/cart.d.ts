import { Tables } from './supabase';

export type CartItem = Pick<Tables<'products'>, 'product_id' | 'name' | 'price' | 'thumbnail' | 'brand_id'> & {
  brand_name: string;
  size: string;
  quantity: number;
  discount_price: number;
};
