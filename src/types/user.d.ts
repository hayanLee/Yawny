import { Tables } from './supabase';

export type OrderData = Tables<'orders'> & {
  order_items: (Tables<'order_items'> & {
    products: Pick<Tables<'products'>, 'product_id' | 'name' | 'thumbnail'>;
    brands: Pick<Tables<'brands'>, 'name'>;
  })[];
  user: Tables<'users'>;
};
