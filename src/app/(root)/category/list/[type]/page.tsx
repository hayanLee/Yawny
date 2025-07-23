import Product from '@/app/(root)/_components/Product/Product';
import { Tables } from '@/types/supabase';

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ sort: string }>;
}) => {
  const { type } = await params;
  const { sort } = await searchParams;

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${type}&sort=${sort}`);
  const products = await data.json();
  return (
    <>
      {products.map((product: Tables<'products'>) => (
        <Product key={product.product_id} product={product} />
      ))}
    </>
  );
};

export default CategoryPage;
