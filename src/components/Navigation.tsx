import { Search } from 'lucide-react';

const Navigation = () => {
  return (
    <div className='pt-4 flex items-center'>
      <ul className='uppercase flex gap-4 font-bold grow'>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4 '>best</li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>new</li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>woman</li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>man</li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>kids</li>
        <li className=' hover:underline hover:decoration-4 hover:underline-offset-4'>shoes</li>
      </ul>
      <Search className='w-8 h-8' />
    </div>
  );
};

export default Navigation;
