import { CircleUserRound, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import LockSection from './LockSection';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <Link href='/' className='text-2xl font-bold'>
        YAWNY
      </Link>
      <nav className='flex items-center gap-4'>
        <Link href='/mypage'>
          <CircleUserRound />
        </Link>
        <Link href='/wish/product'>
          <Heart />
        </Link>
        <Link href='/cart'>
          <ShoppingCart />
        </Link>
        <LockSection />
      </nav>
    </div>
  );
};

export default Header;
