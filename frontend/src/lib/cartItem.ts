import { connectString } from "./constant";

export interface CartItem {
    cartID: string;
    productID: string;
    size: string;
    quantity: string;
    price: string;
  }
  
export async function AddCartItem(cartItem: CartItem): Promise<void> {
    // Construct the URL with query parameters for cart item details
    const url = `${connectString}/createCartItem?cartID=${encodeURIComponent(cartItem.cartID)}&productID=${encodeURIComponent(cartItem.productID)}&size=${encodeURIComponent(cartItem.size)}&quantity=${encodeURIComponent(cartItem.quantity)}&price=${encodeURIComponent(cartItem.price)}`;
  
    try {
      // Make the POST request to the createCartItem endpoint
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      // Check if the response was not successful
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to add item to cart: ${errorMsg}`);
      }
  
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error; // Re-throw the error after logging it
    }
  }
  