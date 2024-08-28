import { connectString } from "./constant";
import { OrderItem } from "./productItem";
import { v4 as uuidv4 } from "uuid";

export interface Order {
  orderID: string; // OrderRequest
  userID: string; // OrderRequest
  orderDate: string; // OrderRequest
  shipDate: string; // ShippingRequest
  paymentMethod: string; // OrderRequest
  paymentStatus: string; // OrderRequest
  shippingMethod: string; //ShippingRequest
  shippingStatus: ShippingStatus; // OrderRequest
  shippingAddress: string; // OrderRequest
  billingAddress: string; // OrderRequest
  coupon: string; // Not implemented yet
  totalBill: number; // OrderRequest
  quantity: number;
  orderItems: OrderItem[]; //OrderRequest
}

export enum ShippingStatus {
  Delivered = "Processed",
  Delivering = "Sent",
  //Canceled = "canceled",
  Received = "Finished",
  Pending = "Prepared",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
  // Refunded = "refunded",
  // PartiallyRefunded = "partially_refunded",
}

export type OrderDetailsProps = {
  order: Order;
};

export function getNewOrderID(): string {
  return uuidv4();
}

function convertOrderItemRequestToOrderItem(
  request: OrderItemRequest
): OrderItem {
  return {
    orderID: request.orderID ?? "", // Provide a default empty string if orderID is undefined
    productID: request.productID,
    size: request.size,
    quantity: request.quantity,
    price: request.price,
    // Need to be replace
    productName: request.productName,
    // Need to be replace
    url: request.url,
  };
}

export function convertOrderItemToOrderItemRequest(
  item: OrderItem
): OrderItemRequest {
  return {
    orderID: item.orderID ?? "", // Provide a default empty string if orderID is undefined
    productID: item.productID,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    // Need to be replace
    productName: item.productName,
    // Need to be replace
    url: item.url,
  };
}

export async function convertToOrder(
  orderRequest: OrderRequest
): Promise<Order> {
  const shippingRequest: ShippingRequest | null =
    // {
    //   orderID: orderRequest.orderID,
    //   shippingMethod: "Fast",
    //   cost: 4.0,
    //   startTime: "26-08-2024",
    //   estimatedDeliveryTime: "30-08-2024",
    // }; // Mock data
    await FetchShippingByOrderID(orderRequest.orderID);

  // Create a new Order object based on the provided OrderRequest and ShippingRequest
  return {
    orderID: orderRequest.orderID,
    userID: orderRequest.userID,
    orderDate: orderRequest.date,
    shipDate: shippingRequest ? shippingRequest.estimatedDeliveryTime : "",
    paymentMethod: orderRequest.payMethod,
    paymentStatus: orderRequest.payStatus,
    shippingMethod: shippingRequest ? shippingRequest.shippingMethod : "",
    shippingStatus: orderRequest.status as ShippingStatus, // Assuming the status in OrderRequest matches ShippingStatus enum
    shippingAddress: orderRequest.shippingAddress,
    billingAddress: orderRequest.billingAddress,
    coupon: "None", // Not implemented yet
    totalBill: orderRequest.price,
    quantity: orderRequest.items ? orderRequest.items.length : 0,
    orderItems: orderRequest.items
      ? orderRequest.items.map(convertOrderItemRequestToOrderItem)
      : [], // Convert each OrderItemRequest to OrderItem
  };
}

// Function to convert Order to OrderRequest
export function convertOrderToOrderRequest(order: Order): OrderRequest {
  return {
    orderID: order.orderID,
    userID: order.userID,
    date: order.orderDate,
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    price: order.totalBill,
    status: order.shippingStatus, // Assuming shippingStatus can be used as status
    payStatus: order.paymentStatus,
    payMethod: order.paymentMethod,
    items: order.orderItems.map((item) => {
      return convertOrderItemToOrderItemRequest(item);
    }),
  };
}

// Function to convert Order to ShippingRequest
export function convertOrderToShippingRequest(
  order: Order,
  shipCost: number
): ShippingRequest {
  return {
    orderID: order.orderID,
    shippingMethod: order.shippingMethod,
    cost: shipCost, // Assuming cost is not provided by Order and needs to be set accordingly
    startTime: order.orderDate, // You might need to format this if necessary
    estimatedDeliveryTime: order.shipDate, // Assuming shipDate is used as the estimated delivery time
  };
}

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

interface ShippingRequest {
  orderID: string;
  shippingMethod: string;
  cost: number;
  startTime: string;
  estimatedDeliveryTime: string;
}

interface OrderRequest {
  orderID: string;
  userID: string;
  date: string;
  shippingAddress: string;
  billingAddress: string;
  price: number;
  status: string;
  payStatus: string;
  payMethod: string;
  items?: OrderItemRequest[];
}

interface OrderItemRequest {
  orderID?: string;
  productID: string;
  size: string;
  quantity: number;
  price: number;
  productName: string;
  url: string;
}

interface RemoveCartItemRequest {
  orderID: string;
  items: OrderItemRequest[];
}

type OrdersByUserID = {
  orders: OrderRequest[];
};

// Function to create an order
export async function CreateOrder(order: OrderRequest): Promise<string> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/createOrder`
    : `${connectString}/createOrder`;

  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({
  //     userID: order.userID,
  //     date: order.date,
  //     shippingAdress: order.shippingAddress,
  //     billingAddress: order.billingAddress,
  //     price: order.price.toString(),
  //     status: order.status,
  //     payStatus: order.payStatus,
  //   }),
  //   credentials: "include",
  //   mode: "cors",
  //   cache: "no-cache",
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to create order");
  // }

  // const data = await response.json();
  // return data.orderID;

  return getNewOrderID();
}

// Function to create order items
export async function CreateOrderItems(
  orderItems: OrderItemRequest[]
): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/createOrderItem`
    : `${connectString}/createOrderItem`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      orderID: orderItems[0].orderID, // Assumes all items share the same orderID
      products: orderItems.map((item) => ({
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
export async function removeCartItemsFromOrder(
  order: RemoveCartItemRequest
): Promise<void> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/deleteCartItem`
    : `${connectString}/deleteCartItem`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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

export async function FetchOrdersByUserID(
  userID: string
): Promise<OrdersByUserID | null> {
  // let url = process.env.API_ENDPOINT
  //   ? `${process.env.API_ENDPOINT}/queryOrders/${userID}`
  //   : `${connectString}/queryOrders/${userID}`;

  // try {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });

  //   if (!response.ok) {
  //     // Handle HTTP errors
  //     console.error("Failed to fetch orders:", response.statusText);
  //     return null;
  //   }

  //   const data: OrdersByUserID = await response.json();
  //   return data;
  // } catch (error) {
  //   // Handle network or other errors
  //   console.error("Error fetching orders:", error);
  //   return null;
  // }

  const exampleOrdersByUserID: OrdersByUserID = {
    orders: [
      {
        orderID: "ORD001",
        userID: "USER001",
        date: "2024-08-01",
        shippingAddress: "123 Maple St, Springfield, IL 62701",
        billingAddress: "123 Maple St, Springfield, IL 62701",
        price: 359.98,
        status: ShippingStatus.Pending,
        payStatus: PaymentStatus.Paid,
        payMethod: "cod",
        items: [
          {
            orderID: "ORD001",
            productID: "PROD1001",
            productName: "product 1",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "M",
            quantity: 2,
            price: 79.99,
          },
          {
            orderID: "ORD001",
            productID: "PROD1002",
            productName: "product 2",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "L",
            quantity: 1,
            price: 139.99,
          },
          {
            orderID: "ORD001",
            productID: "PROD1003",
            productName: "product 3",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "S",
            quantity: 1,
            price: 59.99,
          },

          {
            orderID: "ORD001",
            productID: "PROD1003",
            productName: "product 3",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "L",
            quantity: 1,
            price: 60.0,
          },
        ],
      },
      {
        orderID: "ORD002",
        userID: "USER002",
        date: "2024-08-02",
        shippingAddress: "456 Oak St, Springfield, IL 62702",
        billingAddress: "456 Oak St, Springfield, IL 62702",
        price: 189.97,
        status: "pending",
        payStatus: PaymentStatus.Unpaid,
        payMethod: "cod",
        items: [
          {
            orderID: "ORD002",
            productID: "PROD2001",
            productName: "product 1",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "XL",
            quantity: 1,
            price: 99.99,
          },
          {
            orderID: "ORD002",
            productID: "PROD2002",
            productName: "product 2",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "M",
            quantity: 2,
            price: 44.99,
          },
        ],
      },
      {
        orderID: "ORD003",
        userID: "USER003",
        date: "2024-08-03",
        shippingAddress: "789 Pine St, Springfield, IL 62703",
        billingAddress: "789 Pine St, Springfield, IL 62703",
        price: 399.95,
        status: ShippingStatus.Delivered,
        payStatus: PaymentStatus.Paid,
        payMethod: "cod",
        items: [
          {
            orderID: "ORD003",
            productID: "PROD3001",
            productName: "product 1",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "L",
            quantity: 3,
            price: 89.99,
          },
          {
            orderID: "ORD003",
            productID: "PROD3002",
            productName: "product 2",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "M",
            quantity: 2,
            price: 49.99,
          },
          {
            orderID: "ORD003",
            productID: "PROD3003",
            productName: "product 3",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "S",
            quantity: 1,
            price: 69.99,
          },
        ],
      },
      {
        orderID: "ORD004",
        userID: "USER004",
        date: "2024-08-04",
        shippingAddress: "101 Birch St, Springfield, IL 62704",
        billingAddress: "101 Birch St, Springfield, IL 62704",
        price: 239.96,
        status: ShippingStatus.Delivering,
        payStatus: PaymentStatus.Paid,
        payMethod: "cod",
        items: [
          {
            orderID: "ORD004",
            productID: "PROD4001",
            productName: "product 1",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "M",
            quantity: 1,
            price: 119.99,
          },
          {
            orderID: "ORD004",
            productID: "PROD4002",
            productName: "product 2",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "L",
            quantity: 2,
            price: 59.99,
          },
        ],
      },
      {
        orderID: "ORD005",
        userID: "USER005",
        date: "2024-08-05",
        shippingAddress: "202 Cedar St, Springfield, IL 62705",
        billingAddress: "202 Cedar St, Springfield, IL 62705",
        price: 149.95,
        status: ShippingStatus.Received,
        payStatus: PaymentStatus.Paid,
        payMethod: "cod",
        items: [
          {
            orderID: "ORD005",
            productID: "PROD5001",
            productName: "product 1",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "S",
            quantity: 2,
            price: 74.99,
          },
          {
            orderID: "ORD005",
            productID: "PROD5002",
            productName: "product 2",
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Freplace-image%2F&psig=AOvVaw1wTBwS-oVIoEyIo-mcjhHX&ust=1724867330464000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC0hebdlYgDFQAAAAAdAAAAABAE",
            size: "M",
            quantity: 1,
            price: 49.99,
          },
        ],
      },
    ],
  };

  return exampleOrdersByUserID;
}

export async function FetchShippingByOrderID(
  orderID: string
): Promise<ShippingRequest | null> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/queryShipping/${orderID}`
    : `${connectString}/queryShipping/${orderID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      console.error("Failed to fetch shipping details:", response.statusText);
      return null;
    }

    const data: ShippingRequest = await response.json();
    return data;
  } catch (error) {
    // Handle network or other errors
    console.error("Error fetching shipping details:", error);
    return null;
  }
}
