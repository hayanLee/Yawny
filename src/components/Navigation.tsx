import { Search } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div className='pt-4 flex items-center'>
      <ul className='uppercase flex gap-4 font-bold grow'>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>
          <Link href='/category/list/pajama'>pajama</Link>
        </li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>
          <Link href='/category/list/shoes'>shoes</Link>
        </li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>
          <Link href='/category/list/kids'>kids</Link>
        </li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>
          <Link href='/category/list/sales'>sales</Link>
        </li>
      </ul>
      <Search className='w-8 h-8' />
    </div>
  );
};

export default Navigation;
