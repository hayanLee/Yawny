import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get('id');
  const { data, error } = await supabase
    .from('products')
    .select(`*, categories(name), brands(name, description)`)
    .eq('product_id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
