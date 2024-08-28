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

export interface Admin_User {
  email: string;
  fullName: string;
  phoneNumber: string;
  dob: string;
  memberSince: number;
}

export async function FetchAllProducts(offset: number): Promise<Array<Admin_Product>> {
  // Construct the URL with the offset parameter
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/product/${offset}`
    : `${connectString}/admin/product/${offset}`;

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
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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

export async function FetchAllUsers(offset: number): Promise<Array<Admin_User>> {
  // Construct the URL with the method and offset parameters
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/user/${offset}`
    : `${connectString}/admin/user/${offset}`;

  console.log(url);
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
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    // Parse the response JSON
    const data: Array<Admin_User> = await response.json();
    return data;
  } catch (error) {
    // Handle network or other errors
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function InsertProduct(
  categoryID: string,
  name: string,
  description: string,
  brand: string,
  price: string,
  stock: string,
  dateAdded: string,
  size: string
): Promise<void> {
  // Construct the URL for the POST request
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/insertProduct`
    : `${connectString}/admin/insertProduct`;

  // Prepare the data to be sent in the request body
  const formData = new URLSearchParams();
  formData.append("categoryID", categoryID);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("brand", brand);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("dateAdded", dateAdded);
  formData.append("size", size);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`Failed to insert product: ${response.statusText}`);
    }

    // Optional: Handle successful insertion, such as by displaying a message
    console.log("Product inserted successfully");
  } catch (error) {
    // Handle network or other errors
    console.error("Error inserting product:", error);
    throw error;
  }
}

export async function DeleteProduct(productID: string): Promise<void> {
  // Construct the URL for the DELETE request
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/deleteProduct`
    : `${connectString}/admin/deleteProduct`;

  // Prepare the data to be sent in the request body
  const formData = new URLSearchParams();
  formData.append("productID", productID);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }

    // Optional: Handle successful deletion, such as by displaying a message
    console.log("Product deleted successfully");
  } catch (error) {
    // Handle network or other errors
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function UpdateOrderStatus(orderID: string, status: string): Promise<void> {
  // Construct the URL for the DELETE request
  const url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/admin/updateOrderStatus`
    : `${connectString}/admin/updateOrderStatus`;

  // Prepare the data to be sent in the request body
  const formData = new URLSearchParams();
  formData.append("orderID", orderID);
  formData.append("status", status);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }

    // Optional: Handle successful deletion, such as by displaying a message
    console.log("Order status updated successfully");
  } catch (error) {
    // Handle network or other errors
    console.error("Error updating order status:", error);
    throw error;
  }
}