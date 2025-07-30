import { getUserAction } from '@/app/_actions/auth';
import { userKey } from '@/lib/queryKeys/user';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
  return useQuery({
    queryKey: userKey.me,
    queryFn: () => getUserAction(),
  });
};

export default useAuth;
