import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
