'use server';

import { createClient } from '@/supabase/server';

export async function loginAction({ email, password }: { email: string; password: string }) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: '로그인 중 오류가 발생했습니다.' };
  }
}

export async function logoutAction() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: '로그아웃 중 오류가 발생했습니다.' };
  }
}

export async function signupAction({ email, password }: { email: string; password: string }) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: '회원가입 중 오류가 발생했습니다.' };
  }
}

export async function getUserAction() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
