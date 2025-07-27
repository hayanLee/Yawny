import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Review from '../products/[id]/_components/Review';

const orderItems = [
  {
    id: 1,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    price: 30000,
  },
  {
    id: 2,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    price: 30000,
  },
  {
    id: 3,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    price: 3000000,
  },
];

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

const MyPage = () => {
  return (
    <main>
      {/* 주문 내역 */}
      <div>
        <div className='flex items-center justify-between border-b-3'>
          <h4 className='text-lg font-bold'>최근 주문 내역</h4>
          <Link href='/mypage/order' className='flex items-center gap-1'>
            <span>더보기</span>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className='flex flex-col divide-y divide-gray-300'>
          {orderItems.map((item) => (
            <div key={item.id} className='flex gap-4 items-center px-4 py-3 hover:underline'>
              <div className='w-28 shrink-0 text-sm text-gray-600 flex flex-col'>
                <p className='font-semibold'>{item.orderNumber}</p>
                <p className='text-gray-500'>{item.orderDate}</p>
              </div>

              <div className='flex items-center gap-4 flex-1'>
                <div className='w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0' />
                <div className='flex flex-col gap-1 text-sm'>
                  <h3 className='text-gray-900 font-semibold'>{item.name}</h3>
                  <p className='text-gray-500 text-xs'>옵션: {item.option}</p>
                  <p className='text-gray-500'>외 1건</p>
                </div>
              </div>

              <div className='text-right text-sm font-semibold'>{item.price.toLocaleString()}원</div>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 */}
      <div className='gap-4'>
        <div className='flex items-center justify-between border-b-3'>
          <h4 className='text-lg font-bold'>작성한 리뷰</h4>
          <Link href='/mypage/review' className='flex items-center gap-1'>
            <span>더보기</span>
            <ChevronRight size={16} />
          </Link>
        </div>
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
