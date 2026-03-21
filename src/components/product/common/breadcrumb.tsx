'use client';
import React from 'react';

export default function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60">
      <span className="text-white">Home</span>
      <span className="text-white/40">/</span>
      <span className="text-white">Velaire House</span>
      <span className="text-white/40">/</span>
      <span className="text-secondary">Certified Inventory</span>
    </nav>
  );
}
