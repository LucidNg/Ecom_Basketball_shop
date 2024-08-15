import { connectString } from "./constant";

export interface CartItem {
  cartID: string;
  productID: string;
  size: string;
  quantity: number;
  price: number;
  productName: string;
  url: string;
}

export type ProductCardProps = {
    product: CartItem;
    isEditable: boolean;
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
