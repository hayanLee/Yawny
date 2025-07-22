'use client';
import { Button } from '@/components/ui/button';

const ProductActionButtons = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Button variant={'outline'}>장바구니 담기</Button>
      <Button>구매하기</Button>
    </div>
  );
};

export default ProductActionButtons;
