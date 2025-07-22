import { Tables } from '@/types/supabase';
import Product from './Product';

const Products = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).then((res) => res.json());
  console.log(products);
  return (
    <div className='grid grid-cols-4 gap-4'>
      {products.map((product: Tables<'products'>) => (
        <Product key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default Products;
