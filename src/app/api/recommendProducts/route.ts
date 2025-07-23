import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const categoryId = request.nextUrl.searchParams.get('categoryId');

  const { data, error } = await supabase.from('products').select('*').eq('category_id', categoryId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
