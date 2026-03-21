import { NextRequest, NextResponse } from 'next/server';
import { dummyProducts } from '@/data/dummy-products';

// In-memory store for demo (replace with database in production)
let productsStore = [...dummyProducts];

/**
 * GET /api/admin/products
 * Returns all products for admin panel
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let filteredProducts = [...productsStore];

  if (status && status !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.status === status);
  }

  if (search) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.vin.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  });
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.sku) {
      return NextResponse.json(
        { message: 'Name and SKU are required' },
        { status: 400 }
      );
    }

    // Create new product with generated ID
    const newProduct = {
      _id: `veh_${Date.now()}`,
      ...body,
      status: body.status || 'ACTIVE',
      stockStatus: body.stockStatus || 'IN_STOCK',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to store
    productsStore.unshift(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

