import { logoutAction } from '@/app/_actions/auth';
import { PATHNAME } from '@/constants/pathname';
import { userKey } from '@/lib/queryKeys/user';
import { useCartStore } from '@/stores/cartStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: ({ success }) => {
      if (success) {
        clearCart(); // 장바구니 초기화 (localstorage)
        queryClient.invalidateQueries({ queryKey: userKey.me });
        router.replace(PATHNAME.HOME);
      }
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};

export default useLogout;
