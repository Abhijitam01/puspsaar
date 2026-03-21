'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { IPerfumeProduct } from '@/model/product';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Search, PackagePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';

export default function InventoryClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClient();

  const handleUpdateStock = async (id: string, currentStock: number, change: number) => {
    const newStock = Math.max(0, currentStock + change);
    
    // Optimistic UI update
    setProducts(prev => 
      prev.map(p => p.id === id ? { ...p, stock_quantity: newStock } : p)
    );

    const { error } = await supabase
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update stock');
      // Revert optimism
      setProducts(prev => 
        prev.map(p => p.id === id ? { ...p, stock_quantity: currentStock } : p)
      );
    } else {
      toast.success(change > 0 ? 'Stock augmented' : 'Stock reduced');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage your perfume catalog and stock levels.</p>
        </div>
        <Link href="/admin/product/add">
          <Button className="bg-[#C6A969] text-black hover:bg-[#C6A969]/90 font-semibold shadow-md">
            <PackagePlus className="w-4 h-4 mr-2" />
            Add Perfume
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2 bg-background/50 border rounded-lg max-w-sm px-3 py-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search fragrances..." 
          className="border-none shadow-none bg-transparent h-8 p-0 focus-visible:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-xl border overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Stock Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover border" />
                    <div>
                      <div className="font-semibold text-foreground">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.brand} - {product.volume}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {product.concentration}
                  </Badge>
                </TableCell>
                <TableCell>₹{product.price.toLocaleString()}</TableCell>
                <TableCell>
                  {product.stock_quantity > 10 ? (
                    <Badge variant="default" className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20">In Stock</Badge>
                  ) : product.stock_quantity > 0 ? (
                    <Badge variant="default" className="bg-amber-500/15 text-amber-500 hover:bg-amber-500/20">Low Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full border-muted-foreground/30 hover:border-[#C6A969] hover:text-[#C6A969]"
                      onClick={() => handleUpdateStock(product.id, product.stock_quantity, -1)}
                      disabled={product.stock_quantity <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{product.stock_quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full border-muted-foreground/30 hover:border-[#C6A969] hover:text-[#C6A969]"
                      onClick={() => handleUpdateStock(product.id, product.stock_quantity, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No fragrances found. Let's add some to your collection.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
