'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SectionHeader from '../mypage/_components/SectionHeader';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(items.map((item) => item.product_id)));

  const handleSelectAll = (checked: CheckedState) => {
    if (checked) {
      setSelectedItems(new Set(items.map((item) => item.product_id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (productId: string, checked: CheckedState) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedItems(newSelected);
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach((productId) => removeItem(productId));
    setSelectedItems(new Set());
  };

  const selectedItemsList = items.filter((item) => selectedItems.has(item.product_id));
  const selectedTotalPrice = selectedItemsList.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className='custom-container py-6'>
        <SectionHeader title='장바구니' />
        <div className='text-center py-12'>
          <p className='text-gray-500 text-2xl font-semibold mb-4'>장바구니에 담은 상품이 없습니다.</p>
          <Link href='/'>
            <Button>쇼핑 계속하기</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className='custom-container py-6'>
      <SectionHeader title='장바구니' className='mb-0' />
      <section>
        <table className='w-full'>
          <thead>
            <tr className='text-center'>
              <th className='p-3 w-[50px] border-b border-gray-300'>
                <Checkbox
                  checked={selectedItems.size === items.length && items.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(checked)}
                />
              </th>
              <th className='p-3 border-b border-gray-300'>상품정보</th>
              <th className='p-3 text-center border-b border-gray-300 w-[120px]'>수량</th>
              <th className='p-3 text-center border-b border-gray-300 w-[140px]'>금액</th>
              <th className='p-3 text-center border-b border-gray-300 w-[80px]'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product_id} className='border-b border-gray-300'>
                <td className='p-4'>
                  <Checkbox
                    checked={selectedItems.has(item.product_id)}
                    onCheckedChange={(checked) => handleSelectItem(item.product_id, checked)}
                  />
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
                        <p className='text-sm font-semibold text-gray-500'>{item.brand_name}</p>
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
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className='text-lg font-semibold w-8'>{item.quantity}</span>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </td>
                <td className='p-4 text-center font-semibold'>
                  {item.discount_price > 0 ? (
                    <>
                      <span className='text-blue-500'>{(item.discount_price * item.quantity).toLocaleString()}원</span>
                      <span className='line-through text-gray-500 text-sm'>
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                    </>
                  ) : (
                    <span>{(item.price * item.quantity).toLocaleString()}원</span>
                  )}
                </td>
                <td className='p-4 text-center'>
                  <Button size='icon' variant='ghost' onClick={() => removeItem(item.product_id)}>
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex gap-2 my-4'>
          <Button variant='outline' onClick={handleRemoveSelected} disabled={selectedItems.size === 0}>
            선택 삭제
          </Button>
          <Button variant='outline' onClick={clearCart}>
            전체 삭제
          </Button>
        </div>
      </section>

      {/* 주문 요약 */}
      <section className='mt-10 flex flex-col gap-2'>
        <SectionHeader title='주문 요약' />
        <div className='flex justify-between'>
          <span>총 상품금액</span>
          <span>{selectedTotalPrice.toLocaleString()}원</span>
        </div>
        <div className='flex justify-between'>
          <span>배송비</span>
          <span>무료</span>
        </div>
        <div className='flex justify-between font-semibold text-lg mt-2'>
          <span>총 결제금액</span>
          <span className='text-xl font-bold'>{selectedTotalPrice.toLocaleString()}원</span>
        </div>
        <div className='grid grid-cols-2 gap-2 mt-4'>
          <Button className='px-4 py-6 font-semibold' disabled={selectedItems.size === 0}>
            선택 상품 주문 ({selectedItems.size}개)
          </Button>
          <Button className='px-4 py-6 font-semibold'>전체 주문 ({items.length}개)</Button>
        </div>
      </section>

      {/* <Policy />
      <SubSlider slidesPerView={4} /> */}
    </div>
  );
};

export default CartPage;
