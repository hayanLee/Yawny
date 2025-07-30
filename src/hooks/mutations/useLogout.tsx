import { logoutAction } from '@/app/_actions/auth';
import { userKey } from '@/lib/queryKeys/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKey.me });
      router.push('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};

export default useLogout;
