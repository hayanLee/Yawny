'use client';
import { Button } from '@/components/ui/button';
import { useCartActions } from '@/hooks/useCartActions';
import { Product } from '@/types/cart';
import { useState } from 'react';
import SizeSelector from './SizeSelector';

interface ProductActionButtonsProps {
  product: Product;
}

const ProductActionButtons = ({ product }: ProductActionButtonsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartActions();

  const handleSizeSelect = (size: string) => setSelectedSize(size);

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <SizeSelector sizes={product.sizes} onSizeSelect={handleSizeSelect} selectedSize={selectedSize} />
      </div>

      <div className='flex items-center gap-2'>
        <Button variant={'outline'} size={'icon'} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          -
        </Button>
        <span className='p-4 text-center text-lg font-bold'>{quantity}</span>
        <Button variant={'outline'} size={'icon'} onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Button variant='outline' onClick={() => addToCart(product, quantity, selectedSize)}>
          장바구니 담기
        </Button>
        <Button>구매하기</Button>
      </div>
    </div>
  );
};

export default ProductActionButtons;
