'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLogin from '@/hooks/mutations/useLogin';
import { EyeIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin({ email, password });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center grow'>
      <Input
        name='email'
        type='email'
        placeholder='이메일'
        variant='underline'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className='relative w-full'>
        <Input
          name='password'
          type='password'
          placeholder='비밀번호'
          variant='underline'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <EyeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
      </div>
      <Button type='submit' className='w-full' disabled={loginMutation.isPending}>
        {loginMutation.isPending ? (
          <>
            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            로그인 중...
          </>
        ) : (
          '로그인'
        )}
      </Button>
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
