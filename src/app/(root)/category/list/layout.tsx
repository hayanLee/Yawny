import React, { Suspense } from 'react';
import SortFilter from './_components/SortFilter';

const CategoryListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-between px-4 pb-[100px] mx-auto relative gap-4'>
      <Suspense fallback={<div className='lg:w-[300px] h-fit py-4'>Loading...</div>}>
        <SortFilter />
      </Suspense>
      <main className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:p-4'>
        {children}
      </main>
    </div>
  );
};

export default CategoryListLayout;
