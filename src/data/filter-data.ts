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
  'Compact SUVs',
  'Premium SUVs',
  'Sedans',
  'Hatchbacks',
  'Electric Vehicles',
  'Luxury & Performance',
  '4x4 & Adventure',
  'MPVs'
];

export const colors: Color[] = [
  { name: "Polar White", count: 207, code: "#f8f8f8", border: true },
  { name: "Phantom Black", count: 647, code: "#0f0f0f" },
  { name: "Titan Grey", count: 583, code: "#5f646a" },
  { name: "Deep Forest", count: 148, code: "#003d2b" },
  { name: "Lava Orange", count: 502, code: "#ff5300" },
  { name: "Sunset Red", count: 374, code: "#b71d1d" },
  { name: "Marine Blue", count: 240, code: "#0f4c81" },
  { name: "Pebble Beige", count: 183, code: "#d4c7b6" }
];

export const brands: Brand[] = [
  { name: "Hyundai", count: 554 },
  { name: "Kia", count: 385 },
  { name: "Maruti Suzuki", count: 441 },
  { name: "Tata Motors", count: 333 },
  { name: "Mahindra", count: 430 },
  { name: "Jeep", count: 373 },
  { name: "Skoda", count: 290 },
  { name: "BMW", count: 150 }
];

export const discounts: Discount[] = [
  { label: "40% and above", value: "40" },
  { label: "50% and above", value: "50" },
  { label: "60% and above", value: "60" },
  { label: "70% and above", value: "70" },
];

export const materials: string[] = [
  "Petrol",
  "Diesel",
  "Turbo Petrol",
  "Electric",
  "Hybrid",
  "Manual",
  "Automatic (AT)",
  "DCT / CVT"
];
