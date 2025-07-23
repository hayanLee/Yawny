'use client';

import SubSlider from '@/app/(root)/_components/SubSlider';
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
    <aside className='flex flex-col sticky top-[112px] lg:w-[300px] h-fit py-4 gap-10 bg-white z-10'>
      <div className='flex flex-col gap-2'>
        <h4 className='font-semibold'>Sort by</h4>
        <ul className='flex md:flex-col justify-between gap-2'>
          <li
            className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
            onClick={() => handleSort('name')}
          >
            이름순
          </li>
          <li
            className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
            onClick={() => handleSort('newest')}
          >
            최신순
          </li>
          <li
            className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
            onClick={() => handleSort('price-low-to-high')}
          >
            높은 가격 순
          </li>
          <li
            className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
            onClick={() => handleSort('price-high-to-low')}
          >
            낮은 가격 순
          </li>
        </ul>
      </div>

      <div className='mt-auto hidden lg:block'>
        <SubSlider />
      </div>
    </aside>
  );
};

export default SortFilter;
