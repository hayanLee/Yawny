import Product from '@/app/(root)/_components/Product/Product';
import { Tables } from '@/types/supabase';

const SalesPage = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?sale=true`);
  const products = await data.json();
  return (
    <>
      {products.map((product: Tables<'products'>) => (
        <Product key={product.product_id} product={product} />
      ))}
    </>
  );
};

export default SalesPage;
