export const PATHNAME = {
  HOME: '/',

  LOGIN: '/login',
  SIGNUP: '/signup',

  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,

  CATEGORY: '/category',
  CATEGORY_LIST: '/category/list',
  CATEGORY_TYPE: (type: string) => `/category/list/${type}`,
  CATEGORY_SALES: '/category/list/sales',

  SEARCH: '/search',

  CART: '/cart',

  CHECKOUT: '/checkout',

  WISH: '/wish',
  WISH_PRODUCT: '/wish/product',
  WISH_BRAND: '/wish/brand',

  MYPAGE: '/mypage',
  MYPAGE_ORDER: '/mypage/order',
  MYPAGE_REVIEW: '/mypage/review',
  MYPAGE_REVIEW_EDIT: (id: string) => `/mypage/review/edit/${id}`,
  MYPAGE_ACCOUNT: '/mypage/account',
  MYPAGE_PASSWORD_CONFIRM: '/mypage/account/password-confirm',
  MYPAGE_COUPON_MILEAGE: '/mypage/coupon-mileage',
} as const;

// 타입 정의
export type PathnameKey = keyof typeof PATHNAME;
export type PathnameValue = (typeof PATHNAME)[PathnameKey];
