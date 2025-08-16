import Link from 'next/link';
import HeaderNavIcons from './HeaderNavIcons';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <Link href='/' className='text-2xl font-bold'>
        YAWNY
      </Link>
      <HeaderNavIcons />
    </div>
  );
};

export default Header;
