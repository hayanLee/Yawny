import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import React from 'react';

const WishLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-white'>
      <div className='sticky top-0 z-10 h-[112px] p-4 bg-white'>
        <Header />
        <Navigation />
      </div>
      <main className='w-full h-[calc(100dvh-112px)]'>{children}</main>
    </div>
  );
};

export default WishLayout;
