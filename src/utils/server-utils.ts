import { cookies } from 'next/headers';

// 서버 컴포넌트에서 유저 쿠키 헤더 붙여서 전달
export async function fetchWithAuth(input: RequestInfo | URL) {
  const cookieStore = await cookies();
  const authCookieName = `sb-${process.env.SUPABASE_PROJECT_REF}-auth-token`;
  const authCookieValue = cookieStore.get(authCookieName)?.value;

  if (!authCookieValue) {
    throw new Error('Supabase auth token not found in cookies');
  }

  return fetch(input, {
    headers: {
      Cookie: `${authCookieName}=${authCookieValue}`,
    },
  });
}
