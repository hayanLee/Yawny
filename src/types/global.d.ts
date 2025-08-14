// global.d.ts
export {};

declare global {
  interface Window {
    daum: any; // 혹은 더 정확한 타입 선언 가능
  }
}
