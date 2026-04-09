'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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
      image: imageUrl || formData.get('imageUrl'),
      volume: formData.get('volume'),
      concentration: formData.get('concentration'),
      stockQuantity: Number(formData.get('stock')),
      fragranceNotes: {
        top: topNotes,
        middle: middleNotes,
        base: baseNotes
      }
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Failed to add product');

      toast.success('Perfume added successfully!');
      router.push('/admin/inventory');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-20">
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

      <div className="bg-card border rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Image URL */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-[#C6A969]">Product Visual</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Image URL</label>
                  <Input 
                    name="imageUrl" 
                    placeholder="https://images.unsplash.com/..." 
                    className="bg-muted/30 border-none h-11"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl border border-muted-foreground/20 overflow-hidden bg-muted/30 flex flex-col items-center justify-center transition-all">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                       </div>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider text-center">Preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-widest text-[#C6A969]">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Fragrance Name</label>
                    <Input name="name" required placeholder="e.g. Noir Extrême" className="bg-muted/30 border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Brand</label>
                    <Input name="brand" required placeholder="e.g. Tom Ford" className="bg-muted/30 border-none h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Subtitle / Tagline</label>
                  <Input name="subtitle" placeholder="e.g. A daring, spicy oriental" className="bg-muted/30 border-none h-11" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-widest text-[#C6A969]">Inventory & Volume</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Price (₹)</label>
                    <Input type="number" name="price" required placeholder="8500" className="bg-muted/30 border-none h-11" min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Stock</label>
                    <Input type="number" name="stock" required placeholder="50" className="bg-muted/30 border-none h-11" min="0" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Volume</label>
                    <Input name="volume" required placeholder="100ml" className="bg-muted/30 border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Grade</label>
                    <select name="concentration" className="w-full bg-muted/30 border-none rounded-md px-3 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A969]/50">
                      <option value="EDP">Eau de Parfum (EDP)</option>
                      <option value="EDT">Eau de Toilette (EDT)</option>
                      <option value="Parfum">Parfum</option>
                      <option value="EDC">Eau de Cologne (EDC)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-[#C6A969]">Olfactory Pyramid (Comma separated)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Top Notes</label>
                <Input name="topNotes" placeholder="Bergamot, Lemon" className="bg-muted/30 border-none h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Middle Notes</label>
                <Input name="middleNotes" placeholder="Rose, Jasmine" className="bg-muted/30 border-none h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Base Notes</label>
                <Input name="baseNotes" placeholder="Vanilla, Musk" className="bg-muted/30 border-none h-11" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-[#C6A969]">Story & Description</h3>
            <div className="space-y-2">
              <Textarea name="description" rows={5} placeholder="The narrative behind the fragrance..." className="bg-muted/30 border-none rounded-xl p-4 resize-none" />
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-[#C6A969] text-black hover:bg-[#C6A969]/90 font-bold px-10 py-6 rounded-xl shadow-lg transition-all"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Archiving...' : 'List Fragrance'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
