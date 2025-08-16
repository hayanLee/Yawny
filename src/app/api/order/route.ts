import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(product_id, name, thumbnail), brands(name))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // console.log('>>>>>>', data, error);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
