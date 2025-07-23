'use client';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const items = [
  { id: 1, imgUrl: getSupabasePublicImagePathUrl('banners/sub/1.jpg') },
  { id: 2, imgUrl: getSupabasePublicImagePathUrl('banners/sub/2.jpg') },
  { id: 3, imgUrl: getSupabasePublicImagePathUrl('banners/sub/3.jpg') },
  { id: 4, imgUrl: getSupabasePublicImagePathUrl('banners/sub/4.jpg') },
  { id: 5, imgUrl: getSupabasePublicImagePathUrl('banners/sub/5.jpg') },
];

const SubSlider = ({ slidesPerView }: { slidesPerView?: number }) => {
  return (
    <Swiper
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      loop
      slidesPerView={slidesPerView ?? 'auto'}
      spaceBetween={10}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className='flex items-center justify-center'>
          <div className='w-full h-full relative'>
            <Image
              src={item.imgUrl}
              alt={`${item.id}번째 배너`}
              className='w-full h-full object-cover'
              width={300}
              height={300}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SubSlider;
