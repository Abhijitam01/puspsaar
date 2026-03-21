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
    id: 'VLR-2025-001',
    date: '2025-01-28',
    status: 'delivered',
    total: 1825000,
    trackingNumber: 'VLR-HYD-001',
    estimatedDelivery: '2025-02-02',
    deliveryAddress: {
      name: 'Ankit Sharma',
      address: 'Velaire Signature Residency, HSR Layout',
      city: 'Bengaluru',
      pincode: '560102',
      phone: '+91 99800 12345'
    },
    paymentMethod: 'Velaire Capital (HDFC)',
    paymentStatus: 'paid',
    canCancel: false,
    canReturn: true,
    returnWindow: '2025-02-09',
    tracking: [
      { status: 'Booking Confirmed', timestamp: '2025-01-28T10:00:00Z', description: 'Vehicle reserved with ₹50,000 token', completed: true },
      { status: 'Inspection & Detailing', timestamp: '2025-01-29T08:00:00Z', description: 'Velaire certified inspection completed', completed: true },
      { status: 'RTO & Insurance', timestamp: '2025-01-30T11:30:00Z', description: 'Ownership transfer & zero-dep insurance initiated', completed: true },
      { status: 'Ready for Delivery', timestamp: '2025-02-01T15:45:00Z', description: 'Ceramic coating & interior deep clean done', completed: true },
      { status: 'Delivered', timestamp: '2025-02-02T17:15:00Z', description: 'Handover completed at Velaire Residency', completed: true }
    ],
    items: [
      {
        id: 101,
        name: "2022 Hyundai Creta SX (O) Turbo",
        price: 1725000,
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
        size: "Turbo Petrol AT",
        color: "Titan Grey",
        quantity: 1,
        brand: "Hyundai Velaire Select",
        category: "Compact SUV"
      },
      {
        id: 102,
        name: "Vault Shield Max Warranty",
        price: 54000,
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        size: "24M / 40,000 km",
        color: "Protection Plan",
        quantity: 1,
        brand: "Velaire Vault",
        category: "Warranty"
      },
      {
        id: 103,
        name: "Ceramic Coating & Detailing",
        price: 20000,
        image: "https://images.unsplash.com/photo-1514312001557-1625a3a5474e?auto=format&fit=crop&w=900&q=80",
        size: "Detailing",
        color: "Studio Finish",
        quantity: 1,
        brand: "Velaire Care",
        category: "Value Added"
      }
    ]
  },
  {
    id: 'VLR-2025-002',
    date: '2025-02-12',
    status: 'shipped',
    total: 1588000,
    trackingNumber: 'VLR-KIA-205',
    estimatedDelivery: '2025-02-16',
    deliveryAddress: {
      name: 'Priya Nair',
      address: 'Velaire Express Delivery, Jubilee Hills',
      city: 'Hyderabad',
      pincode: '500033',
      phone: '+91 98450 98765'
    },
    paymentMethod: 'UPI + Finance',
    paymentStatus: 'paid',
    canCancel: false,
    canReturn: true,
    returnWindow: '2025-02-23',
    tracking: [
      { status: 'Booking Confirmed', timestamp: '2025-02-12T09:00:00Z', description: 'Velaire advisor assigned', completed: true },
      { status: 'Detailing in Progress', timestamp: '2025-02-13T13:00:00Z', description: 'Leather conditioning & paint correction ongoing', completed: true },
      { status: 'Transit to City Hub', timestamp: '2025-02-14T08:30:00Z', location: 'Velaire Transit Hub', description: 'Vehicle en route to Hyderabad hub', completed: true },
      { status: 'Out for Delivery', timestamp: '2025-02-15T14:30:00Z', location: 'Hyderabad Hub', description: 'Driver & paperwork dispatched', completed: false }
    ],
    items: [
      {
        id: 201,
        name: "2021 Kia Seltos GTX+ DCT",
        price: 1830000,
        image: "https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=900&q=80",
        size: "Turbo Petrol DCT",
        color: "Aurora Black Pearl",
        quantity: 1,
        brand: "Kia Velaire Elite",
        category: "SUV"
      },
      {
        id: 202,
        name: "Exchange Benefit",
        price: -320000,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
        size: "2017 Honda City",
        color: "Exchange",
        quantity: 1,
        brand: "Velaire Exchange",
        category: "Exchange"
      }
    ]
  },
  {
    id: 'VLR-2025-003',
    date: '2025-02-18',
    status: 'confirmed',
    total: 52000,
    deliveryAddress: {
      name: 'Rahul Verma',
      address: 'Velaire Test Track, Sector 29',
      city: 'Gurgaon',
      pincode: '122009',
      phone: '+91 98110 55544'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    canCancel: true,
    canReturn: false,
    tracking: [
      { status: 'Test Drive Scheduled', timestamp: '2025-02-18T08:00:00Z', description: 'Advisor assigned & routes planned', completed: true },
      { status: 'Vehicle Prepped', timestamp: '2025-02-18T10:30:00Z', description: 'Tyre pressure, fuel, detailing completed', completed: true },
      { status: 'Awaiting Customer', timestamp: '2025-02-18T12:30:00Z', description: 'Vehicle staged at Gurgaon test track', completed: false }
    ],
    items: [
      {
        id: 301,
        name: "Test Drive Slot - BMW 330Li M Sport",
        price: 2000,
        image: "https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=900&q=80",
        size: "Petrol AT",
        color: "Mineral White",
        quantity: 1,
        brand: "BMW Velaire Luxe",
        category: "Test Drive"
      },
      {
        id: 302,
        name: "Refundable Booking Token",
        price: 50000,
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        size: "Priority Booking",
        color: "Token",
        quantity: 1,
        brand: "Velaire Reserve",
        category: "Booking"
      }
    ]
  },
  {
    id: 'VLR-2025-004',
    date: '2025-01-15',
    status: 'cancelled',
    total: 75000,
    deliveryAddress: {
      name: 'Neha Patil',
      address: 'Velaire Concierge, Kalyani Nagar',
      city: 'Pune',
      pincode: '411006',
      phone: '+91 97654 32109'
    },
    paymentMethod: 'UPI',
    paymentStatus: 'refunded',
    canCancel: false,
    canReturn: false,
    items: [
      {
        id: 401,
        name: "Reservation - 2020 Jeep Compass Limited",
        price: 75000,
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
        size: "Diesel 4x4",
        color: "Minimal Grey",
        quantity: 1,
        brand: "Jeep Velaire Trail",
        category: "Reservation"
      }
    ]
  }
];
