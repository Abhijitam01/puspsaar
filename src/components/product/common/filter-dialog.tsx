'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import clsx from 'clsx';

const filterCategories = [
  {
    title: 'Sort by',
    options: ['Popularity', 'Newest First', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'],
  },
  {
    title: 'Body Style',
    options: [
      'SUV / Crossover',
      'Sedan',
      'Hatchback',
      'Coupe',
      'MPV',
      'Pickup Truck',
    ],
  },
  {
    title: 'Price Range',
    options: ['₹3L - ₹7L', '₹7L - ₹12L', '₹12L - ₹20L', '₹20L & above'],
  },
  {
    title: 'Brand',
    options: ['Hyundai', 'Tata', 'Mahindra', 'Kia', 'Toyota', 'Honda', 'BMW', 'Mercedes'],
  },
  {
    title: 'Fuel Type',
    options: ['Petrol', 'Diesel', 'CNG', 'Hybrid', 'Electric'],
  },
  {
    title: 'Transmission',
    options: ['Manual', 'Automatic', 'iMT', 'Dual-Clutch', 'AMT'],
  },
  {
    title: 'Drivetrain',
    options: ['FWD', 'RWD', 'AWD', '4x4'],
  },
  {
    title: 'Rating',
    options: [],
  },
];

export default function FilterDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [activeCategory, setActiveCategory] = useState('Sort by');
  const [selectedOption, setSelectedOption] = useState('Popularity');
  const [rating, setRating] = useState(3.5);

  const activeOptions =
    filterCategories.find((cat) => cat.title === activeCategory)?.options || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[950px] max-w-[95vw] p-0 overflow-hidden rounded-xl">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold">Filters</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-[420px]">
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-50 border-r">
            {filterCategories.map((cat) => (
              <div
                key={cat.title}
                className={clsx(
                  'px-6 py-4 text-sm font-medium cursor-pointer border-l-4 transition-all',
                  activeCategory === cat.title
                    ? 'text-secondary border-secondary bg-white'
                    : 'text-gray-700 border-transparent hover:bg-gray-100'
                )}
                onClick={() => setActiveCategory(cat.title)}
              >
                {cat.title}
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-2/3 px-8 py-6 space-y-4">
            <h3 className="font-semibold text-gray-800">{activeCategory}</h3>

            {/* Rating Slider */}
            {activeCategory === 'Rating' ? (
              <div className="space-y-6 mt-2">
                <p className="text-2xl font-semibold text-secondary">{rating}+ </p>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-8">Any</span>
                  <div className="flex-1 relative">
                    <Slider
                      value={[rating]}
                      min={0}
                      max={5}
                      step={0.5}
                      onValueChange={(val) => setRating(val[0])}
                      className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                    />
                  </div>
                </div>

                {/* Rating Labels */}
                <div className="flex justify-between text-sm text-gray-700 mt-3 px-8">
                  <span>3.5</span>
                  <span>4.0</span>
                  <span>4.5</span>
                  <span>5.0</span>
                </div>
              </div>
            ) : activeOptions.length > 0 ? (
              activeOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="filter-option"
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="text-secondary focus:ring-secondary"
                  />
                  <span className="text-gray-700 text-md">{option}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No options available</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-end gap-3 border-t bg-white px-6 py-4">
          <Button
            variant="ghost"
            className="text-gray-600 bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              setSelectedOption('Popularity');
              setRating(3.5);
            }}
          >
            Clear all
          </Button>
          <Button
            className="bg-secondary hover:bg-secondary/90 text-white"
            onClick={() => setOpen(false)}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
