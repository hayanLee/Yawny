'use client';
import { useCartStore } from '@/stores/cartStore';

const CartBadge = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
      {totalItems > 0 && (
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4.5 h-4.5 flex items-center justify-center'>
          {totalItems}
        </span>
      )}
    </>
  );
};

export default CartBadge;
