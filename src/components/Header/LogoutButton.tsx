'use client';
import useLogout from '@/hooks/mutations/useLogout';
import { LockOpen } from 'lucide-react';

const LogoutButton = () => {
  const { mutate: logoutMutate } = useLogout();
  const handleLogout = () => logoutMutate();
  return (
    <button onClick={handleLogout}>
      <LockOpen />
    </button>
  );
};

export default LogoutButton;
