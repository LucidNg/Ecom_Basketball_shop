export interface Product {
    productID: string;
    categoryID: string;
    productName: string;
    description: string;
    brand: string;
    price: number;
    stock: number;
    imageURL: string;
    dateAdded: string;
    size: string;
}

export async function FetchProduct(): Promise<Array<Product>> {
    let url = process.env.API_ENDPOINT ? process.env.API_ENDPOINT : "http://localhost:8080/product";
    
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });
      

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    
    const data = await response.json();
    return data as Array<Product>;
}