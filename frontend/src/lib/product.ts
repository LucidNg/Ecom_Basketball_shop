export interface Product {
  productID: string;
  productName: string;
  price: number;
}
const connectString = "https://ecom-testserver.onrender.com";
export async function FetchProduct(): Promise<Array<Product>> {
  let url = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : connectString + "/product";

  console.log("url: ",url)
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  console.log("respone url: ",response.url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data as Array<Product>;
}

export async function FetchProductByCategory(
  category: string, method: string, maxPrice: string, minPrice: string
): Promise<Array<Product>> {
  let url = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : `${connectString}/categoryProduct/${category}/${method}/${minPrice}/${maxPrice}`;
  console.log("category: ", category);
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }

  const data = await response.json();
  return data as Array<Product>;
}

export async function FetchProductByBrand(
  brand: string
): Promise<Array<Product>> {
  let url = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : `${connectString}/brand/${brand}`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products for brand: ${brand}`);
  }

  const data = await response.json();
  return data as Array<Product>;
}



export async function FetchProductByName(
  name: string
): Promise<Array<Product>> {
  let url = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : `${connectString}/search/${name}`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products with name: ${name}`);
  }

  const data = await response.json();
  return data as Array<Product>;
}

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