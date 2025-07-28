import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Providers from '@/providers';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className='bg-white'>
        <div className='sticky top-0 z-10 h-[112px] p-4 bg-white'>
          <Header />
          <Navigation />
        </div>
        {children}
      </div>
    </Providers>
  );
};

export default RootLayout;
