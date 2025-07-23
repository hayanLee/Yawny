import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;

  const categorySlug = searchParams.get('category');
  const sale = searchParams.get('sale');
  const sort = searchParams.get('sort');

  try {
    let query = supabase.from('products').select('*'); // 전체 상품

    // 1. 특정 카테고리 상품만
    if (categorySlug) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categorySlug)
        .single();

      if (categoryError || !category) {
        return NextResponse.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
      }

      query = query.eq('category_id', category.id);
    }

    // 2. 세일 상품만
    if (sale) {
      query = query.neq('sale_percent', 0);
    }

    // 3. 정렬
    switch (sort) {
      case 'price-low-to-high':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high-to-low':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
