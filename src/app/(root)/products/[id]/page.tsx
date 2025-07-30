import RecommendProducts from '@/app/(root)/_components/Product/RecommendProducts';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import { Params } from '@/types/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import BrandSummary from './_components/BrandSummary';
import Breadcrumb from './_components/Breadcrumb';
import CustomerServicePolicy from './_components/CustomerServicePolicy';
import DeliveryPolicy from './_components/DeliveryPolicy';
import OrderDetails from './_components/OrderDetails';
import ProductActionButtons from './_components/ProductActionButtons';
import Review from './_components/Review';

const ProductPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product?id=${id}`);
  const product: Tables<'products'> & { categories: { name: string }; brands: { name: string; description: string } } =
    await data.json();
  const isSale = product.sale_percent && product.sale_percent > 0;
  const salePrice = isSale ? Math.floor(product.price * (1 - product.sale_percent / 100)) : product.price;
  return (
    <main className='mx-auto w-full md:max-w-3xl lg:max-w-7xl pb-28 flex flex-col gap-10 px-4'>
      <Breadcrumb category={product.categories.name} brand={product.brands.name} />
      <BrandSummary
        brandName={product.brands.name}
        brandDescription={product.brands.description}
        brandId={product.brand_id}
      />

      {/* 상품 상단 정보 */}
      <div className='flex w-full flex-col lg:flex-row gap-4'>
        <div className='w-full lg:w-[60%] aspect-square bg-gray-100 overflow-hidden rounded-lg relative flex items-center justify-center'>
          <Image
            src={getSupabasePublicImagePathUrl(product.thumbnail)}
            alt={product.name}
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='w-full grow bg-white p-4 flex flex-col gap-6 justify-between'>
          <div className='flex justify-between items-start gap-2'>
            <h3 className='text-2xl font-bold leading-tight'>{product.name}</h3>
            <Heart className='text-gray-400 hover:text-red-400 transition-colors cursor-pointer' />
          </div>
          <div>
            {isSale ? (
              <>
                <span className='text-3xl text-blue-600 font-extrabold mb-2'>
                  {salePrice.toLocaleString('ko-KR')}원
                </span>
                <span className='text-sm text-gray-400 line-through'>{product.price.toLocaleString('ko-KR')}원</span>
              </>
            ) : (
              <span className='text-3xl text-blue-600 font-extrabold mb-2'>
                {product.price.toLocaleString('ko-KR')}원
              </span>
            )}
          </div>
          <OrderDetails />
          <ProductActionButtons product={product} />
        </div>
      </div>

      {/* 상품 설명 */}
      <section className='mt-8 bg-white p-6 flex flex-col gap-4'>
        <h5 className='text-lg font-bold mb-3 tracking-tight'>상품 설명</h5>
        <p>{product.name}</p>
        <p>{product.description}</p>

        <ul className='list-disc list-inside mt-2 space-y-1'>
          <li>소재: 면 100%</li>
          <li>색상: 화이트, 네이비, 핑크</li>
          <li>세탁법: 찬물 단독 세탁 권장</li>
          <li>제조국: 대한민국</li>
        </ul>

        <p className='text-sm text-gray-500 font-bold'>
          본 제품은 가상의 샘플 제품이며, 이미지 역시 외부에서 수집한 자료를 사용하였습니다. 상업적 이용이 아닌 학습 및
          프로젝트 목적으로 제작되었음을 알려드립니다.
        </p>
        <Image
          src={getSupabasePublicImagePathUrl(product.thumbnail)}
          alt={product.name}
          width={600}
          height={600}
          className='object-contain mx-auto'
        />
      </section>

      {/* 추천 상품 */}
      <section className='flex flex-col'>
        <h5 className='text-lg font-bold mb-3 tracking-tight'>추천 상품</h5>
        <RecommendProducts categoryId={product.category_id} productId={product.product_id} />
      </section>

      {/* 리뷰 */}
      <section className='flex flex-col'>
        <h5 className='text-lg font-bold mb-3 tracking-tight'>리뷰 (0)</h5>
        <ul className='grid grid-cols-3 gap-2 grid-rows-2 lg:px-44'>
          <li className='flex w-full aspect-square bg-pink-200'>1</li>
          <li className='flex w-full aspect-square bg-pink-200'>2</li>
          <li className='flex w-full aspect-square bg-pink-200'>3</li>
          <li className='flex w-full aspect-square bg-pink-200'>4</li>
          <li className='flex w-full aspect-square bg-pink-200'>5</li>
          <li className='flex w-full aspect-square bg-pink-200'>더보기</li>
        </ul>
        <ul>
          <Review />
          <Review />
          <Review />
        </ul>
      </section>

      {/* 배송 정보 */}
      <DeliveryPolicy />
      <CustomerServicePolicy />
    </main>
  );
};

export default ProductPage;
