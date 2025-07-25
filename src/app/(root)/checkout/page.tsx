import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const cartItems = [
  { id: 1, name: '상품명', price: 100000, option: 'M' },
  { id: 2, name: '상품명', price: 100000, option: 'L' },
  { id: 3, name: '상품명', price: 100000, option: 'XL' },
  { id: 4, name: '상품명', price: 100000, option: '2XL' },
  { id: 5, name: '상품명', price: 100000, option: '3XL' },
];

const CheckoutPage = () => {
  const totalPrice = cartItems.length * 100000;

  return (
    <div className='custom-container py-6 space-y-8'>
      <h1 className='text-2xl font-bold'>결제하기</h1>

      {/* 배송 정보 */}
      <section className='py-6 space-y-4'>
        <h2 className='text-xl font-semibold border-b border-gray-200 pb-4'>배송 정보</h2>
        <div className='flex flex-col gap-3 text-gray-700'>
          <p className='grid grid-cols-[200px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>수령인</span>
            <Input placeholder='수령인' />
          </p>
          <p className='grid grid-cols-[200px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>배송지</span>
            <div className='flex flex-col gap-2'>
              <Button>우편번호 검색</Button>
              <Input placeholder='배송지1' />
              <Input placeholder='배송지2' />
              <Input placeholder='배송지3' />
            </div>
          </p>
          <p className='grid grid-cols-[200px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>연락처</span>
            <Input placeholder='연락처' />
          </p>
          <p className='grid grid-cols-[200px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>배송 요청사항</span>
            <Input placeholder='배송 요청사항' />
          </p>
        </div>
      </section>

      {/* 상품 정보 */}
      <section className='py-6 space-y-4'>
        <h2 className='text-xl font-semibold border-b border-gray-200 pb-4'>상품 정보</h2>
        <ul className='space-y-4'>
          {cartItems.map((item) => (
            <li key={item.id} className='flex items-center gap-4 border-b pb-4 last:border-none'>
              <div className='w-16 h-16 bg-pink-400 shrink-0' />
              <div className='flex flex-col justify-between text-sm text-gray-700'>
                <p className='text-gray-500'>브랜드명</p>
                <h3 className='font-medium'>{item.name}</h3>
                <p>옵션: {item.option}</p>
                <p>{item.price.toLocaleString()}원 / 수량 1개</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 결제 방법 */}
      <section className='py-6 space-y-4'>
        <h2 className='text-xl font-semibold border-b border-gray-200 pb-4'>결제 방법</h2>
        <div className='flex items-center gap-2'>
          <Input type='radio' className='w-fit' />
          <Button>카카오페이</Button>
        </div>
        <div className='flex items-center gap-2'>
          <Input type='radio' className='w-fit' />
          <Button>토스페이</Button>
        </div>
      </section>

      {/* 결제 금액 */}
      <section className='py-6 space-y-4'>
        <h2 className='text-xl font-semibold border-b border-gray-200 pb-4'>결제 금액</h2>
        <ul className='space-y-2 text-sm text-gray-800'>
          <li className='flex justify-between'>
            <span>총 상품 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </li>
          <li className='flex justify-between'>
            <span>배송비</span>
            <span>0원</span>
          </li>
          <li className='flex justify-between'>
            <span>할인 금액</span>
            <span>0원</span>
          </li>
          <li className='flex justify-between font-bold text-xl pt-3'>
            <span>총 결제 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </li>
        </ul>
      </section>

      {/* 하단 결제 버튼 */}
      <div>
        <div className='mt-4 space-y-2 text-gray-600'>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='w-fit' />
            <p>주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.</p>
          </div>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='w-fit' />
            <p>개인정보 수집/이용 동의</p>
          </div>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='w-fit' />
            <p>개인정보 제3자 제공 동의</p>
          </div>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='w-fit' />
            <p>결제대행 서비스 이용 동의</p>
          </div>
        </div>
        <Button className='w-full text-xl py-6'>{totalPrice.toLocaleString()}원 결제하기</Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
