import { Button } from '@/components/ui/button';

const orders = [
  {
    id: 12,
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    orderItems: [
      {
        id: 1,
        name: '상품명1',
        option: 'M',
        price: 30000,
        brand: '브랜드명1',
      },
      {
        id: 2,
        name: '상품명2',
        option: 'L',
        price: 50000,
        brand: '브랜드명1',
      },
    ],
  },
  {
    id: 2,
    orderNumber: '1234567891',
    orderDate: '2025-01-02',
    orderItems: [
      {
        id: 3,
        name: '상품명3',
        option: 'S',
        price: 70000,
        brand: '브랜드명2',
      },
    ],
  },
];

const OrderPage = () => {
  return (
    <main>
      <div className='flex border-b-3'>
        <h4 className='text-xl font-bold'>최근 주문 내역</h4>
      </div>

      <div className='flex flex-col divide-y divide-gray-300'>
        {orders.map((order) => (
          <div key={order.id} className='px-4 py-3'>
            <div className='mb-2 text-sm font-bold text-gray-500'>
              주문일자: {order.orderDate} / 주문번호: {order.orderNumber}
            </div>

            {order.orderItems.map((item) => (
              <div key={item.id} className='grid grid-cols-[3fr_100px_1fr] items-center gap-4 py-2'>
                <div className='flex items-center gap-4'>
                  <div className='w-22 h-22 bg-gray-200 rounded-md overflow-hidden flex-shrink-0' />
                  <div className='flex flex-col gap-1 text-sm'>
                    <h3 className='text-gray-900 font-semibold text-xs'>{item.brand}</h3>
                    <p className='font-bold text-base'>{item.name}</p>
                    <p className='text-gray-500'>SIZE : {item.option}</p>
                  </div>
                </div>
                <Button>리뷰 작성</Button>
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
