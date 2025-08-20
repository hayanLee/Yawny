import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types/cart';
import { productToCartItem } from '@/utils/utils';
import { useAddToCart, useClearCart, useDeleteCart } from './mutations/useCart';
import useAuth from './queries/useAuth';

export const useCartActions = () => {
  const { data: me } = useAuth();

  // 로컬용
  const addLocalCart = useCartStore((state) => state.addItem);
  const removeLocalCart = useCartStore((state) => state.removeItem);
  const clearLocalCart = useCartStore((state) => state.clearCart);
  const updateLocalCart = useCartStore((state) => state.updateQuantity);

  // 서버용
  const { mutate: addServerCart } = useAddToCart();
  const { mutate: removeServerCart } = useDeleteCart();
  const { mutate: clearServerCart } = useClearCart();
  // const { mutate: updateServerCart } = useUpdateCart();

  const addToCart = (product: Product, quantity: number, selectedSize: string) => {
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }

    const item = productToCartItem(product, { size: selectedSize, quantity });

    if (me) {
      addServerCart(item);
    } else {
      addLocalCart(item);
    }

    alert('장바구니에 추가되었습니다.');
  };

  // const updateQuantity = (product: CartItem, quantity: number, selectedSize: string) => {
  //   if (!selectedSize) {
  //     alert('사이즈를 선택해주세요.');
  //     return;
  //   }

  //   if (me) {
  //     updateServerCart({ product_id: product.product_id, size: selectedSize, quantity });
  //   } else {
  //     updateLocalCart(product.product_id, selectedSize, quantity);
  //   }
  // };

  const removeFromCart = (productId: string, size: string) => {
    if (me) {
      removeServerCart({ product_id: productId, size });
    } else {
      removeLocalCart(productId, size);
    }
  };

  const clearCart = () => {
    if (me) {
      clearServerCart();
    } else {
      clearLocalCart();
    }
  };

  return { addToCart, removeFromCart, clearCart };
};
