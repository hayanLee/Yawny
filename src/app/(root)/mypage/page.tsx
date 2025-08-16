import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { OrderData } from '@/types/user';
import { fetchWithAuth } from '@/utils/server-utils';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Review from '../products/[id]/_components/Review';
import SectionHeader from './_components/SectionHeader';

const reviewItems = [
  {
    id: 1,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    rating: 5,
    review: '리뷰 내용',
  },
  {
    id: 2,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    rating: 5,
    review: '리뷰 내용',
  },
  {
    id: 3,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    rating: 5,
    review: '리뷰 내용',
  },
];

const MyPage = async () => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`);
  if (!res.ok) {
    return <div>주문 내역을 불러오지 못했습니다.</div>;
  }
  const { data: orders }: { data: OrderData[] } = await res.json();
  return (
    <main className='space-y-4'>
      {/* 주문 내역 */}
      <div>
        <SectionHeader title='최근 주문 내역'>
          <Link href='/mypage/order' className='flex items-center'>
            <span className='text-sm font-semibold'>더보기</span>
            <ChevronRight size={16} />
          </Link>
        </SectionHeader>

        <div className='flex flex-col divide-y divide-gray-300'>
          {orders.map((item) => (
            <div key={item.order_id} className='flex gap-4 items-center px-4 py-3 hover:underline'>
              <div className='w-28 shrink-0 text-sm text-gray-600 flex flex-col'>
                <p className='font-semibold'>{item.order_id}</p>
                <p className='text-gray-500'>{item.created_at.split('T')[0]}</p>
              </div>

              <div className='flex items-center gap-4 flex-1'>
                <div className='w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0'>
                  <Image
                    src={getSupabasePublicImagePathUrl(item.order_items[0].products.thumbnail)}
                    alt={item.order_items[0].products.name}
                    width={88}
                    height={88}
                  />
                </div>
                <div className='flex flex-col gap-1 text-sm'>
                  <h3 className='text-gray-900 font-semibold'>{item.order_items[0].products.name}</h3>
                  <p className='text-gray-500 text-xs'>옵션: {item.order_items[0].size}</p>
                  <p className='text-gray-500'>외 1건</p>
                </div>
              </div>

              <div className='text-right text-sm font-semibold'>{item.order_items[0].price.toLocaleString()}원</div>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 */}
      <div className='gap-4'>
        <SectionHeader title='작성한 리뷰'>
          <Link href='/mypage/review' className='flex items-center'>
            <span className='text-sm font-semibold'>더보기</span>
            <ChevronRight size={16} />
          </Link>
        </SectionHeader>

        <div className='flex flex-col divide-y divide-gray-300'>
          {reviewItems.map((review) => (
            <Review key={review.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyPage;
