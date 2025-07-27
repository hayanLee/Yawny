import Link from 'next/link';

const LikeFilter = () => {
  return (
    <aside className='flex flex-col sticky top-[112px] lg:w-[300px] h-fit py-4 gap-10 bg-white z-10'>
      <div className='flex flex-col gap-2'>
        <h4 className='text-2xl uppercase font-bold'>Wish</h4>
        <ul className='flex md:flex-col justify-between gap-2'>
          <li className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'>
            <Link href='/wish/product'>상품</Link>
          </li>
          <li className='text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'>
            <Link href='/wish/brand'>브랜드</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LikeFilter;
