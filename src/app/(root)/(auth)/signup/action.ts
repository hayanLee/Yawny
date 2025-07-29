'use server';

import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export async function signupAction(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let errorOccurred = false;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    errorOccurred = true;
    console.error(error);
  }

  if (!errorOccurred) {
    redirect('/');
  }
}
