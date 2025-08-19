'use client';
import { useCartStore } from '@/stores/cartStore';

const CartBadge = () => {
  const items = useCartStore((state) => state.items);

  return (
    <>
      {items.length > 0 && (
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4.5 h-4.5 flex items-center justify-center'>
          {items.length}
        </span>
      )}
    </>
  );
};

export default CartBadge;
