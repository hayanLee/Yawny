import { Button } from '@/components/ui/button';
import { ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';

const wishList = [
  {
    id: 1,
    name: 'Product 1',
    price: 10000,
    brand: 'Brand 1',
    brandId: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20000,
    brand: 'Brand 2',
    brandId: 2,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30000,
    brand: 'Brand 3',
    brandId: 3,
  },
];

const ProductWishPage = () => {
  return (
    <main className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:p-4'>
      {wishList.map((item) => (
        <div key={item.id} className='flex flex-col gap-2'>
          <div>
            <div className='relative'>
              {/* 이미지 영역  */}
              <div className='w-full aspect-square bg-gray-200 rounded-md' />
              {/* 하트 아이콘 */}
              <Heart className='absolute top-2 right-2 text-white/80 drop-shadow-md bg-black/30 rounded-full p-1 w-7 h-7 hover:text-red-400 transition-colors' />
            </div>
            <Link href={`/brand/${item.brandId}`} className='text-sm flex items-center font-semibold hover:underline'>
              {item.brand}
              <ChevronRight size={14} />
            </Link>
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString('ko-KR')}</p>
          </div>
          <Button>장바구니 담기</Button>
        </div>
      ))}
    </main>
  );
};

export default ProductWishPage;
