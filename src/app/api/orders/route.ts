import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/data/order-data';

/**
 * GET /api/orders
 * Returns all orders with optional filtering
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const userId = searchParams.get('userId');

  let filteredOrders = [...orders];

  // Filter by status
  if (status) {
    filteredOrders = filteredOrders.filter(order => order.status === status);
  }

  // Filter by user (placeholder - orders don't have userId in current data)
  if (userId) {
    // TODO: Filter by user when user data is added to orders
  }

  return NextResponse.json({
    orders: filteredOrders,
    total: filteredOrders.length,
  });
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.items || !body.deliveryAddress) {
      return NextResponse.json(
        { message: 'Items and delivery address are required' },
        { status: 400 }
      );
    }

    // TODO: Save to database
    const newOrder = {
      id: `VH-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      ...body,
    };

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

