'use client';

import { useEffect, useRef, useState } from 'react';
import { Settings2, ChevronDown, Search, Ribbon, X } from 'lucide-react';
import clsx from 'clsx';
import FilterDialog from './filter-dialog';

export default function FilterBar() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const { top } = barRef.current.getBoundingClientRect();
      setIsSticky(top <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className={clsx(
        'w-full border border-[#E0E0E0] bg-white transition-all duration-300',
        isSticky ? 'fixed top-0 left-0 right-0 z-40 shadow-sm' : 'relative my-4'
      )}
    >
      <div className="mx-auto flex flex-wrap items-center gap-2 px-4 py-3">
        {/* Filters Button */}
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 border border-[#E0E0E0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors"
        >
          <Settings2 className="w-3.5 h-3.5" />
          Filters
        </button>

        {/* Collections Button */}
        <button className="flex items-center gap-2 border border-[#E0E0E0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors">
          <Ribbon className="w-3.5 h-3.5" />
          Collections
        </button>

        {/* Segments Button */}
        <button
          onClick={() => setCategoryOpen(true)}
          className="flex items-center gap-2 border border-[#E0E0E0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors"
        >
          Segments
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Dialog */}
      {categoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
          <div className="w-full max-w-md bg-white border border-[#E0E0E0]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1C1C1C]">Browse Segments</h3>
              <button onClick={() => setCategoryOpen(false)} className="text-[#6B6B6B] hover:text-[#1C1C1C]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ABABAB]" />
                <input
                  placeholder="Search segments"
                  className="w-full pl-9 pr-4 py-2.5 border border-[#E0E0E0] text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#E0E0E0]">
              <button
                onClick={() => setSearch('')}
                className="px-4 py-2 border border-[#E0E0E0] text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setCategoryOpen(false)}
                className="px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#1C1C1C] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Dialog */}
      <FilterDialog open={filterOpen} setOpen={setFilterOpen} />
    </div>
  );
}
