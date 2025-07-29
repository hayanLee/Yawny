import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='max-w-lg mx-auto min-h-[calc(100dvh-112px)] flex flex-col'>{children}</div>;
};

export default AuthLayout;
