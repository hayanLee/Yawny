'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const SortFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className='flex lg:flex-col gap-2 sticky top-[112px] h-fit lg:w-[200px] bg-white py-4'>
      <h4 className='font-semibold'>Sort by</h4>
      <ul className='flex flex-col gap-2'>
        <li
          className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
          onClick={() => handleSort('name')}
        >
          Name
        </li>
        <li
          className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
          onClick={() => handleSort('newest')}
        >
          Newest
        </li>
        <li
          className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
          onClick={() => handleSort('price-low-to-high')}
        >
          Price: Low to High
        </li>
        <li
          className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
          onClick={() => handleSort('price-high-to-low')}
        >
          Price: High to Low
        </li>
      </ul>
    </aside>
  );
};

export default SortFilter;
