'use client';

import Product from '@/app/(root)/_components/Product/Product';
import useProducts from '@/hooks/queries/useProducts';

export default function SalesPage() {
  const { data: products, isLoading } = useProducts({ sale: 'true' });

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <>
      {products?.map((product) => (
        <Product key={product.product_id} product={product} />
      ))}
    </>
  );
}
