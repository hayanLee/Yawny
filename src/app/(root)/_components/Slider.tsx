'use client';
import { getSupabasePublicImageUrl } from '@/lib/utils';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const items = [
  { id: 1, imgUrl: getSupabasePublicImageUrl('banners', 'main/1.png') },
  { id: 2, imgUrl: getSupabasePublicImageUrl('banners', 'main/2.png') },
  { id: 3, imgUrl: getSupabasePublicImageUrl('banners', 'main/3.png') },
  { id: 4, imgUrl: getSupabasePublicImageUrl('banners', 'main/4.png') },
  { id: 5, imgUrl: getSupabasePublicImageUrl('banners', 'main/5.png') },
];

const Slider = () => {
  return (
    <Swiper slidesPerView={2} pagination={{ clickable: true }} modules={[Autoplay]} loop>
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className='bg-gray-200 aspect-square text-center'>
            <Image src={item.imgUrl} alt={`${item.id}번째 배너`} fill className='object-cover' />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
