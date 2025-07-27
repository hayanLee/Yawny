import Link from 'next/link';

const MypageFilter = () => {
  return (
    <aside className='flex flex-col sticky top-[112px] lg:w-[200px] h-fit py-4 gap-10 bg-white z-10 shrink-0'>
      <div>
        <p className='text-2xl font-bold'>홍길동</p>
        <Link href='/wish/product' className='font-semibold hover:underline'>
          좋아요 <span className='text-blue-500'>11</span>
        </Link>
      </div>
      <div>
        <h4 className='text-lg font-bold'>나의 쇼핑 정보</h4>
        <ul>
          <li>
            <Link href='/mypage/order'>주문 내역</Link>
          </li>
          <li>
            <Link href='/mypage/review'>상품 리뷰</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className='text-lg font-bold'>나의 계정정보</h4>
        <ul>
          <li>
            <Link href='/mypage/account/password-confirm'>회원정보 수정</Link>
          </li>
          <li>
            <Link href='/mypage/coupon-mileage'>쿠폰/마일리지</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className='text-lg font-bold'>고객센터</h4>
        <ul>
          <li>
            <Link href='/mypage/qna'>1:1 문의</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default MypageFilter;
