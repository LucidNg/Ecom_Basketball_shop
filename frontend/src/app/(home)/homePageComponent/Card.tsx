import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FetchProduct, Product } from "../../../lib/product";

export default async function Card () {
    let products: Array<Product> = [];

  try {
    products = await FetchProduct();
    console.log("product:", products);
    
  } catch (error) {
    console.error('Error fetching products:', error);
  }
    return (
        <>
        {products.map(product => (
          <div key={product.productID} className="bg-primary flex flex-col h-[400px] w-72">
            <Image 
              src={product.imageURL} 
              alt={product.productName} 
              width={150} 
              height={150} 
              className="p-5 min-w-72 object-cover"
              loading="lazy" 
            />
            <span className="text-base-content font-semibold w-72 px-5 text-lg">
              {product.productName}
            </span>
            <div className="flex flex-row items-center justify-between w-72 px-5 mb-5">
              <span className="text-base-content text-lg">
                ${product.price}
              </span>
              <button className="btn bg-secondary rounded-none text-neutral font-semibold text-xl min-w-32 hover:bg-accent hover:text-primary">
                Xem
              </button>
            </div>
          </div>
        ))}
      </>
    )
}