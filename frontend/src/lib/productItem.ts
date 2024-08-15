import { connectString } from "./constant";

export interface ProductItem {
  productID: string;
  size: string;
  quantity: number;
  price: number;
  productName: string;
  url: string;
}

export interface CartItem extends ProductItem {
  cartID: string;
}

export interface OrderItem extends ProductItem {
  orderID: string;
}

export type ProductCardProps<T extends ProductItem> = {
  product: T;
  isEditable: boolean;
};

export const isCartItem = (item: CartItem | OrderItem): item is CartItem => {
  return (item as CartItem).cartID !== undefined;
};

export const isOrderItem = (item: CartItem | OrderItem): item is OrderItem => {
  return (item as CartItem).cartID !== undefined;
};

export async function FetchCartItemsByUserID(
  userID: string
): Promise<Array<CartItem>> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/cartItem/${userID}`
    : `${connectString}/cartItem/${userID}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cart items for user with ID: ${userID}`);
  }

  const data = await response.json();
  return data as Array<CartItem>;
}
