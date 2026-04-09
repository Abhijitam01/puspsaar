import { db } from '@/db';
import { products, orders, orderItems, siteSettings, users } from '@/db/schema';
import { eq, desc, sql, and, ne } from 'drizzle-orm';

// --- Products Queries ---

export async function getProducts() {
  return await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
  });
}

export async function getFeaturedProducts(limit = 4) {
  return await db.query.products.findMany({
    orderBy: [desc(products.price)], // Similar to current logic
    limit,
  });
}

export async function getProductById(id: string) {
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0] || null;
}

export async function getRelatedProducts(category: string, excludeId: string, limit = 4) {
  return await db.query.products.findMany({
    where: and(
      eq(products.category, category),
      ne(products.id, excludeId)
    ),
    limit,
  });
}

export async function getProductsByCategory(category: string) {
  return await db.query.products.findMany({
    where: eq(products.category, category),
    orderBy: [desc(products.createdAt)],
  });
}

export async function updateProductStock(id: string, newStock: number) {
  return await db
    .update(products)
    .set({ stockQuantity: newStock })
    .where(eq(products.id, id));
}

export async function createProduct(data: any) {
  return await db.insert(products).values(data).returning();
}

// --- Orders Queries ---

export async function getOrders() {
  return await db.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
  });
}

export async function getOrdersWithItems() {
  return await db.query.orders.findMany({
    with: {
      items: true // Assuming we define relations in schema, or we do a join
    },
    orderBy: [desc(orders.createdAt)],
  });
}

// For now, simple queries if relations aren't set up yet
export async function getOrderById(id: string) {
  const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!order) return null;

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return { ...order, order_items: items };
}

export async function getOrdersByUserId(userId: string) {
  const result = await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  
  // Fetch items for each order
  const ordersWithItems = await Promise.all(result.map(async (order) => {
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
    return { ...order, order_items: items };
  }));

  return ordersWithItems;
}

export async function createOrder(orderData: any, itemsData: any[]) {
  return await db.transaction(async (tx) => {
    const [newOrder] = await tx.insert(orders).values(orderData).returning();
    
    const itemsToInsert = itemsData.map(item => ({
      ...item,
      orderId: newOrder.id
    }));

    await tx.insert(orderItems).values(itemsToInsert);
    
    return newOrder;
  });
}

// --- Settings Queries ---

export async function getAllSettings() {
  const result = await db.select().from(siteSettings);
  return result.reduce((acc: any, curr) => {
    acc[curr.id] = curr.value;
    return acc;
  }, {});
}

export async function updateSetting(id: string, value: any) {
  return await db
    .insert(siteSettings)
    .values({ id, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: [siteSettings.id],
      set: { value, updatedAt: new Date() }
    });
}
