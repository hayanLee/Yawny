import { createClient } from '@/supabase/server';
import { CircleUserRound, Heart, Lock, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import CartBadge from './CartBadge';
import LogoutButton from './LogoutButton';

export default async function HeaderNavIcons() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className='flex items-center gap-4'>
      {user && (
        <Link href='/mypage'>
          <CircleUserRound />
        </Link>
      )}
      {user && (
        <Link href='/wish/product'>
          <Heart />
        </Link>
      )}
      <Link href='/cart'>
        <div className='relative'>
          <ShoppingCart />
          <CartBadge />
        </div>
      </Link>
      {user ? (
        <LogoutButton />
      ) : (
        <Link href='/login'>
          <Lock />
        </Link>
      )}
    </nav>
  );
}
