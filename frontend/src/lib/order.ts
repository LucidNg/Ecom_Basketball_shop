import { connectString } from "./constant";
import { OrderItem } from "./productItem";
import { v4 as uuidv4 } from "uuid";

export interface Order {
  orderID: string;
  userID: string;
  orderDate: string;
  shipDate: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  shippingStatus: ShippingStatus;
  shippingAddress: string;
  billingAddress: string;
  coupon: string;
  totalBill: number;
  quantity: number;
}

export enum ShippingStatus {
  Delivered = "delivered",
  Delivering = "delivering",
  Canceled = "canceled",
  Received = "received",
  Pending = "pending",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
  Refunded = "refunded",
  PartiallyRefunded = "partially_refunded",
}

export type OrderDetailsProps = {
  order: Order;
};

export function getNewOrderID(): string {
  return uuidv4();
}

export async function FetchOrdersByUserID(
  userID: string
): Promise<Array<Order>> {
  //replace by the actual implementation
  return [
    {
      orderID: "ORDER001",
      userID: "USER001",
      orderDate: "2024-08-10",
      shipDate: "2024-08-12",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      shippingMethod: "Standard",
      shippingStatus: ShippingStatus.Delivered,
      shippingAddress: "123 Main St, City A, Country X",
      billingAddress: "123 Main St, City A, Country X",
      coupon: "ABCD",
      totalBill: 1500000,
      quantity: 3,
    },
    {
      orderID: "ORDER002",
      userID: "USER002",
      orderDate: "2024-08-11",
      shipDate: "2024-08-13",
      paymentMethod: "PayPal",
      paymentStatus: "Paid",
      shippingMethod: "Standard",
      shippingStatus: ShippingStatus.Delivering,
      shippingAddress: "456 Elm St, City B, Country Y",
      billingAddress: "456 Elm St, City B, Country Y",
      coupon: "ABCD",
      totalBill: 2100000,
      quantity: 5,
    },
    {
      orderID: "ORDER003",
      userID: "USER003",
      orderDate: "2024-08-12",
      shipDate: "2024-08-14",
      paymentMethod: "Bank Transfer",
      paymentStatus: "Pending",
      shippingMethod: "Standard",
      shippingStatus: ShippingStatus.Pending,
      shippingAddress: "789 Oak St, City C, Country Z",
      billingAddress: "789 Oak St, City C, Country Z",
      coupon: "ABCD",
      totalBill: 3200000,
      quantity: 2,
    },
    {
      orderID: "ORDER004",
      userID: "USER004",
      orderDate: "2024-08-13",
      shipDate: "2024-08-15",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      shippingMethod: "Fast",
      shippingStatus: ShippingStatus.Canceled,
      shippingAddress: "101 Pine St, City D, Country W",
      billingAddress: "101 Pine St, City D, Country W",
      coupon: "ABCD",
      totalBill: 4500000,
      quantity: 7,
    },
  ];
}
