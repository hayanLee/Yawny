import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

const cartItems = [
  {
    id: 1,
    name: '상품명',
    price: 100000,
    option: 'M',
  },
  {
    id: 2,
    name: '상품명',
    price: 100000,
    option: 'L',
  },
  {
    id: 3,
    name: '상품명',
    price: 100000,
    option: 'XL',
  },
  {
    id: 4,
    name: '상품명',
    price: 100000,
    option: '2XL',
  },
  {
    id: 5,
    name: '상품명',
    price: 100000,
    option: '3XL',
  },
];

const CartPage = () => {
  return (
    <div className='custom-container py-6'>
      <h1 className='text-2xl font-bold mb-6'>장바구니</h1>
      <section>
        <table className='w-full border-t-4'>
          <thead>
            <tr className='text-center'>
              <th className='p-3 w-[50px] border-b border-gray-300'>
                <Input type='checkbox' />
              </th>
              <th className='p-3 border-b border-gray-300'>상품정보</th>
              <th className='p-3 text-center border-b border-gray-300 w-[120px]'>수량</th>
              <th className='p-3 text-center border-b border-gray-300 w-[140px]'>금액</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className='border-b'>
                <td className='p-4'>
                  <Input type='checkbox' />
                </td>
                <td className='p-4'>
                  <div className='flex gap-4'>
                    <div className='w-24 aspect-square bg-pink-400 shrink-0' />
                    <div className='space-y-2'>
                      <p className='text-sm text-gray-500'>브랜드명</p>
                      <h3 className='font-semibold'>{item.name}</h3>
                      <p className='text-sm text-gray-500'>SIZE: {item.option}</p>
                    </div>
                  </div>
                </td>
                <td className='px-4 text-center'>
                  <div className='flex items-center justify-center gap-5'>
                    <Button size='icon'>
                      <Minus />
                    </Button>
                    <span className='text-lg font-semibold'>1</span>
                    <Button size='icon'>
                      <Plus />
                    </Button>
                  </div>
                </td>
                <td className='p-4 text-center font-semibold text-lg'>{item.price.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* 주문 요약 */}
      <section className='mt-10 border-t pt-6 flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>총 상품금액</span>
          <span>{(cartItems.length * 100000).toLocaleString()}원</span>
        </div>
        <div className='flex justify-between'>
          <span>배송비</span>
          <span>무료</span>
        </div>
        <div className='flex justify-between font-semibold text-lg mt-2'>
          <span>총 결제금액</span>
          <span className='text-xl font-bold'>{(cartItems.length * 100000).toLocaleString()}원</span>
        </div>
        <Button className='mt-4 w-full py-6 text-base'>주문하기</Button>
      </section>
      {/* <Policy />
      <SubSlider slidesPerView={4} /> */}
    </div>
  );
};

export default CartPage;
