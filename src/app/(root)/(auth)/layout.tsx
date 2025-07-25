import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='max-w-md mx-auto h-full flex flex-col items-center'>{children}</div>;
};

export default AuthLayout;
