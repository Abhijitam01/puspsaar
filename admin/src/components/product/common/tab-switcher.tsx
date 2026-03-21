'use client';
import { useState } from 'react';
import { UtensilsCrossed, Bike, ShoppingBagIcon, ShoppingBasket } from 'lucide-react';

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<'dining' | 'delivery'>('delivery');

  return (
    <>
    <div className="flex items-center gap-10 px-6 border-b border-gray-100 mt-4">
      <button
        onClick={() => setActiveTab('dining')}
        className={`flex items-center gap-2 pb-2 border-b-2  ${
          activeTab === 'dining'
            ? 'border-tertiary text-tertiary'
            : 'border-transparent text-gray-600 hover:text-tertiary '
        }`}
      >
        <ShoppingBasket className="w-15 h-15 rounded-full text-gray-400 p-2 bg-gray-50" />
        <span className="font-medium text-lg">Shopping </span>
      </button>

      <button
        onClick={() => setActiveTab('delivery')}
        className={`flex items-center gap-2 pb-2 border-b-2  ${
          activeTab === 'delivery'
            ? 'border-tertiary text-tertiary'
            : 'border-transparent text-gray-600 hover:text-tertiary'
        }`}
      >
        <Bike className="w-15 h-15 rounded-full border p-2 border-tertiary" />
        <span className="font-medium text-lg">Delivery</span>
      </button>
    </div>
     </>
  );
}
