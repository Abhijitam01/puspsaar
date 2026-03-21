'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast.error('Error uploading image: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let imageUrl = 'https://images.unsplash.com/photo-1594035910387-fea47728cefd?w=800&auto=format&fit=crop';
    
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setIsSubmitting(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

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
      image: imageUrl,
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
            {/* Left Column: Image Upload */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-[#C6A969]">Product Visual</h3>
              <div className="relative group aspect-[3/4] rounded-2xl border-2 border-dashed border-muted-foreground/20 overflow-hidden bg-muted/30 flex flex-col items-center justify-center transition-all hover:border-[#C6A969]/50">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <div className="flex flex-col items-center text-white text-xs font-bold uppercase tracking-widest">
                        <Upload className="w-6 h-6 mb-2" />
                        Change Image
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Click to upload image</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">JPG, PNG or WEBP</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 text-[#C6A969] animate-spin" />
                  </div>
                )}
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
              disabled={isSubmitting || uploading} 
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
