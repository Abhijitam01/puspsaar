import { createClient } from '@supabase/supabase-js';
import { perfumeProducts } from './src/data/perfume-data';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function seed() {
  const productsToInsert = perfumeProducts.map(p => ({
    name: p.name,
    brand: p.brand,
    subtitle: p.subtitle,
    description: p.description,
    price: p.price,
    original_price: p.originalPrice,
    image: p.image,
    tags: p.tags || [],
    volume: p.volumes[0],
    concentration: p.concentration,
    fragrance_notes: p.fragranceNotes,
    stock_quantity: 50 // default stock
  }));

  const { data, error } = await supabase.from('products').insert(productsToInsert);
  
  if (error) {
    console.error('Seed error:', error);
  } else {
    console.log('Seeded successfully!', data);
  }
}

seed();
