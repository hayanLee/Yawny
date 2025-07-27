import React from 'react';
import LikeFilter from './_components/LikeFilter';

const WishLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-between px-4 pb-[100px] mx-auto relative gap-4'>
      <LikeFilter />
      {children}
    </div>
  );
};

export default WishLayout;
