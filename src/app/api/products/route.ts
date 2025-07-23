import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;

  const categorySlug = searchParams.get('category');
  const sale = searchParams.get('sale');

  // 1. 세일 상품만
  if (sale) {
    const { data, error } = await supabase.from('products').select('*').neq('sale_percent', 0);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  //  2. 전체 상품
  if (!categorySlug) {
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  // 3. 특정 카테고리 상품만
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categorySlug)
    .single();

  if (categoryError || !category) {
    return NextResponse.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
  }

  const { data: products, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id);

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  return NextResponse.json(products);
}
