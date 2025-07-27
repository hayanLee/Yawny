import { CircleUserRound, Heart, Lock, LockOpen, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <Link href='/' className='text-2xl font-bold'>
        YAWNY
      </Link>
      <nav className='flex items-center gap-4'>
        <CircleUserRound />
        <Link href='/wish/product'>
          <Heart />
        </Link>
        <Link href='/cart'>
          <ShoppingCart />
        </Link>
        <Link href='/login'>
          <Lock />
        </Link>
        <LockOpen />
      </nav>
    </div>
  );
};

export default Header;
