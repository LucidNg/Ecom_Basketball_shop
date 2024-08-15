import { connectString } from "./constant";
import { OrderItem } from "./productItem";

export interface Order {
  orderID: string;
  userID: string;
  orderDate: string;
  shipDate: string;
  payment_method: string;
  payment_status: string;
  shippingMethod: string;
  shippingStatus: OrderStatus;
  shippingAddress: string;
  billingAddress: string;
  totalBill: number;
  quantity: number;
}

export enum OrderStatus {
  Delivered = "delivered",
  Delivering = "delivering",
  Canceled = "canceled",
  Received = "received",
  Pending = "pending",
}

export type OrderDetailsProps = {
  order: Order;
};

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
      payment_method: "Credit Card",
      payment_status: "Paid",
      shippingMethod: "Express",
      shippingStatus: OrderStatus.Delivered,
      shippingAddress: "123 Main St, City A, Country X",
      billingAddress: "123 Main St, City A, Country X",
      totalBill: 1500000,
      quantity: 3,
    },
    {
      orderID: "ORDER002",
      userID: "USER002",
      orderDate: "2024-08-11",
      shipDate: "2024-08-13",
      payment_method: "PayPal",
      payment_status: "Paid",
      shippingMethod: "Standard",
      shippingStatus: OrderStatus.Delivering,
      shippingAddress: "456 Elm St, City B, Country Y",
      billingAddress: "456 Elm St, City B, Country Y",
      totalBill: 2100000,
      quantity: 5,
    },
    {
      orderID: "ORDER003",
      userID: "USER003",
      orderDate: "2024-08-12",
      shipDate: "2024-08-14",
      payment_method: "Bank Transfer",
      payment_status: "Pending",
      shippingMethod: "Standard",
      shippingStatus: OrderStatus.Pending,
      shippingAddress: "789 Oak St, City C, Country Z",
      billingAddress: "789 Oak St, City C, Country Z",
      totalBill: 3200000,
      quantity: 2,
    },
    {
      orderID: "ORDER004",
      userID: "USER004",
      orderDate: "2024-08-13",
      shipDate: "2024-08-15",
      payment_method: "Cash on Delivery",
      payment_status: "Pending",
      shippingMethod: "Express",
      shippingStatus: OrderStatus.Pending,
      shippingAddress: "101 Pine St, City D, Country W",
      billingAddress: "101 Pine St, City D, Country W",
      totalBill: 4500000,
      quantity: 7,
    },
  ];
}
