'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { formatPrice } from '@/utils/utils';
import PortOne, {
  EasyPayProvider,
  PaymentPayMethod,
  PaymentRequest as PortOnePaymentRequest,
} from '@portone/browser-sdk/v2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SectionHeader from '../mypage/_components/SectionHeader';
import CheckoutAgreementGroup from './_components/CheckoutAgreementGroup';
import DeliveryForm from './_components/DeliveryForm';
import { getChannelKey } from './_utils/checkout-utils';

export interface DeliveryFormInput {
  recipient: string; // 수령인
  postalCode: string; // 우편번호
  address: string; // 기본 주소
  addressDetail: string; // 상세 주소
  phoneNumber: string; // 연락처
  deliveryRequest: string; // 배송 요청사항
  agreements: {
    allAgree: boolean;
    orderConfirm: boolean;
    privacyCollection: boolean;
    privacyThirdParty: boolean;
    paymentService: boolean;
  };
}

const CheckoutPage = () => {
  const router = useRouter();
  const checkoutData = useCheckoutStore((state) => state.checkoutData);
  const clearCheckoutData = useCheckoutStore((state) => state.clearCheckoutData);
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<EasyPayProvider>('EASY_PAY_PROVIDER_KAKAOPAY');
  const deliveryForm = useForm<DeliveryFormInput>({
    mode: 'onBlur',
    defaultValues: {
      recipient: '',
      postalCode: '',
      address: '',
      addressDetail: '',
      phoneNumber: '',
      deliveryRequest: '',
      agreements: {
        allAgree: false,
        orderConfirm: false,
        privacyCollection: false,
        privacyThirdParty: false,
        paymentService: false,
      },
    },
  });
  const handlePaymentProviderChange = (provider: EasyPayProvider) => setSelectedPaymentProvider(provider);

  useEffect(() => {
    if (!checkoutData) {
      router.push('/cart');
    }
    return () => {
      clearCheckoutData();
    };
  }, [clearCheckoutData, checkoutData]);

  const handlePayment = async (provider: EasyPayProvider) => {
    console.log(provider);
    if (!checkoutData) return;

    const paymentRequest: PortOnePaymentRequest = {
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
      channelKey: getChannelKey(provider),
      paymentId: crypto.randomUUID(),
      orderName: `${checkoutData.orderItems[0]?.name}${
        checkoutData.orderItems.length > 1 && ` 외 ${checkoutData.orderItems.length - 1}개`
      }`,
      totalAmount: checkoutData.finalAmount,
      currency: 'CURRENCY_KRW',
      payMethod: PaymentPayMethod.EASY_PAY,
    };

    try {
      const payment = await PortOne.requestPayment(paymentRequest);
      console.log(paymentRequest, '결제 결과:', payment);

      if (payment && payment.code !== undefined) {
        alert('결제에 실패했습니다: ' + (payment.message || '알 수 없는 오류'));
        return;
      }

      console.log(payment, checkoutData);

      // 결제 완료 API 호출
      const completeResponse = await fetch('/api/payment/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId: payment?.paymentId, // string
          checkoutData, // OrderSummary
        }),
      });

      if (completeResponse.ok) {
        alert('결제가 완료되었습니다!');
        router.replace('/mypage/order');
      } else {
        alert('결제에 실패했습니다: ' + (await completeResponse.text()));
      }
    } catch (error) {
      console.error('결제 오류:', error);
      alert('결제 처리 중 오류가 발생했습니다.');
    }
  };

  if (!checkoutData) {
    return (
      <div className='custom-container py-6'>
        <div className='text-center py-12'>
          <p className='text-gray-500 text-2xl font-semibold'>주문 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...deliveryForm}>
      <div className='custom-container flex flex-col gap-10'>
        {/* 배송 정보 */}
        <DeliveryForm />

        {/* 상품 정보 */}
        <section>
          <SectionHeader title='상품 정보' />
          <ul>
            {checkoutData.orderItems.map((item, index) => (
              <li key={index} className='flex items-center gap-4 border-b border-gray-200 py-2.5 last:border-none'>
                <div className='aspect-square overflow-hidden bg-gray-200 shrink-0 rounded'>
                  <Image
                    src={getSupabasePublicImagePathUrl(item.thumbnail)}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='object-cover'
                  />
                </div>
                <div className='flex flex-col justify-between text-sm text-gray-700 gap-1'>
                  <p className='text-gray-500 text-xs'>{item.brands.name}</p>
                  <div>
                    <h3 className='font-medium'>{item.name}</h3>
                    <p className='text-xs'>옵션: {item.size}</p>
                  </div>
                  <p>
                    {item.sale_percent > 0
                      ? formatPrice(Math.floor(item.price * (1 - item.sale_percent / 100)))
                      : formatPrice(item.price)}
                    원 / 수량 {item.quantity}개
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 결제 방법 */}
        <section>
          <SectionHeader title='결제 방법' />
          <div className='space-y-3'>
            <Label
              htmlFor='kakao'
              className={`flex items-center h-13 gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedPaymentProvider === 'EASY_PAY_PROVIDER_KAKAOPAY'
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-yellow-400'
              }`}
            >
              <Input
                type='radio'
                id='kakao'
                name='payment'
                value='EASY_PAY_PROVIDER_KAKAOPAY'
                checked={selectedPaymentProvider === 'EASY_PAY_PROVIDER_KAKAOPAY'}
                onChange={() => handlePaymentProviderChange('EASY_PAY_PROVIDER_KAKAOPAY')}
                className='w-4 h-4'
              />
              <div className='flex items-center gap-3'>
                <Image src='/kakaopay.png' alt='카카오페이' width={40} height={40} className='object-cover' />
                <p className='font-semibold text-gray-900'>카카오페이</p>
              </div>
            </Label>

            <Label
              htmlFor='toss'
              className={`flex items-center h-13 gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedPaymentProvider === 'EASY_PAY_PROVIDER_TOSSPAY'
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              <Input
                type='radio'
                id='toss'
                name='payment'
                value='EASY_PAY_PROVIDER_TOSSPAY'
                checked={selectedPaymentProvider === 'EASY_PAY_PROVIDER_TOSSPAY'}
                onChange={() => handlePaymentProviderChange('EASY_PAY_PROVIDER_TOSSPAY')}
                className='w-4 h-4'
              />
              <div className='flex items-center gap-3'>
                <Image src='/tosspay.png' alt='토스페이' width={40} height={40} className='object-cover' />
                <p className='font-semibold text-gray-900'>토스페이</p>
              </div>
            </Label>
          </div>
        </section>

        {/* 하단 결제 동의 체크박스 */}
        <CheckoutAgreementGroup />

        {/* 결제 금액 */}
        <section className='space-y-4'>
          <SectionHeader title='결제 금액' />
          <ul className='space-y-2 text-sm text-gray-800'>
            <li className='flex justify-between'>
              <span>총 상품 금액</span>
              <span>{formatPrice(checkoutData.totalAmount)}원</span>
            </li>
            <li className='flex justify-between'>
              <span>배송비</span>
              <span>{checkoutData.shippingFee === 0 ? '무료' : `${formatPrice(checkoutData.shippingFee)}원`}</span>
            </li>
            <li className='flex justify-between'>
              <span>할인 금액</span>
              <span>0원</span>
            </li>
            <li className='flex justify-between font-bold text-xl pt-3'>
              <span>총 결제 금액</span>
              <span>{formatPrice(checkoutData.finalAmount)}원</span>
            </li>
          </ul>
        </section>

        <Button
          className='w-full text-xl py-6'
          onClick={deliveryForm.handleSubmit(
            (data) => {
              console.log('유효', data);
              handlePayment(selectedPaymentProvider);
            },
            (errors) => console.log('에러', errors, !!deliveryForm.formState.errors)
          )}
          disabled={!deliveryForm.formState.isValid && !!deliveryForm.formState.errors}
        >
          {formatPrice(checkoutData.finalAmount)}원 결제하기
        </Button>
      </div>
    </FormProvider>
  );
};

export default CheckoutPage;
