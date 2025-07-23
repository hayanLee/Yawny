'use client';

import Product from '@/app/(root)/_components/Product/Product';
import { Tables } from '@/types/supabase';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  products: Tables<'products'>[];
};

const RecommendProductSlider = ({ products }: Props) => {
  return (
    <Swiper spaceBetween={12} slidesPerView={'auto'} className='w-full'>
      {products.map((product) => (
        <SwiperSlide key={product.product_id} style={{ width: 'auto' }}>
          <Product product={product} isSquare />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendProductSlider;
