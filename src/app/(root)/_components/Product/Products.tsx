'use client';
import useProducts from '@/hooks/queries/useProducts';
import { Tables } from '@/types/supabase';
import Product from './Product';

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {products.map((product: Tables<'products'>) => (
        <Product key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default Products;
