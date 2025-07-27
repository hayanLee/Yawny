import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionHeader from '../_components/SectionHeader';

const AccountPage = () => {
  return (
    <main>
      <SectionHeader title='회원정보 수정' />
      <section className='flex flex-col mb-25'>
        <div className='flex gap-4 items-center py-2'>
          <p className='text-sm font-semibold w-25 shrink-0'>성명</p>
          <Input type='text' placeholder='성명' variant={'underline'} />
          <Button>수정</Button>
        </div>
        <div className='flex gap-4 items-center py-2'>
          <p className='text-sm font-semibold w-25 shrink-0'>연락처</p>
          <Input type='tel' placeholder='연락처' variant={'underline'} />
          <Button>수정</Button>
        </div>
        <div className='flex gap-4 items-center py-2'>
          <p className='text-sm font-semibold w-25 shrink-0'>이메일</p>
          <p className='grow'>test@test.com</p>
          <Button>수정</Button>
        </div>
        <div className='flex gap-4 items-center py-2'>
          <p className='text-sm font-semibold w-25 shrink-0'>주소 정보</p>
          <div className='flex flex-col gap-1 grow'>
            <Input type='text' placeholder='주소1' variant={'underline'} />
            <Input type='text' placeholder='주소2' variant={'underline'} />
            <Input type='text' placeholder='주소3' variant={'underline'} />
          </div>
          <Button>우편번호 검색</Button>
        </div>
      </section>
      <Button variant={'outline'}>회원 탈퇴하기</Button>
    </main>
  );
};

export default AccountPage;
