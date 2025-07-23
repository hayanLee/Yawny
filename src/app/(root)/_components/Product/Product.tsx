import { cn, getSupabasePublicImagePathUrl } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  product: Tables<'products'>;
  isSquare?: boolean;
}

const Product = ({ product, isSquare = false }: ProductProps) => {
  return (
    <div
      className={cn(
        'aspect-[3/4] relative rounded-md overflow-hidden shadow-sm bg-white shrink-0',
        isSquare && 'aspect-square'
      )}
    >
      <Link href={`/products/${product.product_id}`}>
        <Image
          src={getSupabasePublicImagePathUrl(product.thumbnail as string)}
          alt={product.name}
          width={300}
          height={600} // aspect ratio 1:2 유지
          className='object-cover hover:scale-105 transition-transform duration-300 w-full h-full'
          priority
        />
        <Heart className='absolute top-2 right-2 text-white' />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white'>
          <h4 className='font-semibold text-lg truncate'>{product.name}</h4>
          <p className='text-sm mt-1'>{product.price}원</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
