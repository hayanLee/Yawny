'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSupabasePublicImagePathUrl } from '@/lib/utils';
import { useCheckoutStore } from '@/stores/checkoutStore';
import PortOne, {
  EasyPayProvider,
  PaymentPayMethod,
  PaymentRequest as PortOnePaymentRequest,
} from '@portone/browser-sdk/v2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SectionHeader from '../mypage/_components/SectionHeader';
const CheckoutPage = () => {
  const router = useRouter();
  const checkoutData = useCheckoutStore((state) => state.checkoutData);
  const clearCheckoutData = useCheckoutStore((state) => state.clearCheckoutData);

  const [agreements, setAgreements] = useState({
    orderConfirm: false,
    privacyCollection: false,
    privacyThirdParty: false,
    paymentService: false,
  });

  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<EasyPayProvider>('EASY_PAY_PROVIDER_KAKAOPAY');

  const handleAgreementChange = (key: keyof typeof agreements, checked: boolean) => {
    setAgreements((prev) => ({ ...prev, [key]: checked }));
  };

  const handlePaymentProviderChange = (provider: EasyPayProvider) => {
    console.log(provider);
    setSelectedPaymentProvider(provider);
  };

  useEffect(() => {
    if (!checkoutData) {
      alert('주문 정보가 없습니다.');
      router.push('/cart');
    }
    return () => {
      clearCheckoutData();
    };
  }, [clearCheckoutData]);

  const handlePayment = async (provider: EasyPayProvider) => {
    console.log(provider);

    const paymentRequest: PortOnePaymentRequest = {
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
      channelKey:
        provider === 'EASY_PAY_PROVIDER_KAKAOPAY'
          ? process.env.NEXT_PUBLIC_KAKAO_CHANNEL_KEY
          : process.env.NEXT_PUBLIC_TOSSPAY_CHANNEL_KEY,
      paymentId: crypto.randomUUID(),
      // orderName: `주문 - ${checkoutData.items[0]?.name}${
      //   checkoutData.items.length > 1 ? ` 외 ${checkoutData.items.length - 1}개` : ''
      // }`,
      orderName: 'test',
      totalAmount: 1000,
      currency: 'CURRENCY_KRW',
      payMethod: PaymentPayMethod.EASY_PAY,
      easyPay: {
        easyPayProvider: provider,
      },
    };

    try {
      const result = await PortOne.requestPayment(paymentRequest);
      console.log('결제 결과:', result);

      if (result && result.code !== undefined) {
        alert('결제에 실패했습니다: ' + (result.message || '알 수 없는 오류'));
        return;
      }

      if (result) {
        alert('결제가 완료되었습니다!');
        router.push('/mypage/order');
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
    <div className='custom-container flex flex-col gap-10'>
      {/* 배송 정보 */}
      <section>
        <SectionHeader title='배송 정보' />
        <div className='flex flex-col gap-3 text-gray-700'>
          <div className='grid grid-cols-[150px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>수령인</span>
            <Input placeholder='수령인' />
          </div>
          <div className='grid grid-cols-[150px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>배송지</span>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <Input placeholder='우편번호' />
                <Button className='w-1/4'>우편번호 찾기</Button>
              </div>
              <Input placeholder='주소' />
              <Input placeholder='상세 주소' />
            </div>
          </div>
          <div className='grid grid-cols-[150px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>연락처</span>
            <Input placeholder='연락처' />
          </div>
          <div className='grid grid-cols-[150px_auto] items-center'>
            <span className='font-semibold p-2 shrink-0'>배송 요청사항</span>
            <Input placeholder='배송 요청사항' />
          </div>
        </div>
      </section>

      {/* 상품 정보 */}
      <section>
        <SectionHeader title='상품 정보' />
        <ul>
          {checkoutData.items.map((item, index) => (
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
                <p className='text-gray-500 text-xs'>{item.brand_name}</p>
                <div>
                  <h3 className='font-medium'>{item.name}</h3>
                  <p className='text-xs'>옵션: {item.size}</p>
                </div>
                <p>
                  {(item.discount_price || item.price).toLocaleString()}원 / 수량 {item.quantity}개
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

      {/* 하단 결제 버튼 */}
      <div className='space-y-2 text-gray-600'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='orderConfirm'
            checked={agreements.orderConfirm}
            onCheckedChange={(checked) => handleAgreementChange('orderConfirm', checked as boolean)}
          />
          <Label htmlFor='orderConfirm'>주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.</Label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='privacyCollection'
            checked={agreements.privacyCollection}
            onCheckedChange={(checked) => handleAgreementChange('privacyCollection', checked as boolean)}
          />
          <Label htmlFor='privacyCollection'>개인정보 수집/이용 동의</Label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='privacyThirdParty'
            checked={agreements.privacyThirdParty}
            onCheckedChange={(checked) => handleAgreementChange('privacyThirdParty', checked as boolean)}
          />
          <Label htmlFor='privacyThirdParty'>개인정보 제3자 제공 동의</Label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='paymentService'
            checked={agreements.paymentService}
            onCheckedChange={(checked) => handleAgreementChange('paymentService', checked as boolean)}
          />
          <Label htmlFor='paymentService'>결제대행 서비스 이용 동의</Label>
        </div>
      </div>

      {/* 결제 금액 */}
      <section className='space-y-4'>
        <SectionHeader title='결제 금액' />
        <ul className='space-y-2 text-sm text-gray-800'>
          <li className='flex justify-between'>
            <span>총 상품 금액</span>
            <span>{checkoutData.totalAmount.toLocaleString()}원</span>
          </li>
          <li className='flex justify-between'>
            <span>배송비</span>
            <span>{checkoutData.shippingFee === 0 ? '무료' : `${checkoutData.shippingFee.toLocaleString()}원`}</span>
          </li>
          <li className='flex justify-between'>
            <span>할인 금액</span>
            <span>0원</span>
          </li>
          <li className='flex justify-between font-bold text-xl pt-3'>
            <span>총 결제 금액</span>
            <span>{checkoutData.finalAmount.toLocaleString()}원</span>
          </li>
        </ul>
      </section>

      <Button
        className='w-full text-xl py-6'
        onClick={() => handlePayment(selectedPaymentProvider)}
        disabled={!Object.values(agreements).every(Boolean)}
      >
        {checkoutData.finalAmount.toLocaleString()}원 결제하기
      </Button>
    </div>
  );
};

export default CheckoutPage;
