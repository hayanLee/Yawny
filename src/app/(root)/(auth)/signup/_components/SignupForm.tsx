import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signupAction } from '../action';

const SignupForm = () => {
  return (
    <form action={signupAction} className='flex flex-col gap-4 items-center grow'>
      <Input name='email' type='email' placeholder='이메일' variant={'underline'} />
      <div className='relative w-full'>
        <Input name='password' type='password' placeholder='비밀번호' variant={'underline'} />
        <EyeOffIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
      </div>
      <div className='relative w-full'>
        <Input type='password' placeholder='비밀번호 확인' variant={'underline'} />
        <EyeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
      </div>
      <Button className='w-full'>제출</Button>
    </form>
  );
};

export default SignupForm;
