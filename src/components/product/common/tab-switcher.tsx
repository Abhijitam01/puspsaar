'use client';
import { useState } from 'react';
import { Car, Gauge } from 'lucide-react';

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<'dining' | 'delivery'>('delivery');

  return (
    <>
    <div className="mt-2 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
      <button
        onClick={() => setActiveTab('dining')}
        className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm transition ${
          activeTab === 'dining'
            ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <Car className="w-5 h-5" />
        Studio visit
      </button>

      <button
        onClick={() => setActiveTab('delivery')}
        className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm transition ${
          activeTab === 'delivery'
            ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <Gauge className="w-5 h-5" />
        Doorstep delivery
      </button>
    </div>
     </>
  );
}
