import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../src/db/index';
import { products as productsTable } from '../src/db/schema';
import { perfumeProducts } from '../src/data/perfume-data';

async function seed() {
  console.log('--- Seeding NeonDB Products ---');
  
  const productsToInsert = perfumeProducts.map(p => ({
    name: p.name,
    brand: p.brand,
    subtitle: p.subtitle,
    description: p.description,
    price: p.price.toString(),
    originalPrice: p.originalPrice?.toString(),
    image: p.image,
    tags: p.tags || [],
    volume: p.volumes[0],
    concentration: p.concentration,
    fragranceNotes: p.fragrance_notes,
    stockQuantity: 50 // default stock
  }));

  try {
    await db.insert(productsTable).values(productsToInsert as any);
    console.log('Seeded successfully!');
  } catch (error) {
    console.error('Seed error:', error);
  }
}

seed();
