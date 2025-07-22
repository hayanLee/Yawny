const OrderDetails = () => {
  return (
    <div className='flex flex-col gap-2'>
      <section className='rounded-lg bg-gray-50 p-4'>
        <h4 className='font-bold text-base mb-1 text-blue-700'>무이자 할부 안내</h4>
        <p className='text-sm text-gray-700'>
          최대 <span className='font-semibold text-blue-600'>7개월</span> 무이자 할부 가능
        </p>
        <p className='text-xs text-gray-500'>
          7개월 무이자 할부 시 월 납부금: <span className='font-semibold'>20,221원</span>
        </p>
        <ul className='mt-2 text-xs text-gray-600 list-disc list-inside'>
          <li>국민카드: 2~6개월 무이자</li>
          <li>삼성카드: 3~5개월 무이자</li>
          <li>현대카드: 2~7개월 무이자</li>
          <li>신한카드: 3~6개월 무이자</li>
        </ul>
      </section>

      <section className='rounded-lg bg-gray-50 p-4'>
        <h4 className='font-bold text-base mb-1 text-blue-700'>배송 안내</h4>
        <ul className='text-sm text-gray-700 space-y-1'>
          <li>
            상품 출고: <span className='font-semibold'>3일 이내 출고</span>
          </li>
          <li>
            배송비: <span className='font-semibold'>기본 3,000원</span> (300,000원 이상 구매 시 무료배송)
          </li>
          <li>제주 및 도서산간 지역은 추가 배송비 3,000원 부과</li>
        </ul>
      </section>
    </div>
  );
};

export default OrderDetails;
