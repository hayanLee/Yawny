'use client';
import useLogout from '@/hooks/mutations/useLogout';
import useAuth from '@/hooks/queries/useAuth';
import { Lock, LockOpen } from 'lucide-react';
import Link from 'next/link';

const LockSection = () => {
  const { data: user } = useAuth();
  const { mutate } = useLogout();

  const handleLogout = () => mutate();

  return (
    <>
      {user ? (
        <button onClick={handleLogout} className='flex items-center justify-center'>
          <LockOpen />
        </button>
      ) : (
        <Link href='/login'>
          <Lock />
        </Link>
      )}
    </>
  );
};

export default LockSection;
