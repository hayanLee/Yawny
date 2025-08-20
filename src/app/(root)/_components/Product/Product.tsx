import { cn, getSupabasePublicImagePathUrl } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import { formatPrice } from '@/utils/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  product: Tables<'products'>;
  isSquare?: boolean;
}

const Product = ({ product, isSquare = false }: ProductProps) => {
  // 할인 가격 계산
  const isSale = product.sale_percent > 0;
  const discountPrice = Math.floor(product.price * (1 - product.sale_percent / 100));

  return (
    <Link
      href={`/products/${product.product_id}`}
      className={cn('flex flex-col overflow-hidden aspect-[1/1.2]', isSquare && 'w-[220px]')}
    >
      {/* 이미지 영역 */}
      <div className='relative w-full aspect-square flex items-center justify-center overflow-hidden'>
        <Image
          src={getSupabasePublicImagePathUrl(product.thumbnail as string)}
          alt={product.name}
          fill
          className='object-cover transition-transform duration-300 hover:scale-105'
          priority
          sizes='
            (max-width: 768px) 100vw,   /* 모바일에서는 화면 전체 */
            (max-width: 1200px) 50vw,   /* 태블릿/중간 화면에서는 절반 */
            33vw                        /* 데스크탑에서는 1/3 */
          '
        />
        {/* 하트 아이콘 */}
        <Heart className='absolute top-2 right-2 text-white/80 drop-shadow-md bg-black/30 rounded-full p-1 w-7 h-7 hover:text-red-400 transition-colors' />
        {/* 할인율 뱃지 */}
        {isSale && (
          <span className='absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded'>
            {product.sale_percent}% OFF
          </span>
        )}
      </div>
      {/* 정보 영역 */}
      <div className='py-2 flex flex-col grow'>
        <h4 className='font-semibold text-sm sm:text-base truncate '>{product.name}</h4>
        <div className='flex items-center gap-2'>
          {isSale ? (
            <>
              <span className='text-gray-400 line-through'>{formatPrice(product.price)}원</span>
              <span className='font-extrabold text-blue-500'>{formatPrice(discountPrice)}원</span>
            </>
          ) : (
            <span className='font-extrabold text-gray-900'>{formatPrice(product.price)}원</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;
