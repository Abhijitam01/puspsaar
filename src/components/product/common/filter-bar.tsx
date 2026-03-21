'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings2, ChevronDown, Search, Ribbon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import FilterDialog from './filter-dialog';

export default function FilterBar() {
  const [filterOpen, setFilterOpen] = useState(false); // separate state for Filter Dialog
  const [categoryOpen, setCategoryOpen] = useState(false); // separate state for Category Dialog
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
        'w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300',
        isSticky ? 'fixed top-4 left-1/2 z-40 max-w-5xl -translate-x-1/2 shadow-2xl' : 'relative my-4'
      )}
    >
      <div className="mx-auto flex flex-wrap gap-3 px-4 py-3 text-white">
        {/* Filters Button */}
        <Button
          variant="outline"
          className="text-white text-sm rounded-full border-white/30 bg-white/10 shadow-none h-11 px-4 hover:bg-white/20"
          onClick={() => setFilterOpen(true)} // open FilterDialog
        >
          <Settings2 className="mr-2 w-4 h-4" />
          Filters
        </Button>

        {/* Brand Button */}
        <Button
          variant="outline"
          className="text-white text-sm rounded-full border-white/30 bg-white/10 shadow-none h-11 px-4 hover:bg-white/20"
        >
          <Ribbon className="mr-2 w-4 h-4" />
          Collections
        </Button>

        {/* Category Dialog */}
        <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-white text-sm rounded-full border-white/30 bg-white/10 shadow-none h-11 px-4 hover:bg-white/20"
              onClick={() => setCategoryOpen(true)} // open category dialog only
            >
              Segments
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md rounded-2xl border border-white/10 bg-[#070912] text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-white">
                Browse segments
              </DialogTitle>
            </DialogHeader>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search here"
                className="pl-9 h-11 font-medium bg-white/5 border-white/20 text-white placeholder:text-white/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="flex justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                className="text-white bg-white/5 hover:bg-white/10"
                onClick={() => setSearch('')}
              >
                Clear all
              </Button>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={() => setCategoryOpen(false)}
              >
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Dialog */}
      <FilterDialog open={filterOpen} setOpen={setFilterOpen} />
    </div>
  );
}
