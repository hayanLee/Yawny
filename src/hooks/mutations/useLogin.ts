import { loginAction } from '@/app/_actions/auth';
import { userKey } from '@/lib/queryKeys/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogin = ({ email, password }: { email: string; password: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => loginAction({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKey.me });
      router.replace('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

export default useLogin;
