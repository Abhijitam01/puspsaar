import { createClient } from '@/lib/supabase/server';
import InventoryClient from './inventory-client';

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return <InventoryClient initialProducts={products || []} />;
}
