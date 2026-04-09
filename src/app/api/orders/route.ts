import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrdersByUserId } from '@/lib/queries';
import { auth } from '@/lib/auth';

/**
 * POST /api/orders
 * Creates order + order_items in NeonDB. Works with or without auth.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();

    const { items, total_amount, shipping_name, shipping_phone, shipping_address } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart items are required' }, { status: 400 });
    }

    // Insert order using the centralized query
    const orderData = {
      userId: session?.user?.id ?? null,
      totalAmount: total_amount,
      customerName: shipping_name,
      customerPhone: shipping_phone,
      shippingAddress: shipping_address,
      status: 'confirmed',
    };

    const itemsData = items.map((item: any) => ({
      productId: item.product_id,
      productName: item.product_name,
      productImage: item.product_image,
      volume: item.volume,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = await createOrder(orderData, itemsData);

    return NextResponse.json({ orderId: order.id, status: 'confirmed' }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}

/**
 * GET /api/orders
 * Returns orders for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await getOrdersByUserId(session.user.id);

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
