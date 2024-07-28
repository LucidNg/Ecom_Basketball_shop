import { connectString } from "./constant";

export interface ProductDetails {
    productID: string;
    categoryID: string;
    productName: string;
    description: string;
    brand: string;
    dateAdded: string;
  }
  
  export interface Size {
    size: number;
    stock: number;
    price: number;
  }
  
  export interface ProductResponse {
    productDetails: Array<ProductDetails>;
    sizes: Array<Size>;
  }
  
  export async function FetchProductByID(
    productID: string
  ): Promise<ProductResponse> {
    let url = process.env.API_ENDPOINT
      ? process.env.API_ENDPOINT
      : `${connectString}/product/${productID}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${productID}`);
    }
  
    const data = await response.json();
    return data as ProductResponse;
  }