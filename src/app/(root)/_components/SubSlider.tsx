'use client';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const items = [
  { id: 1, imgUrl: getSupabasePublicImagePathUrl('banners/sub/1.png') },
  { id: 2, imgUrl: getSupabasePublicImagePathUrl('banners/sub/2.png') },
  { id: 3, imgUrl: getSupabasePublicImagePathUrl('banners/sub/3.png') },
  { id: 4, imgUrl: getSupabasePublicImagePathUrl('banners/sub/4.png') },
  { id: 5, imgUrl: getSupabasePublicImagePathUrl('banners/sub/5.png') },
];

const SubSlider = () => {
  return (
    <Swiper
      breakpoints={{
        640: { slidesPerView: 2 }, // sm
        768: { slidesPerView: 3 }, // md
        1024: { slidesPerView: 4 }, // lg
      }}
      modules={[Autoplay]}
      loop
    >
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

export default SubSlider;
