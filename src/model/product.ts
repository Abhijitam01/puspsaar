// Perfume product model for Puspsaar

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export type PerfumeCategory = 'Men' | 'Women' | 'Unisex';
export type Concentration = 'EDP' | 'EDT' | 'Parfum' | 'EDC';

export interface IPerfumeProduct {
  id: string | number;
  name: string;
  brand: string;
  subtitle: string;          // Short tagline e.g. "Fresh Aquatic • Intense"
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  category: PerfumeCategory;
  concentration: Concentration;
  volumes: string[];         // e.g. ["50ml", "100ml"]
  images: string[];
  image: string;             // primary image
  rating: number;
  ratingCount: string;
  fragrance_notes: FragranceNotes;
  tags: string[];
  stock: number;
  isFeatured?: boolean;
}

// Legacy compatibility — keep IProduct alias
export type IProduct = IPerfumeProduct;