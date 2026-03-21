'use client';

import Breadcrumb from '@/components/product/common/breadcrumb';
import FilterBar from '@/components/product/common/filter-bar';
import TabSwitcher from '@/components/product/common/tab-switcher';
import ProductCard from '@/components/product/productcard';
import { products } from '@/data/pooja-product-data';

export default function ProductPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Breadcrumb />
      <TabSwitcher />
      {/* Added stable spacing wrapper to avoid layout jump */}
      <div className="relative">
        <FilterBar />
      </div>
      <main className="flex-1 max-w-8xl mx-auto px-6 py-4">
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
