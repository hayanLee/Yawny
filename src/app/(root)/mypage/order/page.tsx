import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { OrderData } from '@/types/user';
import { fetchWithAuth } from '@/utils/utils';
import { cookies } from 'next/headers';
import Image from 'next/image';
import SectionHeader from '../_components/SectionHeader';

const OrderPage = async () => {
  const cookieStore = await cookies();
  const authCookieName = `sb-${process.env.SUPABASE_PROJECT_REF}-auth-token`;
  const authCookieValue = cookieStore.get(authCookieName)?.value;

  if (!authCookieValue) {
    throw new Error('Supabase auth token not found in cookies');
  }

  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`);

  if (!res.ok) {
    return <div>주문 내역을 불러오지 못했습니다.</div>;
  }

  const { data: orders }: { data: OrderData[] } = await res.json();
  return (
    <main>
      <SectionHeader title='최근 주문 내역' />
      <div className='flex flex-col divide-y divide-gray-300'>
        {orders.map((order) => (
          <div key={order.order_id} className='px-4 py-3'>
            <div className='mb-2 text-sm font-bold text-gray-500'>주문일자: {order.created_at.split('T')[0]}</div>

            {order.order_items.map((item) => (
              <div key={item.product_id} className='flex justify-between items-center gap-4 py-2'>
                <div className='flex items-center gap-4'>
                  <div className='w-22 h-22 bg-gray-200 rounded-md overflow-hidden flex-shrink-0'>
                    <Image
                      src={getSupabasePublicImagePathUrl(item.products.thumbnail)}
                      alt={item.products.name}
                      width={88}
                      height={88}
                      className='object-cover'
                    />
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <h3 className='text-gray-900 font-semibold text-xs'>{item.brands.name}</h3>
                    <p className='font-bold text-base'>{item.products.name}</p>
                    <p className='text-gray-500'>
                      SIZE : {item.size} / 수량 : {item.quantity}
                    </p>
                  </div>
                </div>
                <div className='text-right font-semibold'>{item.price.toLocaleString()}원</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default OrderPage;
