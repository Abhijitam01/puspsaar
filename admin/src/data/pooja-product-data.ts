import { IProduct } from "@/components/product/productcard";

export const products: IProduct[] = [
  {
    id: 1,
    name: 'Diya',
    subtitle: 'Handcrafted decorative oil lamp',
    price: 417,
    originalPrice: 1099,
    discount: '62% OFF',
    rating: 4.3,
    ratingCount: '4.5k',
    image: 'https://villagedecor.in/cdn/shop/files/Offer_Image_30.png?v=1758358708&width=2048',
    size: ['S', 'M', 'XL', 'XXl']
  },
  {
    id: 2,
    name: 'Kumkum',
    subtitle: 'Traditional pooja kumkum pack',
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    rating: 4.5,
    ratingCount: '104',
    image: 'https://www.srishtiusa.com/assets/images/newimages/religious%20pooja/pooja%20items-2025/spyu282-tt.jpg',
    size: ['S', 'M', 'XXl']
  },
  {
    id: 3,
    name: 'Chhat Pooja Chaup',
    subtitle: 'Traditional pooja decoration item',
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    size: ['M', 'L', 'XL', 'XXl'],
    rating: 4.5,
    ratingCount: '104',
    image: 'https://m.media-amazon.com/images/I/71rmJxJevNL._UF350,350_QL80_.jpg',
  },
  {
    id: 4,
    name: 'Diwali',
    subtitle: 'Festive decoration set for Diwali',
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    rating: 4.5,
    ratingCount: '104',
    size: ['S', 'M', 'L', 'XL', 'XXl'],
    image: 'https://utsavcollection.com/cdn/shop/files/1.2WarmwhitesteadyLEDDiyaLights.jpg?v=1726558791',
  },
  {
    id: 5,
    name: 'Agarbatti',
    subtitle: 'Fragrant incense sticks for pooja',
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    rating: 4.5,
    ratingCount: '104',
    size: ['S', 'M', 'L', 'XL'],
    image: 'https://m.media-amazon.com/images/I/81NaYmwNL5L._UF1000,1000_QL80_.jpg',
  },
  {
    id: 6,
    name: 'Pooja Thali',
    subtitle: 'Brass thali set for rituals',
    price: 417,
    originalPrice: 1099,
    discount: '62% OFF',
    rating: 4.3,
    ratingCount: '4.5k',
    size: ['S', 'M', 'XL', 'XXl'],
    image: 'https://jainartvilla.in/cdn/shop/files/Brass-puja-thali-10-pc.jpg?v=1717669017'
  },
  {
    id: 7,
    name: 'Diya Stand',
    subtitle: 'Decorative stand for oil lamps',
    price: 417,
    originalPrice: 1099,
    discount: '62% OFF',
    rating: 4.3,
    ratingCount: '4.5k',
    size: ['S', 'M', 'L', 'XL', 'XXl'],
    image: 'https://nestasia.in/cdn/shop/files/LampSet_3.jpg?v=1709011242&width=600',
  },
  {
    id: 8,
    name: 'Sandalwood Dhoop & Incense Sticks Set',
    subtitle: 'Aromatic sandalwood incense set',
    image: "https://ambicaagarbathies.com/cdn/shop/files/GOLDEN_SANDAL_DOOP-1.jpg?v=1736402622",
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    rating: 4.5,
    ratingCount: '104',
    size: ['M', 'L', 'XL', 'XXl'],
  },
]

export const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "new", label: "What's New" },
  { value: "popularity", label: "Popularity" },
  { value: "discount", label: "Better Discount" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "rating", label: "Customer Rating" },
]

export const categories = [
  'Pooja Thali', 
  'Diyas', 
  'Incense & Dhoop', 
  'Bells & Ghanti', 
  'Kalash & Lota',
  'Pooja Books',
  'Yantra & Kawach',
  'Rudraksha'
]

export const colors = [
  { name: "Copper", count: 207, code: "#B87333" },
  { name: "Brass", count: 647, code: "#B5A642" },
  { name: "Silver", count: 583, code: "#C0C0C0" },
  { name: "Gold", count: 148, code: "#FFD700" },
  { name: "Bronze", count: 502, code: "#CD7F32" },
  { name: "White", count: 374, code: "#ffffff", border: true },
  { name: "Red", count: 240, code: "#FF0000" },
  { name: "Yellow", count: 183, code: "#FFFF00" }
]

export const brands = [
  { name: "Zevotion", count: 554 },
  { name: "Rudra Blessings", count: 385 },
  { name: "Divine Arts", count: 441 },
  { name: "Pure Devotion", count: 333 },
  { name: "Spiritual Essence", count: 430 },
  { name: "Temple Crafts", count: 373 }
]

export const discounts = [
  { label: "40% and above", value: "40" },
  { label: "50% and above", value: "50" },
  { label: "60% and above", value: "60" },
  { label: "70% and above", value: "70" },
]

export const materials = ["Copper", "Brass", "Silver", "Gold Plated", "Wood", "Crystal", "Clay"]
