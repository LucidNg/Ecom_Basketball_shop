import { connectString } from "./constant";

export interface Admin_Product {
  productID: string;
  productName: string;
  size: string;
  stock: number;
  price: number;
}

export interface Admin_Order {
  orderID: string;
  userID: string;
  date: string;
  shippingAddress: string;
  billingAddress: string;
  price: number;
  status: string;
  payStatus: string;
  method: string;
  fullName: string;
  phoneNumber: string;
}

export interface Admin_OrderItem {
  orderID: string;
  productID: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

export async function FetchAllProducts(offset: number): Promise<Array<Admin_Product>> {
  // Construct the URL with the offset parameter
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/product/${offset}`
    : `${connectString}/admin/product/${offset}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    // Parse the response JSON
    const data: Array<Admin_Product> = await response.json();
    return data;
  } catch (error) {
    // Handle network or other errors
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function FetchAllOrders(method: string, offset: number): Promise<Array<Admin_Order>> {
  // Construct the URL with the method and offset parameters
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/order/${method}/${offset}`
    : `${connectString}/admin/order/${method}/${offset}`;

  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    // Parse the response JSON
    const data: Array<Admin_Order> = await response.json();
    return data;
  } catch (error) {
    // Handle network or other errors
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function FetchOrderItemsByOrderID(orderID: string): Promise<Array<Admin_OrderItem>> {
  // Construct the URL with the orderID parameter
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/orderItem/${orderID}`
    : `${connectString}/admin/orderItem/${orderID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`Failed to fetch order items: ${response.statusText}`);
    }

    // Parse the response JSON
    const data: Array<Admin_OrderItem> = await response.json();
    return data;
  } catch (error) {
    // Handle network or other errors
    console.error("Error fetching order items:", error);
    throw error;
  }
}