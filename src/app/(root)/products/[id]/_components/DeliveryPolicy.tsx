const Delivery = () => {
  return (
    <section className='text-sm leading-relaxed text-gray-700'>
      <h2 className='font-semibold text-lg mb-2 border-b-2'>배송 안내</h2>
      <ul className='list-disc pl-5 space-y-1'>
        <li>배송 방법: CJ대한통운</li>
        <li>배송 지역: 전국 (일부 도서산간 지역 제외)</li>
        <li>배송 기간: 결제일로부터 1~3일 이내 출고 (주말/공휴일 제외)</li>
        <li>배송비: 3,000원 (5만원 이상 구매 시 무료배송)</li>
        <li>예약/주문 제작 상품의 경우 별도 배송 안내 참고</li>
      </ul>
    </section>
  );
};

export default Delivery;
