import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { CartItem } from '@/types/cart';
import { formatPrice } from '@/utils/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItemRowProps {
  item: CartItem;
  checked: boolean;
  onSelect: (item: CartItem, checked: boolean) => void;
  onRemove: (productId: string, size: string) => void;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
}

const CartItemRow = ({ item, checked, onSelect, onRemove, onUpdateQuantity }: CartItemRowProps) => {
  return (
    <tr className='border-b border-gray-300'>
      <td className='p-4'>
        <Checkbox checked={checked} onCheckedChange={(checked) => onSelect(item, !!checked)} />
      </td>
      <td className='p-4'>
        <div className='flex gap-4'>
          <div className='w-24 h-24 overflow-hidden bg-gray-200 shrink-0 rounded'>
            <Image
              src={getSupabasePublicImagePathUrl(item.thumbnail)}
              alt={item.name}
              width={96}
              height={96}
              className='object-cover'
            />
          </div>
          <div className='flex flex-col justify-around space-y-2'>
            <div>
              <p className='text-sm font-semibold text-gray-500'>{item.brands.name}</p>
              <h3 className='font-semibold hover:underline'>
                <Link href={`/products/${item.product_id}`}>{item.name}</Link>
              </h3>
            </div>
            <p className='text-sm text-gray-500'>Size: {item.size}</p>
          </div>
        </div>
      </td>
      <td className='px-4 text-center'>
        <div className='flex items-center justify-center gap-2'>
          <Button
            size='icon'
            variant='outline'
            className='disabled:bg-black/10'
            disabled={item.quantity === 1}
            onClick={() => onUpdateQuantity(item.product_id, item.size, item.quantity - 1)}
          >
            <Minus />
          </Button>
          <span className='text-lg font-semibold w-8'>{item.quantity}</span>
          <Button
            size='icon'
            variant='outline'
            onClick={() => onUpdateQuantity(item.product_id, item.size, item.quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
      </td>
      <td className='p-4 text-center font-semibold'>
        {item.sale_percent > 0 ? (
          <>
            <span className='text-blue-500'>
              {formatPrice(Math.floor(item.price * item.quantity * (1 - item.sale_percent / 100)))}원
            </span>
            <span className='line-through text-gray-500 text-sm'>{formatPrice(item.price * item.quantity)}원</span>
          </>
        ) : (
          <span>{formatPrice(Math.floor(item.price * item.quantity))}</span>
        )}
      </td>
      <td className='p-4 text-center'>
        <Button size='icon' variant='ghost' onClick={() => onRemove(item.product_id, item.size)}>
          <Trash2 />
        </Button>
      </td>
    </tr>
  );
};

export default CartItemRow;
