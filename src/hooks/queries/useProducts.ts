import { productsKey } from '@/lib/queryKeys/products';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async (params?: Record<string, string>): Promise<Tables<'products'>[]> => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products${queryString}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

const useProducts = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: [...productsKey.all, params],
    queryFn: () => fetchProducts(params),
  });
};

export default useProducts;
