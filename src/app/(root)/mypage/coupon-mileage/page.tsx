'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import SectionHeader from '../_components/SectionHeader';

const couponList = [
  {
    id: 1,
    name: '쿠폰 1',
    period: '2025.01.01 ~ 2025.01.01',
    discount: '10%',
  },
  {
    id: 2,
    name: '쿠폰 2',
    period: '2025.01.01 ~ 2025.01.01',
    discount: '30%',
  },
  {
    id: 3,
    name: '쿠폰 3',
    period: '2025.01.01 ~ 2025.01.01',
    discount: '50%',
  },
];

const membershipCouponList = [
  {
    id: 1,
    name: '멤버십 쿠폰 1',
    period: '2025.01.01 ~ 2025.01.01',
    discount: '10%',
  },
];

const mileageList = [
  {
    id: 1,
    name: '리뷰 작성',
    mileage: 100,
    type: 'plus',
    date: '2024.01.01',
    expired: '2024.06.01',
  },
  {
    id: 2,
    name: '주문 취소',
    mileage: 100,
    type: 'minus',
    date: '2025.05.01',
    expired: '2025.06.01',
  },
  {
    id: 3,
    name: '신규 가입',
    mileage: 100,
    type: 'plus',
    date: '2025.07.01',
    expired: '2025.08.01',
  },
];

type LinkTabType = 'coupon' | 'membership' | 'mileage';

const CouponMileagePage = () => {
  const [selectedTab, setSelectedTab] = useState<LinkTabType>('coupon');

  return (
    <div>
      <SectionHeader title='쿠폰/마일리지' />
      <ul className='flex gap-4 font-bold text-xl text-gray-400 my-3'>
        <li onClick={() => setSelectedTab('coupon')} className={`${selectedTab === 'coupon' && 'text-black'}`}>
          장바구니 쿠폰(3)
        </li>
        <li onClick={() => setSelectedTab('membership')} className={`${selectedTab === 'membership' && 'text-black'}`}>
          멤버십 쿠폰(0)
        </li>
        <li onClick={() => setSelectedTab('mileage')} className={`${selectedTab === 'mileage' && 'text-black'}`}>
          마일리지(100)
        </li>
      </ul>
      <main>
        {selectedTab === 'coupon' && (
          <div className='grid grid-cols-2 gap-4'>
            {couponList.map((coupon) => (
              <div key={coupon.id} className='bg-gray-100 rounded-md p-4 border border-gray-200'>
                <p className='text-lg text-blue-500 font-bold'>{coupon.discount}</p>
                <p className='font-semibold mb-4'>{coupon.name}</p>
                <p className='text-sm font-semibold flex items-center gap-2'>
                  {coupon.period} <span className='text-blue-500 font-semibold'>D-3</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'membership' && (
          <div className='grid grid-cols-2 gap-4'>
            {membershipCouponList.map((coupon) => (
              <div key={coupon.id} className='bg-gray-100 rounded-md p-4 border border-gray-200'>
                <p className='text-lg text-blue-500 font-bold'>{coupon.discount}</p>
                <p className='font-semibold mb-4'>{coupon.name}</p>
                <p className='text-sm font-semibold flex items-center gap-2'>
                  {coupon.period} <span className='text-blue-500 font-semibold'>D-3</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'mileage' && (
          <div className='flex flex-col gap-4'>
            {mileageList.map((mileage) => (
              <div key={mileage.id} className='flex items-center border-b border-gray-200 gap-4 py-2.5'>
                <p className='text-sm font-semibold'>{mileage.date}</p>
                <div className='flex flex-col gap-1 grow'>
                  <p className='text-sm font-semibold'>{mileage.name}</p>
                  <p className='text-sm text-gray-500'>{mileage.expired} 소멸 예정</p>
                </div>
                <p className={cn('text-lg font-bold', mileage.type === 'plus' ? 'text-blue-500' : 'text-red-500')}>
                  {mileage.type === 'plus' ? '+' : '-'}
                  {mileage.mileage}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CouponMileagePage;
