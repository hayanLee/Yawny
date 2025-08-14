import { Button } from '@/components/ui/button';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { DaumPostcodeData } from './DeliveryForm';

const POST_CODE_SCRIPT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface DaumPostCodeProps {
  onComplete: (data: DaumPostcodeData) => void;
}

const DaumPostCode = ({ onComplete }: DaumPostCodeProps) => {
  const [isLoaded, setIsLoaded] = useState(false); // 스크립트 로드 여부

  useEffect(() => {
    if (window.daum?.Postcode) {
      setIsLoaded(true);
    }
  }, []);

  const openPostCode = () => {
    if (!isLoaded) return;

    const daum = window.daum;
    new daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        onComplete(data);
      },
    }).open();
  };

  return (
    <>
      <Script
        src={POST_CODE_SCRIPT_URL}
        strategy='lazyOnload'
        onLoad={() => setIsLoaded(true)}
        onError={() => console.log('스크립트 가져오기 에러')}
      />
      <Button className='w-1/4' onClick={openPostCode} type='button' disabled={!isLoaded}>
        우편번호 찾기
      </Button>
    </>
  );
};

export default DaumPostCode;
