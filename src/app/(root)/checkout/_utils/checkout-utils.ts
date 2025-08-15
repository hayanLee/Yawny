import { EasyPayProvider } from '@portone/browser-sdk/v2';

export const getChannelKey = (provider: EasyPayProvider): string => {
  switch (provider) {
    case 'EASY_PAY_PROVIDER_KAKAOPAY':
      return process.env.NEXT_PUBLIC_KAKAO_CHANNEL_KEY as string;
    case 'EASY_PAY_PROVIDER_TOSSPAY':
      return process.env.NEXT_PUBLIC_TOSSPAY_CHANNEL_KEY as string;
    default:
      throw new Error(`지원하지 않는 결제 방법입니다: ${provider}`);
  }
};
