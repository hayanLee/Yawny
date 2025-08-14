'use client';

import { createOrderSummary } from '@/app/(root)/cart/_utils/calculateOrderSummary';
import AlertModal from '@/components/Modal/AlertModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useListSelection from '@/hooks/useSelectableList';
import { CartItem, useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { formatPrice } from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SectionHeader from '../mypage/_components/SectionHeader';
import CartItemRow from './_components/CartItemRow';

const CartPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items); // 장바구니 상품 목록
  const getItemKey = (item: CartItem) => `${item.product_id}::${item.size}`;

  const { removeItem, updateQuantity, clearCart } = useCartStore(); // 장바구니 상품 삭제, 수량 변경, 전체 삭제
  const setCheckoutData = useCheckoutStore((state) => state.setCheckoutData); // 주문 정보 저장
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // 전체 삭제 알림 모달 상태

  const { selectedKeys, selectAll, isSelected, toggleItem, deleteItem } = useListSelection(items, getItemKey);

  const handleRemoveSelected = () => {
    selectedKeys.forEach((itemKey) => {
      const [productId, size] = itemKey.split('::');
      console.log(productId, size);
      removeItem(productId, size);
      deleteItem(itemKey);
    });
  };

  const handleClearCart = () => {
    setIsAlertModalOpen(true);
  };

  const confirmClearCart = () => {
    clearCart();
    selectAll(false);
  };

  const selectedItemsList = items.filter((item) => isSelected(item));
  const orderSummary = createOrderSummary(selectedItemsList);

  const handlePayment = () => {
    if (selectedKeys.length === 0) return;
    setCheckoutData(orderSummary);
    router.push('/checkout');
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
                  checked={selectedKeys.length === items.length}
                  onCheckedChange={(checked) => selectAll(!!checked)}
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
              <CartItemRow
                key={`${item.product_id}::${item.size}`}
                item={item}
                checked={isSelected(item)}
                onSelect={toggleItem}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </tbody>
        </table>

        <div className='flex gap-2 my-4'>
          <Button variant='outline' onClick={handleRemoveSelected} disabled={selectedKeys.length === 0}>
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
          <span>{formatPrice(orderSummary.totalAmount)}원</span>
        </div>
        <div className='flex justify-between'>
          <span>배송비</span>
          <span>{orderSummary.shippingFee || '무료'}</span>
        </div>
        <div className='flex justify-between font-semibold text-lg mt-2'>
          <span>총 결제금액</span>
          <span className='text-xl font-bold'>{formatPrice(orderSummary.finalAmount)}원</span>
        </div>
        <div className='grid grid-cols-2 gap-2 mt-4'>
          <Button className='px-4 py-6 font-semibold' disabled={selectedKeys.length === 0} onClick={handlePayment}>
            선택 상품 주문 ({selectedKeys.length}개)
          </Button>
          <Button
            className='px-4 py-6 font-semibold'
            onClick={() => {
              selectAll(true);
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
