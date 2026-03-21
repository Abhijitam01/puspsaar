import { NextRequest, NextResponse } from 'next/server';
import { dummyProducts } from '@/data/dummy-products';

// In-memory store for demo
let productsStore = [...dummyProducts];

/**
 * GET /api/admin/products/[id]
 * Get a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = productsStore.find(p => p._id === id);

  if (!product) {
    return NextResponse.json(
      { message: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

/**
 * PUT /api/admin/products/[id]
 * Update a product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const index = productsStore.findIndex(p => p._id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product
    productsStore[index] = {
      ...productsStore[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(productsStore[index]);
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id]
 * Delete a product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = productsStore.findIndex(p => p._id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: 'Product not found' },
      { status: 404 }
    );
  }

  productsStore.splice(index, 1);

  return NextResponse.json({ message: 'Product deleted successfully' });
}

