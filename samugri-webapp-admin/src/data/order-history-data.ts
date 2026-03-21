import { IOrder, OrderStatus, PaymentStatus, PaymentMethod, AddressType, IOrderItem, IDeliveryAddress, IOrderStatusHistory } from '@/model/order';
import { ITimeSlot } from '@/model/timeSlot';

// Dummy delivery addresses
export const dummyDeliveryAddresses: IDeliveryAddress[] = [
  {
    id: 'addr_001',
    customerId: 'cust_001',
    fullName: 'Amrita',
    phoneNumber: '+1234567890',
    alternatePhoneNumber: '+1987654321',
    addressType: AddressType.Home,
    address: '123 Main Street, Apartment 4B',
    landmark: 'Near Central Park',
    city: 'New York',
    state: 'New York',
    pincode: '10001',
    latitude: 40.7128,
    longitude: -74.0060,
    isDefault: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z'
  },
  {
    id: 'addr_002',
    customerId: 'cust_001',
    fullName: 'Rita',
    phoneNumber: '+1234567890',
    addressType: AddressType.Work,
    address: '456 Office Tower, Floor 12',
    landmark: 'Opposite City Mall',
    city: 'New York',
    state: 'New York',
    pincode: '10002',
    latitude: 40.7139,
    longitude: -74.0070,
    isDefault: false,
    createdAt: '2024-02-10T09:15:00Z',
    updatedAt: '2024-03-25T11:45:00Z'
  },
  {
    id: 'addr_003',
    customerId: 'cust_002',
    fullName: 'Jane Smith',
    phoneNumber: '+1555666777',
    alternatePhoneNumber: '+1555888999',
    addressType: AddressType.Home,
    address: '789 Oak Avenue, Villa 5',
    landmark: 'Behind Sunrise Hospital',
    city: 'Los Angeles',
    state: 'California',
    pincode: '90001',
    latitude: 34.0522,
    longitude: -118.2437,
    isDefault: true,
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-03-18T16:20:00Z'
  },
];

// Dummy time slots
export const dummyTimeSlots: ITimeSlot[] = [
  {
    id: 'slot_001',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    date: '2024-03-25',
    maxOrders: 20,
    name:'',
   isActive: true,
    createdAt: '2024-03-20T09:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z'
  },
  {
    id: 'slot_002',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    date: '2024-03-26',
    maxOrders: 20,
    name:'',
   isActive: true,
    createdAt: '2024-03-21T09:00:00Z',
    updatedAt: '2024-03-21T09:00:00Z'
  },
  {
    id: 'slot_003',
    startTime: '3:00 PM',
    endTime: '5:00 PM',
    date: '2024-03-27',
    maxOrders: 20,
    name:'',
   isActive: true,
  
    createdAt: '2024-03-22T09:00:00Z',
    updatedAt: '2024-03-22T09:00:00Z'
  },
  {
    id: 'slot_004',
    startTime: '11:00 AM',
    endTime: '1:00 PM',
    date: '2024-04-01',
    maxOrders: 20,
   name:'',
   isActive: true,
    createdAt: '2024-03-28T09:00:00Z',
    updatedAt: '2024-03-28T09:00:00Z'
  },
];

// Dummy order items
export const dummyOrderItems: IOrderItem[] = [
  // Order 1 items
  {
    id: 'item_001',
    orderId: 'order_001',
    productId: 'prod_001',
    productName: 'Wireless Headphones Premium',
    productImage: '/placeholder-headphones.jpg',
    quantity: 1,
    unitPrice: 2500,
    totalPrice: 2500,
    specialRequirements: 'Gift wrapping required',
    createdAt: '2024-03-20T09:30:00Z',
    updatedAt: '2024-03-20T09:30:00Z'
  },
  {
    id: 'item_002',
    orderId: 'order_001',
    productId: 'prod_002',
    productName: 'Smartphone Case Protective',
    productImage: '/placeholder-case.jpg',
    quantity: 2,
    unitPrice: 500,
    totalPrice: 1000,
    createdAt: '2024-03-20T09:30:00Z',
    updatedAt: '2024-03-20T09:30:00Z'
  },
  // Order 2 items
  {
    id: 'item_003',
    orderId: 'order_002',
    productId: 'prod_003',
    productName: 'Laptop Bag Professional',
    productImage: '/placeholder-bag.jpg',
    quantity: 1,
    unitPrice: 1800,
    totalPrice: 1800,
    createdAt: '2024-03-22T14:20:00Z',
    updatedAt: '2024-03-22T14:20:00Z'
  },
  // Order 3 items
  {
    id: 'item_004',
    orderId: 'order_003',
    productId: 'prod_004',
    productName: 'Smart Watch Series 8',
    productImage: '/placeholder-watch.jpg',
    quantity: 1,
    unitPrice: 3200,
    totalPrice: 3200,
    createdAt: '2024-03-23T11:45:00Z',
    updatedAt: '2024-03-23T11:45:00Z'
  },
  // Order 4 items
  {
    id: 'item_005',
    orderId: 'order_004',
    productId: 'prod_005',
    productName: 'Bluetooth Speaker Portable',
    productImage: '/placeholder-speaker.jpg',
    quantity: 1,
    unitPrice: 1500,
    totalPrice: 1500,
    createdAt: '2024-03-28T16:30:00Z',
    updatedAt: '2024-03-28T16:30:00Z'
  },
  {
    id: 'item_006',
    orderId: 'order_004',
    productId: 'prod_006',
    productName: 'Wireless Charging Pad',
    productImage: '/placeholder-charger.jpg',
    quantity: 2,
    unitPrice: 800,
    totalPrice: 1600,
    createdAt: '2024-03-28T16:30:00Z',
    updatedAt: '2024-03-28T16:30:00Z'
  },
];

// Dummy status history
export const dummyStatusHistory: IOrderStatusHistory[] = [
  // Order 1 history
  {
    id: 'history_001',
    orderId: 'order_001',
    status: OrderStatus.PENDING,
    changedBy: 'system',
    createdAt: '2024-03-20T09:30:00Z'
  },
  {
    id: 'history_002',
    orderId: 'order_001',
    status: OrderStatus.CONFIRMED,
    changedBy: 'admin_001',
    createdAt: '2024-03-20T10:15:00Z'
  },
  {
    id: 'history_003',
    orderId: 'order_001',
    status: OrderStatus.PACKED,
    changedBy: 'warehouse_staff_001',
    createdAt: '2024-03-21T14:30:00Z'
  },
  {
    id: 'history_004',
    orderId: 'order_001',
    status: OrderStatus.OUT_FOR_DELIVERY,
    changedBy: 'delivery_manager_001',
    createdAt: '2024-03-22T09:00:00Z'
  },
  {
    id: 'history_005',
    orderId: 'order_001',
    status: OrderStatus.DELIVERED,
    changedBy: 'delivery_agent_001',
    createdAt: '2024-03-22T11:30:00Z'
  },
  // Order 2 history
  {
    id: 'history_006',
    orderId: 'order_002',
    status: OrderStatus.PENDING,
    changedBy: 'system',
    createdAt: '2024-03-22T14:20:00Z'
  },
  {
    id: 'history_007',
    orderId: 'order_002',
    status: OrderStatus.CONFIRMED,
    changedBy: 'admin_001',
    createdAt: '2024-03-22T15:05:00Z'
  },
  {
    id: 'history_008',
    orderId: 'order_002',
    status: OrderStatus.PACKED,
    changedBy: 'warehouse_staff_002',
    createdAt: '2024-03-23T11:20:00Z'
  },
  {
    id: 'history_009',
    orderId: 'order_002',
    status: OrderStatus.OUT_FOR_DELIVERY,
    changedBy: 'delivery_manager_001',
    createdAt: '2024-03-26T08:45:00Z'
  },
  // Order 3 history
  {
    id: 'history_010',
    orderId: 'order_003',
    status: OrderStatus.PENDING,
    changedBy: 'system',
    createdAt: '2024-03-23T11:45:00Z'
  },
  {
    id: 'history_011',
    orderId: 'order_003',
    status: OrderStatus.CONFIRMED,
    changedBy: 'admin_002',
    createdAt: '2024-03-23T12:30:00Z'
  },
  {
    id: 'history_012',
    orderId: 'order_003',
    status: OrderStatus.CANCELLED,
    reason: 'Changed my mind',
    changedBy: 'cust_001',
    createdAt: '2024-03-24T16:30:00Z'
  },
  // Order 4 history
  {
    id: 'history_013',
    orderId: 'order_004',
    status: OrderStatus.PENDING,
    changedBy: 'system',
    createdAt: '2024-03-28T16:30:00Z'
  },
  {
    id: 'history_014',
    orderId: 'order_004',
    status: OrderStatus.CONFIRMED,
    changedBy: 'admin_001',
    createdAt: '2024-03-28T17:15:00Z'
  },
];

// Main dummy orders data
export const dummyOrders: IOrder[] = [
  {
    id: 'order_001',
    orderNumber: 'ORD-2024-1001',
    customerId: 'cust_001',
    customerName: 'Ram Parshad',
    customerEmail: 'ram23@gmail.com',
    tenantId: 'tenant_001',
    orderItems: dummyOrderItems.filter(item => item.orderId === 'order_001'),
    shippingAddress: '321 Elm St, Houston, TX 77001',
    trackingNumber: 'TRK456789123',
    // Pricing Information
    totalAmount: 3500,
    discount: 200,
    deliveryFee: 100,
    taxAmount: 180,
    finalAmount: 3530,
    discountAmount: 200,

    // Payment Information
    paymentStatus: PaymentStatus.COMPLETED,
    orderStatus: OrderStatus.DELIVERED,
    paymentMethod: PaymentMethod.ONLINE,
    paymentRef: 'pay_ref_001',
    razorpayOrderId: 'rzp_order_001',
    razorpayPaymentId: 'rzp_pay_001',
    razorpaySignature: 'sig_001',

    // Order Metadata
    couponCode: 'WELCOME100',
    specialInstructions: 'Please deliver after 5 PM',

    // Delivery Information
    deliverySlotId: 'slot_001',
    deliverySlot: dummyTimeSlots.find(slot => slot.id === 'slot_001'),

    // Status Tracking Timestamps
    confirmedAt: '2024-03-20T10:15:00Z',
    packedAt: '2024-03-21T14:30:00Z',
    outForDeliveryAt: '2024-03-22T09:00:00Z',

    // Audit Fields
    createdAt: '2024-03-20T09:30:00Z',
    updatedAt: '2024-03-22T11:30:00Z',
    createdBy: 'cust_001',
    updatedBy: 'system',

    // Address Information
    deliveryAddressId: 'addr_001',
    deliveryAddress: dummyDeliveryAddresses.find(addr => addr.id === 'addr_001'),

    // Status History
    statusHistory: dummyStatusHistory.filter(history => history.orderId === 'order_001'),
  },
  {
    id: 'order_002',
    orderNumber: 'ORD-2024-1002',
    customerId: 'cust_002',
    customerName: 'Vikky Sharma',
    customerEmail: 'vikkysharma123@gmail.com',
    tenantId: 'tenant_001',
    orderItems: dummyOrderItems.filter(item => item.orderId === 'order_002'),
    shippingAddress: '321 Elm St, Houston, TX 77001',
    trackingNumber: 'TRK456783',
    // Pricing Information
    totalAmount: 1800,
    discount: 100,
    deliveryFee: 150,
    taxAmount: 130,
    finalAmount: 1880,
    discountAmount: 100,

    // Payment Information
    paymentStatus: PaymentStatus.COMPLETED,
    orderStatus: OrderStatus.OUT_FOR_DELIVERY,
    paymentMethod: PaymentMethod.UPI,
    paymentRef: 'pay_ref_002',
    razorpayOrderId: 'rzp_order_002',
    razorpayPaymentId: 'rzp_pay_002',
    razorpaySignature: 'sig_002',
    // Order Metadata
    couponCode: 'SPRING50',
    // Delivery Information
    deliverySlotId: 'slot_002',
    deliverySlot: dummyTimeSlots.find(slot => slot.id === 'slot_002'),

    // Status Tracking Timestamps
    confirmedAt: '2024-03-22T15:05:00Z',
    packedAt: '2024-03-23T11:20:00Z',
    outForDeliveryAt: '2024-03-26T08:45:00Z',

    // Audit Fields
    createdAt: '2024-03-22T14:20:00Z',
    updatedAt: '2024-03-26T08:45:00Z',
    createdBy: 'cust_001',
    updatedBy: 'delivery_manager_001',
    // Address Information
    deliveryAddressId: 'addr_002',
    deliveryAddress: dummyDeliveryAddresses.find(addr => addr.id === 'addr_002'),
    // Status History
    statusHistory: dummyStatusHistory.filter(history => history.orderId === 'order_002'),
  },  
];

// Helper function to get orders by customer ID
export const getOrdersByCustomerId = (customerId: string): IOrder[] => {
  return dummyOrders.filter(order => order.customerId === customerId);
};

// Helper function to get order by ID
export const getOrderById = (orderId: string): IOrder | undefined => {
  return dummyOrders.find(order => order.id === orderId);
};

// Helper function to get orders by status
export const getOrdersByStatus = (status: OrderStatus): IOrder[] => {
  return dummyOrders.filter(order => order.orderStatus === status);
};