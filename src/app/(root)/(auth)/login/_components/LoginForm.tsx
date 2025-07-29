'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { loginAction } from '../actions';

const LoginForm = () => {
  return (
    <form action={loginAction} className='flex flex-col gap-4 items-center grow'>
      <Input name='email' type='email' placeholder='이메일' variant='underline' />
      <div className='relative w-full'>
        <Input name='password' type='password' placeholder='비밀번호' variant='underline' />
        <EyeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
      </div>
      <Button type='submit' className='w-full'>
        로그인
      </Button>
      {/* <Button variant='outline' className='w-full'>
        카카오 로그인
      </Button> */}
      <p className='text-sm text-gray-500'>
        아직 회원이 아니신가요?
        <Link href='/signup' className='text-blue-500 underline font-semibold'>
          회원가입
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
