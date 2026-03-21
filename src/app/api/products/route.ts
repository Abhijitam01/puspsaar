import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/vehicle-product-data';

/**
 * GET /api/products
 * Returns all products with optional filtering
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');

  let filteredProducts = [...products];

  // Filter by type
  if (type) {
    filteredProducts = filteredProducts.filter(product =>
      product.size?.some(s => s.toLowerCase().includes(type.toLowerCase()))
    );
  }

  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Limit results
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  });
}

/**
 * POST /api/products
 * Create a new product (placeholder for backend integration)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Save to database
    // For now, return the submitted data with a mock ID
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

