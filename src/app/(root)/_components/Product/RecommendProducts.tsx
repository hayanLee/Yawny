import RecommendProductSlider from './RecommendProductSlider';

const RecommendProducts = async ({ categoryId, productId }: { categoryId: string; productId: string }) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommendProducts?categoryId=${categoryId}&productId=${productId}`
  );
  const products = await data.json();

  return <RecommendProductSlider products={products} />;
};

export default RecommendProducts;
