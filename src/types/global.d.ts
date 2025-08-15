// global.d.ts
interface DaumPostcodeData {
  zonecode: string; // 우편번호
  address: string; // 기본 주소 (도로명 또는 지번)
}

interface DaumPostcode {
  new (options: { oncomplete: (data: DaumPostcodeData) => void }): {
    open: () => void;
  };
}

declare global {
  interface Window {
    daum: {
      Postcode: DaumPostcode;
    };
  }
}

export {};
