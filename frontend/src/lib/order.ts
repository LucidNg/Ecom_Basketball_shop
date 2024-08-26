import { connectString } from "./constant";
import { OrderItem } from "./productItem";
import { v4 as uuidv4 } from "uuid";

// export interface Order {
//   orderID: string;
//   userID: string;
//   orderDate: string;
//   shipDate: string;
//   paymentMethod: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   shippingStatus: ShippingStatus;
//   shippingAddress: string;
//   billingAddress: string;
//   coupon: string;
//   totalBill: number;
//   quantity: number;
// }

// export enum ShippingStatus {
//   Delivered = "delivered",
//   Delivering = "delivering",
//   Canceled = "canceled",
//   Received = "received",
//   Pending = "pending",
// }

// export enum PaymentStatus {
//   Paid = "paid",
//   Unpaid = "unpaid",
//   Refunded = "refunded",
//   PartiallyRefunded = "partially_refunded",
// }

// export type OrderDetailsProps = {
//   order: Order;
// };

// export function getNewOrderID(): string {
//   return uuidv4();
// }

// export async function FetchOrdersByUserID(
//   userID: string
// ): Promise<Array<Order>> {
//   //replace by the actual implementation
//   return [
//     {
//       orderID: "ORDER001",
//       userID: "USER001",
//       orderDate: "2024-08-10",
//       shipDate: "2024-08-12",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingMethod: "Standard",
//       shippingStatus: ShippingStatus.Delivered,
//       shippingAddress: "123 Main St, City A, Country X",
//       billingAddress: "123 Main St, City A, Country X",
//       coupon: "ABCD",
//       totalBill: 1500000,
//       quantity: 3,
//     },
//     {
//       orderID: "ORDER002",
//       userID: "USER002",
//       orderDate: "2024-08-11",
//       shipDate: "2024-08-13",
//       paymentMethod: "PayPal",
//       paymentStatus: "Paid",
//       shippingMethod: "Standard",
//       shippingStatus: ShippingStatus.Delivering,
//       shippingAddress: "456 Elm St, City B, Country Y",
//       billingAddress: "456 Elm St, City B, Country Y",
//       coupon: "ABCD",
//       totalBill: 2100000,
//       quantity: 5,
//     },
//     {
//       orderID: "ORDER003",
//       userID: "USER003",
//       orderDate: "2024-08-12",
//       shipDate: "2024-08-14",
//       paymentMethod: "Bank Transfer",
//       paymentStatus: "Pending",
//       shippingMethod: "Standard",
//       shippingStatus: ShippingStatus.Pending,
//       shippingAddress: "789 Oak St, City C, Country Z",
//       billingAddress: "789 Oak St, City C, Country Z",
//       coupon: "ABCD",
//       totalBill: 3200000,
//       quantity: 2,
//     },
//     {
//       orderID: "ORDER004",
//       userID: "USER004",
//       orderDate: "2024-08-13",
//       shipDate: "2024-08-15",
//       paymentMethod: "Cash on Delivery",
//       paymentStatus: "Pending",
//       shippingMethod: "Fast",
//       shippingStatus: ShippingStatus.Canceled,
//       shippingAddress: "101 Pine St, City D, Country W",
//       billingAddress: "101 Pine St, City D, Country W",
//       coupon: "ABCD",
//       totalBill: 4500000,
//       quantity: 7,
//     },
//   ];
// }


interface OrderRequest {
  orderID: string;
  userID: string;
  date: string;
  shippingAddress: string;
  billingAddress: string;
  price: number;
  status: string;
  payStatus: string;
}

interface OrderItemRequest {
  orderID: string;
  productID: string;
  size: string;
  quantity: number;
  price: number;
}

interface ShippingRequest {
  orderID: string;
  shippingMethod: string;
  cost: number;
  startTime: string;
  estimatedDeliveryTime: string;
}

interface RemoveCartItem {
  productID: string;
  size: string;
  quantity: number;
  price: number;
}

interface RemoveCartItemRequest {
  orderID: string;
  items: RemoveCartItem[];
}

// Function to create an order
export async function CreateOrder(order: OrderRequest): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/createOrder`
    : `${connectString}/createOrder`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      userID: order.userID,
      date: order.date,
      shippingAdress: order.shippingAddress,
      billingAddress: order.billingAddress,
      price: order.price.toString(),
      status: order.status,
      payStatus: order.payStatus,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }
}

// Function to create order items
export async function CreateOrderItems(orderItems: OrderItemRequest[]): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/createOrderItem`
    : `${connectString}/createOrderItem`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: orderItems[0].orderID, // Assumes all items share the same orderID
      products: orderItems.map(item => ({
        productID: item.productID,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to create order items");
  }
}



// Function to create a shipping entry
export async function CreateShipping(shipping: ShippingRequest): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/createShipping`
    : `${connectString}/createShipping`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      orderID: shipping.orderID,
      shippingMethod: shipping.shippingMethod,
      cost: shipping.cost.toString(),
      startTime: shipping.startTime,
      estimatedDeliveryTime: shipping.estimatedDeliveryTime,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to create shipping");
  }
}



// Function to remove items from the cart for a given order
export async function removeCartItemsFromOrder(order: RemoveCartItemRequest): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/deleteCartItem`
    : `${connectString}/deleteCartItem`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart items");
  }
}

export async function updateStock(order: RemoveCartItemRequest): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/updateStock`
    : `${connectString}/updateStock`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to update stock");
  }
}