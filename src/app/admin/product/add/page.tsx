'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const topNotes = formData.get('topNotes')?.toString().split(',').map(s => s.trim()) || [];
    const middleNotes = formData.get('middleNotes')?.toString().split(',').map(s => s.trim()) || [];
    const baseNotes = formData.get('baseNotes')?.toString().split(',').map(s => s.trim()) || [];
    
    const newProduct = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      subtitle: formData.get('subtitle'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      image: formData.get('image') || 'https://images.unsplash.com/photo-1594035910387-fea47728cefd?w=800&auto=format&fit=crop',
      volume: formData.get('volume'),
      concentration: formData.get('concentration'),
      stock_quantity: Number(formData.get('stock')),
      fragrance_notes: {
        top: topNotes,
        middle: middleNotes,
        base: baseNotes
      }
    };

    const { error } = await supabase.from('products').insert([newProduct]);

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || 'Failed to add product');
    } else {
      toast.success('Perfume added successfully!');
      router.push('/admin/inventory');
      router.refresh();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/inventory">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-muted-foreground/30">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Add New Perfume</h1>
          <p className="text-muted-foreground mt-1">Fill out the details to list a new fragrance.</p>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Basic Info</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fragrance Name</label>
                <Input name="name" required placeholder="e.g. Noir Extrême" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Input name="brand" required placeholder="e.g. Tom Ford" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subtitle / Tagline</label>
                <Input name="subtitle" placeholder="e.g. A daring, spicy oriental" className="bg-muted/50" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Pricing & Stock</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (₹)</label>
                  <Input type="number" name="price" required placeholder="8500" className="bg-muted/50" min="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Initial Stock</label>
                  <Input type="number" name="stock" required placeholder="50" className="bg-muted/50" min="0" defaultValue="10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Volume</label>
                  <Input name="volume" required placeholder="100ml" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Concentration</label>
                  <select name="concentration" className="w-full bg-muted/50 border rounded-md px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A969]/50">
                    <option value="EDP">Eau de Parfum (EDP)</option>
                    <option value="EDT">Eau de Toilette (EDT)</option>
                    <option value="Parfum">Parfum</option>
                    <option value="EDC">Eau de Cologne (EDC)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Fragrance Notes (Comma separated)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Top Notes</label>
                <Input name="topNotes" placeholder="Bergamot, Lemon" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Middle Notes</label>
                <Input name="middleNotes" placeholder="Rose, Jasmine" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Notes</label>
                <Input name="baseNotes" placeholder="Vanilla, Musk" className="bg-muted/50" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Media & Details</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input name="image" placeholder="https://unsplash.com/..." className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea name="description" rows={4} placeholder="Detailed story of the fragrance..." className="bg-muted/50 resize-none" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-[#C6A969] text-black hover:bg-[#C6A969]/90 font-semibold px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Perfume'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
