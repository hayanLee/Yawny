import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '../../_components/SectionHeader';

const PasswordConfirmPage = () => {
  return (
    <div>
      <SectionHeader title='비밀번호 재확인' />
      <div className='flex flex-col gap-4'>
        <div className='flex gap-1 items-center py-2'>
          <p className='text-sm font-semibold w-30'>아이디(이메일)</p>
          <p>test@test.com</p>
        </div>
        <div className='flex gap-1 items-center py-2'>
          <p className='text-sm font-semibold w-30'>비밀번호</p>
          <div className='relative w-full'>
            <Input type='password' placeholder='비밀번호' variant={'underline'} />
            <EyeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2' />
          </div>
        </div>

        <Link href='/mypage/account'>
          <Button>다음</Button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordConfirmPage;
