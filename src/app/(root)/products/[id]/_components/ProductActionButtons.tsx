'use client';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { Tables } from '@/types/supabase';
import { useState } from 'react';
import SizeSelector from './SizeSelector';

interface ProductActionButtonsProps {
  product: Tables<'products'> & { brands: { name: string } };
}

const ProductActionButtons = ({ product }: ProductActionButtonsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  const handleSizeSelect = (size: string) => setSelectedSize(size);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }

    addItem({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      thumbnail: product.thumbnail,
      brand_id: product.brand_id,
      brand_name: product.brands.name,
      discount_price: product.sale_percent ? Math.floor(product.price * (1 - product.sale_percent / 100)) : 0,
    });

    alert('장바구니에 추가되었습니다.');
  };

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
        <Button variant='outline' onClick={handleAddToCart}>
          장바구니 담기
        </Button>
        <Button>구매하기</Button>
      </div>
    </div>
  );
};

export default ProductActionButtons;
