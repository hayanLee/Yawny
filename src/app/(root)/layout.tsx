import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-black w-dvw h-dvh flex items-center justify-center'>
      <div className='bg-white mx-auto h-full w-full lg:max-w-3xl'>
        <div className='sticky top-0 z-10 bg-white p-4'>
          <Header />
          <Navigation />
        </div>
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
