import React from 'react';
import MypageFilter from './_components/MypageFilter';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-between w-[80dvw] mx-auto relative gap-4 pb-25'>
      <MypageFilter />
      {children}
    </div>
  );
};

export default MyPageLayout;
