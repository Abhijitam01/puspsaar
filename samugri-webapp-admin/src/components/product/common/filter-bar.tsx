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
        'w-full border-b py-3 transition-all duration-300',
        isSticky
          ? 'fixed top-0 left-0 z-50 bg-white shadow-sm'
          : 'relative bg-white my-4'
      )}
    >
      <div className="max-w-8xl mx-auto flex flex-wrap gap-3 px-6">
        {/* Filters Button */}
        <Button
          variant="outline"
          className="text-gray-600 text-sm rounded-md shadow-none h-11 px-4"
          onClick={() => setFilterOpen(true)} // open FilterDialog
        >
          <Settings2 className="mr-2 w-4 h-4" />
          Filters
        </Button>

        {/* Brand Button */}
        <Button
          variant="outline"
          className="text-gray-600 text-sm rounded-md shadow-none h-11 px-4"
        >
          <Ribbon className="mr-2 w-4 h-4" />
          Brand
        </Button>

        {/* Category Dialog */}
        <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-gray-600 text-sm rounded-md shadow-none h-11 px-4"
              onClick={() => setCategoryOpen(true)} // open category dialog only
            >
              Category
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800">
                Category
              </DialogTitle>
            </DialogHeader>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search here"
                className="pl-9 h-11 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="flex justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                className="text-gray-600 bg-gray-50"
                onClick={() => setSearch('')}
              >
                Clear all
              </Button>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-white"
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
