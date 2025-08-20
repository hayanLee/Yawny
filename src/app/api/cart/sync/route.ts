import { createClient } from '@/supabase/server';
import { CartItem } from '@/types/cart';
import { Tables } from '@/types/supabase';
import { getItemKey } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 로컬 장바구니 아이템 조회
    const { localItems }: { localItems: CartItem[] } = await request.json();

    // 서버 장바구니 현재 상태 조회
    const { data: serverItems }: { data: Tables<'cart_items'>[] | null } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);

    // 병합 로직: (product_id, size) 동일하면 수량 가산, 없으면 insert
    const serverCartKeyAndQuantity = new Map<string, number>();
    serverItems?.forEach((item) => serverCartKeyAndQuantity.set(getItemKey(item), item.quantity));

    // 로컬 아이템을 순회하며 서버 장바구니에 존재하는지 확인
    for (const item of localItems) {
      const key = getItemKey(item); // 로컬 아이템 키
      const nextQuantity = (serverCartKeyAndQuantity.get(key) ?? 0) + item.quantity; // 서버 장바구니에 존재하는 수량 + 로컬 아이템 수량

      // 존재하면 수량 업데이트
      if (serverCartKeyAndQuantity.has(key)) {
        await supabase
          .from('cart_items')
          .update({ quantity: nextQuantity })
          .eq('user_id', user.id)
          .eq('product_id', item.product_id)
          .eq('size', item.size);
      }
      // 없으면 신규 추가
      else {
        await supabase.from('cart_items').insert({
          product_id: item.product_id,
          size: item.size,
          quantity: nextQuantity,
          price: item.price,
          brand_id: item.brands.brand_id,
        });
      }
    }

    // 장바구니에서 로드될 데이터
    const { data: mergedCart } = await supabase
      .from('cart_items')
      .select(
        `
          product_id,
          quantity, 
          size,
          price,
          products(
            name, 
            thumbnail, 
            price,
            sale_percent
          ),
          brands(brand_id, name)
        `
      )
      .eq('user_id', user.id);

    return NextResponse.json({ success: true, data: mergedCart });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
