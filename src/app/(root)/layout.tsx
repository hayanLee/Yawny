import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-dvw h-dvh flex items-center justify-center overflow-x-hidden'>
      <div className='bg-white mx-auto h-full w-full'>
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
