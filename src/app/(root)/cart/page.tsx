'use client';

import AlertModal from '@/components/Modal/AlertModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { OrderSummary } from '@/types/payment';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SectionHeader from '../mypage/_components/SectionHeader';

const CartPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items); // 장바구니 상품 목록
  const { removeItem, updateQuantity, clearCart } = useCartStore(); // 장바구니 상품 삭제, 수량 변경, 전체 삭제
  const setCheckoutData = useCheckoutStore((state) => state.setCheckoutData); // 주문 정보 저장
  const [selectedItems, setSelectedItems] = useState<string[]>(items.map((item) => `${item.product_id}-${item.size}`)); // 선택된 상품 목록
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // 전체 삭제 알림 모달 상태

  const handleSelectAll = (checked: CheckedState) => {
    if (checked) {
      setSelectedItems(items.map((item) => `${item.product_id}-${item.size}`));
    } else {
      setSelectedItems([]);
    }
  };
  const handleSelectItem = (itemKey: string, checked: CheckedState) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemKey]);
    } else {
      setSelectedItems((prev) => prev.filter((key) => key !== itemKey));
    }
  };
  const handleRemoveSelected = () => {
    selectedItems.forEach((itemKey) => {
      const [productId, size] = itemKey.split('-');
      removeItem(productId, size);
    });
    setSelectedItems([]);
  };

  const handleClearCart = () => {
    setIsAlertModalOpen(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setSelectedItems([]);
  };

  const selectedItemsList = items.filter((item) => selectedItems.includes(`${item.product_id}-${item.size}`));
  const selectedTotalPrice = selectedItemsList.reduce(
    (total, item) => total + item.quantity * (item.discount_price || item.price),
    0
  );

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      return;
    }

    const orderData = createOrderSummary();
    setCheckoutData(orderData);

    router.push('/checkout');
  };

  const createOrderSummary = (): OrderSummary => {
    const totalAmount = selectedItemsList.reduce(
      (total, item) => total + item.quantity * (item.discount_price || item.price),
      0
    );
    const shippingFee = totalAmount >= 50000 ? 0 : 3000; // 5만원 이상 무료배송
    const finalAmount = totalAmount + shippingFee;

    return {
      items: selectedItemsList,
      totalAmount,
      shippingFee,
      finalAmount,
    };
  };

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
                  checked={selectedItems.length === items.length}
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
              <tr key={`${item.product_id}-${item.size}`} className='border-b border-gray-300'>
                <td className='p-4'>
                  <Checkbox
                    checked={selectedItems.includes(`${item.product_id}-${item.size}`)}
                    onCheckedChange={(checked) => handleSelectItem(`${item.product_id}-${item.size}`, checked)}
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
                      className='disabled:bg-black/10'
                      disabled={item.quantity === 1}
                      onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className='text-lg font-semibold w-8'>{item.quantity}</span>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
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
                  <Button size='icon' variant='ghost' onClick={() => removeItem(item.product_id, item.size)}>
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex gap-2 my-4'>
          <Button variant='outline' onClick={handleRemoveSelected} disabled={selectedItems.length === 0}>
            선택 삭제
          </Button>
          <Button variant='outline' onClick={handleClearCart}>
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
          <span>{selectedTotalPrice >= 50000 ? '무료' : '3,000원'}</span>
        </div>
        <div className='flex justify-between font-semibold text-lg mt-2'>
          <span>총 결제금액</span>
          <span className='text-xl font-bold'>
            {(selectedTotalPrice + (selectedTotalPrice >= 50000 ? 0 : 3000)).toLocaleString()}원
          </span>
        </div>
        <div className='grid grid-cols-2 gap-2 mt-4'>
          <Button className='px-4 py-6 font-semibold' disabled={selectedItems.length === 0} onClick={handlePayment}>
            선택 상품 주문 ({selectedItems.length}개)
          </Button>
          <Button
            className='px-4 py-6 font-semibold'
            onClick={() => {
              handleSelectAll(true);
              handlePayment();
            }}
          >
            전체 주문 ({items.length}개)
          </Button>
        </div>
      </section>

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={confirmClearCart}
        title='장바구니 전체 삭제'
        message='장바구니의 모든 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
        confirmText='전체 삭제'
        cancelText='취소'
      />
    </div>
  );
};

export default CartPage;
