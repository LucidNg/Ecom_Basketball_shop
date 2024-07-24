export interface Product {
  productID: string;
  categoryID: string;
  productName: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  dateAdded: string;
  size: string;
}
const connectString = "https://boroshop.onrender.com";
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
  category: string
): Promise<Array<Product>> {
  let url = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : `${connectString}/categoryProduct/${category}`;
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

export async function FetchProductByID(
  productID: string
): Promise<Array<Product>> {
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
    throw new Error(`Failed to fetch products with ID: ${productID}`);
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
