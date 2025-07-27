import { ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';

const wishList = [
  {
    id: 1,
    brand: 'Brand 1',
    brandId: 1,
  },
  {
    id: 2,
    brand: 'Brand 2',
    brandId: 2,
  },
  {
    id: 3,
    brand: 'Brand 3',
    brandId: 3,
  },
];

const BrandWishPage = () => {
  return (
    <main className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:p-4'>
      {wishList.map((item) => (
        <div key={item.id} className='flex flex-col gap-2'>
          <div>
            <div className='relative'>
              {/* 이미지 영역  */}
              <div className='w-full aspect-video bg-gray-200 rounded-md' />
              {/* 하트 아이콘 */}
              <Heart className='absolute top-2 right-2 text-white/80 drop-shadow-md bg-black/30 rounded-full p-1 w-7 h-7 hover:text-red-400 transition-colors' />
            </div>
            <Link href={`/brand/${item.brandId}`} className='flex items-center font-semibold'>
              {item.brand}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
};

export default BrandWishPage;
