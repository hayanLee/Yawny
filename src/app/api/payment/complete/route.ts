import { createClient } from '@/supabase/server';
import { OrderItem, PaymentCompleteRequest } from '@/types/payment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { paymentId, checkoutData }: PaymentCompleteRequest = await request.json();

    if (!paymentId) {
      return NextResponse.json({ success: false, error: '결제 ID가 누락되었습니다.' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.redirect(new URL('/login'));
    }

    const { error: orderError } = await supabase.from('orders').insert({
      order_id: paymentId,
      total_price: checkoutData.finalAmount,
      user_id: user.id,
    });
    if (orderError) {
      console.error('주문 정보 저장 중 오류가 발생했습니다.', orderError);
    }
    // 주문 상품 정보
    const { error: orderItemError } = await supabase.from('order_items').insert(
      checkoutData.orderItems.map((item: OrderItem) => ({
        order_id: paymentId,
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        brand_id: item.brand_id,
      }))
    );

    if (orderItemError) {
      console.error('주문 상품 정보 저장 중 오류가 발생했습니다.', orderItemError);
    }

    // 장바구니 디비 연결
    // 장바구니 비우기

    return NextResponse.json({
      success: true,
      paymentId,
      message: '결제가 완료되었습니다.',
    });
  } catch (error) {
    console.error('결제 완료 처리 오류:', error);
    return NextResponse.json({ success: false, error: '결제 완료 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
