interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  brand?: string
  category?: string
}

interface OrderTracking {
  status: string
  timestamp: string
  location?: string
  description: string
  completed: boolean
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  total: number
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
  deliveryAddress: {
    name: string
    address: string
    city: string
    pincode: string
    phone: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  tracking?: OrderTracking[]
  canCancel: boolean
  canReturn: boolean
  returnWindow?: string
}

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-02-10',
    status: 'delivered',
    total: 1299,
    trackingNumber: 'TRK-PSG-1001',
    estimatedDelivery: '2024-02-14',
    deliveryAddress: {
      name: 'Radha Kumari',
      address: 'Braham Sathan Kurthoul, Near Pillar No.75',
      city: 'Patna',
      pincode: '804453',
      phone: '+91 98765 12345'
    },
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    canCancel: false,
    canReturn: true,
    returnWindow: '2024-03-01',
    tracking: [
      { status: 'Order Placed', timestamp: '2024-02-10T09:00:00Z', description: 'Your pooja Samugri order has been placed successfully', completed: true },
      { status: 'Confirmed', timestamp: '2024-02-10T10:30:00Z', description: 'Order confirmed and payment received', completed: true },
      { status: 'Packed', timestamp: '2024-02-11T12:00:00Z', location: 'Patna Warehouse', description: 'Items packed and ready for shipment', completed: true },
      { status: 'Shipped', timestamp: '2024-02-12T08:45:00Z', location: 'Patna Hub', description: 'Package shipped from warehouse', completed: true },
      { status: 'Delivered', timestamp: '2024-02-14T17:20:00Z', location: 'Patna', description: 'Delivered successfully at your address', completed: true }
    ],
    items: [
      {
        id: 1,
        name: "Brass Diya (Set of 2)",
        price: 499,
        image: "https://images.meesho.com/images/products/467754503/quvwe_512.webp?width=512",
        size: "Medium",
        color: "Gold",
        quantity: 1,
        brand: "PoojaGhar",
        category: "Pooja Items"
      },
      {
        id: 2,
        name: "Panchmeva Mix 250g",
        price: 300,
        image: "https://rukminim2.flixcart.com/image/480/640/xif0q/nut-dry-fruit/k/o/j/425-dry-fruit-mix-panchmeva-superfood-1-mason-jar-farmley-original-imah3pwtubhwggza.jpeg?q=90",
        size: "250g",
        color: "Natural",
        quantity: 1,
        brand: "Divya Samugri",
        category: "Offerings"
      },
      {
        id: 3,
        name: "Sandalwood Incense Sticks (50 pcs)",
        price: 500,
        image: "https://www.samskarahome.com/cdn/shop/files/SugandhManjari_Setof4fragrances_50pcsIncense1.jpg?v=1693811316&width=1080",
        size: "50 sticks",
        color: "Brown",
        quantity: 1,
        brand: "Divine Aroma",
        category: "Fragrance"
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-05',
    status: 'shipped',
    total: 899,
    trackingNumber: 'TRK-PSG-1002',
    estimatedDelivery: '2024-03-09',
    deliveryAddress: {
      name: 'Karishma Kumari',
      address: 'Braham Sathan Kurthoul, Near Pillar No.55',
      city: 'Patna',
      pincode: '804453',
      phone: '+91 98765 12345'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    canCancel: false,
    canReturn: true,
    returnWindow: '2024-03-25',
    tracking: [
      { status: 'Order Placed', timestamp: '2024-03-05T09:00:00Z', description: 'Your pooja Samugri order has been placed successfully', completed: true },
      { status: 'Confirmed', timestamp: '2024-03-05T10:00:00Z', description: 'Order confirmed and payment verified', completed: true },
      { status: 'Packed', timestamp: '2024-03-06T08:00:00Z', description: 'Samugri packed for dispatch', completed: true },
      { status: 'Shipped', timestamp: '2024-03-07T12:00:00Z', location: 'Patna Hub', description: 'Shipment on the way', completed: false }
    ],
    items: [
      {
        id: 4,
        name: "Pooja Thali Set (Brass)",
        price: 899,
        image: "https://cdn.exoticindia.com/images/products/original/sculptures-2019/mis947_a01.jpg",
        size: "Standard",
        color: "Golden",
        quantity: 1,
        brand: "PoojaGhar",
        category: "Pooja Accessories"
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-12',
    status: 'confirmed',
    total: 699,
    deliveryAddress: {
      name: 'Durga parsad',
      address: 'Braham Sathan Kurthoul, Near Pillar No.66',
      city: 'Patna',
      pincode: '804453',
      phone: '+91 98765 12345'
    },
    paymentMethod: 'Net Banking',
    paymentStatus: 'paid',
    canCancel: true,
    canReturn: false,
    tracking: [
      { status: 'Order Placed', timestamp: '2024-03-12T11:00:00Z', description: 'Your order has been placed successfully', completed: true },
      { status: 'Confirmed', timestamp: '2024-03-12T12:30:00Z', description: 'Order confirmed and preparing items', completed: true },
      { status: 'Processing', timestamp: '2024-03-13T09:00:00Z', description: 'Order is being packed', completed: false }
    ],
    items: [
      {
        id: 5,
        name: "Diya",
        price: 699,
        image: "https://m.media-amazon.com/images/I/61sCILZaGJL.jpg",
        size: "200g",
        color: "White",
        quantity: 1,
        brand: "Divine Essence",
        category: "Fragrance"
      }
    ]
  },
  {
    id: 'ORD-2024-004',
    date: '2024-02-01',
    status: 'cancelled',
    total: 499,
    deliveryAddress: {
      name: 'Rita Kumari',
      address: 'Braham Sathan Kurthoul, Near Pillar No.45',
      city: 'Patna',
      pincode: '804453',
      phone: '+91 98765 12345'
    },
    paymentMethod: 'UPI',
    paymentStatus: 'refunded',
    canCancel: false,
    canReturn: false,
    items: [
      {
        id: 6,
        name: "Rudraksha Mala (108 Beads)",
        price: 499,
        image: "https://www.adiyogirudraksh.com/cdn/shop/files/DSC0851-2-scaled.jpg?v=1713383368",
        size: "108 Beads",
        color: "Brown",
        quantity: 1,
        brand: "Spiritual Bliss",
        category: "Spiritual Accessories"
      }
    ]
  }
];
