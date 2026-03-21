'use client'
import { IOrder } from "@/model/order";
import { OrderHeader } from "./section/order-header";
import { OrderInformation } from "./section/order-information";
import { OrderItems } from "./section/order-items";
import { OrderTimeline } from "./section/order-timeline";
import { CustomerInformation } from "./section/customer-information";
import { DeliveryInformation } from "./section/delivery-information";
import { PaymentInformation } from "./section/payment-information";
// import { OrderInformation } from "./sections/order-information";



interface OrderDetailsContentProps {
  order: IOrder;
}

export function OrderDetailsContent({ order }: OrderDetailsContentProps) {
  return (
    <div className="space-y-6">
      {/* Order Header */}
      <OrderHeader order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Info & Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <OrderInformation order={order} />

          {/* Order Items */}
          <OrderItems orderItems={order.orderItems} />

          {/* Order Timeline */}
          <OrderTimeline statusHistory={order.statusHistory} />
        </div>

        {/* Right Column - Customer & Delivery */}
        <div className="space-y-6">
          {/* Customer Information */}
          <CustomerInformation order={order} />

          {/* Delivery Information */}
          <DeliveryInformation order={order} />

          {/* Payment Information */}
          <PaymentInformation order={order} />
        </div>
      </div>
    </div>
  );
}