import { pgTable, text, numeric, timestamp, boolean, uuid, jsonb, integer } from 'drizzle-orm/pg-core';

// --- Users (Auth) ---
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // Hashed bcrypt password
  role: text('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- Products ---
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  brand: text('brand'),
  subtitle: text('subtitle'),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric('original_price', { precision: 10, scale: 2 }),
  category: text('category'),
  concentration: text('concentration'),
  volume: text('volume'),
  volumes: text('volumes').array(), // Drizzle handles text[] as arrays
  image: text('image'),
  images: text('images').array(),
  stockQuantity: integer('stock_quantity').default(0),
  rating: numeric('rating', { precision: 3, scale: 2 }).default('0'),
  ratingCount: integer('rating_count').default(0),
  fragranceNotes: jsonb('fragrance_notes').default({ top: [], middle: [], base: [] }),
  tags: text('tags').array(),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Orders ---
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: text('status').default('confirmed'),
  customerName: text('customer_name'),
  customerEmail: text('customer_email'),
  customerPhone: text('customer_phone'),
  shippingAddress: text('shipping_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Order Items ---
export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: uuid('product_id').references(() => products.id),
  productName: text('product_name').notNull(),
  productImage: text('product_image'),
  volume: text('volume'),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
});

// --- Site Settings ---
export const siteSettings = pgTable('site_settings', {
  id: text('id').primaryKey(), // Using text ID as per current app
  value: jsonb('value').notNull(),
  description: text('description'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
