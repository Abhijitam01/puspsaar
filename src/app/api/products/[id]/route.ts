import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getRelatedProducts, updateProductStock } from '@/lib/queries';
import { auth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const includeRelated = searchParams.get('related') === 'true';
    
    if (includeRelated && product.category) {
      const related = await getRelatedProducts(product.category, product.id);
      return NextResponse.json({ product, related });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { stock_quantity } = await req.json();
    await updateProductStock(id, stock_quantity);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 });
  }
}
