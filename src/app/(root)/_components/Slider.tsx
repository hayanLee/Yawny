'use client';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const items = [
  { id: 1, imgUrl: getSupabasePublicImagePathUrl('banners/main/001.jpg') },
  { id: 2, imgUrl: getSupabasePublicImagePathUrl('banners/main/002.jpg') },
  { id: 3, imgUrl: getSupabasePublicImagePathUrl('banners/main/003.jpg') },
];

const Slider = () => {
  return (
    <Swiper slidesPerView={1} loop modules={[Autoplay]} autoplay={{ delay: 4000, disableOnInteraction: false }}>
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className='relative w-full aspect-[3000/1120]'>
            <Image
              src={item.imgUrl}
              alt={`${item.id}번째 배너`}
              fill
              className='object-cover'
              sizes='100vw'
              priority={item.id === 1}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
