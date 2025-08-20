import { Tables } from '@/types/supabase';
import RecommendProductSlider from './RecommendProductSlider';

interface RecommendProductsProps {
  categoryId: string;
  productId: string;
}

const RecommendProducts = async ({ categoryId, productId }: RecommendProductsProps) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommendProducts?categoryId=${categoryId}&productId=${productId}`
  );
  const products: Tables<'products'>[] = await data.json();

  return <RecommendProductSlider products={products} />;
};

export default RecommendProducts;
