import { ITimeSlot } from '@/model/timeSlot';
/**
 * Enumeration for address types
 */
export enum AddressType {
  Home = 'Home',
  Work = 'Work',
  Other = 'Other'
}

/**
 * Enumeration for payment status
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

/**
 * Enumeration for order status
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PACKED = 'PACKED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED'
}

/**
 * Enumeration for payment methods
 */
export enum PaymentMethod {
  COD = 'COD',
  ONLINE = 'ONLINE',
  UPI = 'UPI',
  WALLET = 'WALLET'
}

/**
 * Interface representing an order item
 */
export interface IOrderItem {
  /** Unique identifier for the order item */
  id: string;
  /** Reference to the parent order */
  orderId: string;
  /** Reference to the product */
  productId: string;
  /** Reference to bucket (optional for bucket orders) */
  bucketId?: string;
  /** Quantity of the product ordered */
  quantity: number;
  /** Price per unit at the time of order */
  unitPrice: number;
  /** Total price for this item (quantity * unitPrice) */
  totalPrice: number;
  /** Product name at the time of order */
  productName?: string;
  /** Product image URL at the time of order */
  productImage?: string;
  /** Any special requirements for this item */
  specialRequirements?: string;
  /** Timestamp when the order item was created */
  createdAt: string;
  /** Timestamp when the order item was last updated */
  updatedAt: string;
}

/**
 * Interface representing order status history for audit trail
 */
export interface IOrderStatusHistory {
  /** Unique identifier for the status history entry */
  id: string;
  /** Reference to the parent order */
  orderId: string;
  /** The status that was set */
  status: OrderStatus;
  /** Reason for the status change */
  reason?: string;
  /** Who changed the status */
  changedBy?: string;
  /** Timestamp when the status was changed */
  createdAt: string;
}

/**
 * Interface representing a delivery address
 */
export interface IDeliveryAddress {
  /** Unique identifier for the delivery address */
  id: string;
  /** Reference to the customer */
  customerId: string;
  /** Full name of the recipient */
  fullName: string;
  /** Primary phone number */
  phoneNumber: string;
  /** Alternate phone number */
  alternatePhoneNumber?: string;
  /** Type of address */
  addressType?: AddressType;
  /** Complete street address */
  address: string;
  /** Nearby landmark */
  landmark?: string;
  /** City name */
  city: string;
  /** State name */
  state: string;
  /** Postal code */
  pincode: string;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
  /** Whether this is the default address */
  isDefault: boolean;
  /** Timestamp when the address was created */
  createdAt: string;
  /** Timestamp when the address was last updated */
  updatedAt: string;
}

/**
 * Interface representing a complete order
 */
export interface IOrder {
  customerName: string;
  /** Unique identifier for the order */
  customerEmail: string;
  id: string;
  /** Human-readable order number */
  orderNumber: string;
  /** Reference to the customer who placed the order */
  customerId: string;
  /** Reference to the tenant/vendor */
  tenantId: string;
  /** Array of items in this order */
  orderItems: IOrderItem[];
  shippingAddress: string;
  trackingNumber: string;
  // Pricing Information
  /** Total amount before discounts and fees */
  totalAmount: number;
  /** Discount applied to the order */
  discount: number;
  /** Delivery fee charged */
  deliveryFee: number;
  /** Tax amount */
  taxAmount: number;
  /** Final amount to be paid */
  finalAmount: number;

  // Payment Information
  /** Current payment status */
  paymentStatus: PaymentStatus;
  /** Current order status */
  orderStatus: OrderStatus;
  /** Payment method used */
  paymentMethod: string;
  /** Payment reference from payment gateway */
  paymentRef?: string;
  /** Razorpay order ID */
  razorpayOrderId?: string;
  /** Razorpay payment ID */
  razorpayPaymentId?: string;
  /** Razorpay signature for verification */
  razorpaySignature?: string;

  // Order Metadata
  /** Coupon code applied */
  couponCode?: string;
  /** Discount amount from coupon */
  discountAmount: number;
  /** Special instructions from customer */
  specialInstructions?: string;

  // Delivery Information
  /** Reference to delivery slot */
  deliverySlotId?: string;
  /** Delivery slot details */
  deliverySlot?: ITimeSlot;

  // Cancellation/Return Information
  /** Timestamp when order was cancelled */
  cancelledAt?: string;
  /** Reason for cancellation */
  cancellationReason?: string;
  /** Who cancelled the order */
  cancelledBy?: string;
  /** Timestamp when order was returned */
  returnedAt?: string;
  /** Reason for return */
  returnReason?: string;

  // Status Tracking Timestamps
  /** Timestamp when order was confirmed */
  confirmedAt?: string;
  /** Timestamp when order was packed */
  packedAt?: string;
  /** Timestamp when order was shipped */
  shippedAt?: string;
  /** Timestamp when order was out for delivery */
  outForDeliveryAt?: string;

  // Audit Fields
  /** Timestamp when order was created */
  createdAt: string;
  /** Timestamp when order was last updated */
  updatedAt: string;
  /** Who created the order */
  createdBy?: string;
  /** Who last updated the order */
  updatedBy?: string;

  // Address Information
  /** Reference to delivery address */
  deliveryAddressId?: string;
  /** Complete delivery address details */
  deliveryAddress?: IDeliveryAddress;

  // Audit Trail
  /** History of all status changes */
  statusHistory: IOrderStatusHistory[];
}

/**
 * Interface for order filtering and search
 */
export interface IOrderFilter {
  /** Filter by order status */
  orderStatus?: OrderStatus;
  /** Filter by payment status */
  paymentStatus?: PaymentStatus;
  /** Filter by customer ID */
  customerId?: string;
  /** Filter orders from this date */
  dateFrom?: string;
  /** Filter orders to this date */
  dateTo?: string;
  /** Search term for order number, customer name, etc. */
  search?: string;
}