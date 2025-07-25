import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className='flex flex-col h-full w-full py-6'>
      <div className='flex flex-col gap-4 items-center grow'>
        <h5 className='text-2xl font-bold'>회원가입</h5>
        <Input type='email' placeholder='이메일' variant={'underline'} />
        <div className='relative w-full'>
          <Input type='password' placeholder='비밀번호' variant={'underline'} />
          <EyeOffIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
        </div>
        <div className='relative w-full'>
          <Input type='password' placeholder='비밀번호 확인' variant={'underline'} />
          <EyeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
        </div>
        <Button className='w-full'>제출</Button>
      </div>
    </div>
  );
};

export default SignupPage;
