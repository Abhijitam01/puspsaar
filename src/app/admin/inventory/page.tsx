import { db } from '@/db';
import { products as productsTable } from '@/db/schema';
import { desc } from 'drizzle-orm';
import InventoryClient from './inventory-client';

export default async function InventoryPage() {
  const products = await db.select().from(productsTable).orderBy(desc(productsTable.createdAt));

  return <InventoryClient initialProducts={products} />;
}
