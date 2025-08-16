import React from 'react';
import MypageFilter from './_components/MypageFilter';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-between w-[80dvw] mx-auto relative gap-4 pb-25'>
      <MypageFilter />
      <div className='flex flex-col grow space-y-10'>
        {/* <div className='grid grid-cols-4 bg-black text-white gap-4 p-4'>
          <div className='flex flex-col justify-between gap-4'>
            <h4 className='flex items-center gap-1 text-lg font-semibold'>멤버십 등급</h4>
            <p className='text-2xl font-bold'>Newbie</p>
          </div>
          <div className='flex flex-col justify-between gap-4'>
            <Link href='/mypage/coupon-mileage' className='flex items-center gap-1 text-lg font-semibold'>
              쿠폰 <ChevronRight size={20} />
            </Link>
            <p className='text-2xl font-bold'>3</p>
          </div>
          <div className='flex flex-col justify-between gap-4'>
            <Link href='/mypage/review' className='flex items-center gap-1 text-lg font-semibold'>
              작성한 리뷰 <ChevronRight size={20} />
            </Link>
            <p className='text-2xl font-bold'>0</p>
          </div>
          <div className='flex flex-col justify-between gap-4'>
            <Link href='/mypage/coupon-mileage' className='flex items-center gap-1 text-lg font-semibold'>
              마일리지 <ChevronRight size={20} />
            </Link>
            <p className='text-2xl font-bold'>100</p>
          </div>
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default MyPageLayout;
