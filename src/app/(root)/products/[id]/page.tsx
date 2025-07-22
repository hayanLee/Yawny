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
import SizeSelector from './_components/SizeSelector';

const ProductPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product?id=${id}`);
  const product: Tables<'products'> & { categories: { name: string }; brands: { name: string; description: string } } =
    await data.json();

  return (
    <main className='mx-auto w-full md:max-w-3xl lg:max-w-7xl h-full'>
      <Breadcrumb category={product.categories.name} brand={product.brands.name} />
      <BrandSummary
        brandName={product.brands.name}
        brandDescription={product.brands.description}
        brandId={product.brand_id}
      />

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
            <p className='text-3xl text-blue-600 font-extrabold mb-2'>
              {product.price.toLocaleString('ko-KR')}
              <span className='text-base font-normal text-gray-500'>원</span>
            </p>
            <p className='text-sm text-gray-500'>{product.description}</p>
          </div>
          <OrderDetails />
          <SizeSelector sizes={product.sizes} />
          <ProductActionButtons />
        </div>
      </div>

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
      <section className='flex flex-col md:flex-row bg-orange-300'>추천 상품</section>
      <section className='flex flex-col md:flex-row bg-green-300'>리뷰</section>
      <DeliveryPolicy />
      <CustomerServicePolicy />
    </main>
  );
};

export default ProductPage;
