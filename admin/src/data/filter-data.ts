export interface SortOption {
  value: string;
  label: string;
}

export interface Color {
  name: string;
  count: number;
  code: string;
  border?: boolean;
}

export interface Brand {
  name: string;
  count: number;
}

export interface Discount {
  label: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "new", label: "What's New" },
  { value: "popularity", label: "Popularity" },
  { value: "discount", label: "Better Discount" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "rating", label: "Customer Rating" },
];

export const categories: string[] = [
  'Pooja Thali', 
  'Diyas', 
  'Incense & Dhoop', 
  'Bells & Ghanti', 
  'Kalash & Lota',
  'Pooja Books',
  'Yantra & Kawach',
  'Rudraksha'
];

export const colors: Color[] = [
  { name: "Copper", count: 207, code: "#B87333" },
  { name: "Brass", count: 647, code: "#B5A642" },
  { name: "Silver", count: 583, code: "#C0C0C0" },
  { name: "Gold", count: 148, code: "#FFD700" },
  { name: "Bronze", count: 502, code: "#CD7F32" },
  { name: "White", count: 374, code: "#ffffff", border: true },
  { name: "Red", count: 240, code: "#FF0000" },
  { name: "Yellow", count: 183, code: "#FFFF00" }
];

export const brands: Brand[] = [
  { name: "Zevotion", count: 554 },
  { name: "Rudra Blessings", count: 385 },
  { name: "Divine Arts", count: 441 },
  { name: "Pure Devotion", count: 333 },
  { name: "Spiritual Essence", count: 430 },
  { name: "Temple Crafts", count: 373 }
];

export const discounts: Discount[] = [
  { label: "40% and above", value: "40" },
  { label: "50% and above", value: "50" },
  { label: "60% and above", value: "60" },
  { label: "70% and above", value: "70" },
];

export const materials: string[] = [
  "Copper", 
  "Brass", 
  "Silver", 
  "Gold Plated", 
  "Wood", 
  "Crystal", 
  "Clay"
];
