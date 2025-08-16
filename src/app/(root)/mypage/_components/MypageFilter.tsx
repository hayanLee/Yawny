import { createClient } from '@/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const MypageFilter = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <aside className='flex flex-col sticky top-[112px] lg:w-[200px] h-fit py-4 gap-10 bg-white z-10 shrink-0'>
      <div>
        <p className='text-2xl font-bold'>{user?.email}</p>
        <Link href='/wish/product' className='font-semibold hover:underline'>
          {/* 좋아요 컬럼 추가 */}
          좋아요 <span className='text-blue-500'>{0}</span>
        </Link>
      </div>
      <div>
        <h4 className='text-lg font-bold'>나의 쇼핑 정보</h4>
        <ul>
          <li>
            <Link href='/mypage/order'>주문 내역</Link>
          </li>
          {/* <li>
            <Link href='/mypage/review'>상품 리뷰</Link>
          </li> */}
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
    </aside>
  );
};

export default MypageFilter;
