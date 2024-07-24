
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { FetchProduct, FetchProductByCategory, Product } from "../../../lib/product";

interface CardProps {
  category?: string;
  limit?: number;
}

export async function Card({ category, limit }: CardProps) {
  let products: Array<Product> = [];
  if (category) {
    products = await FetchProductByCategory(category, "latest", "0", "0");
  } else {
    products = await FetchProduct();
  }

  // Apply the limit if provided
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <>
      {displayedProducts.map(product => (
        <div key={product.productID} className="bg-primary flex flex-col h-64 w-40 sm:h-80 sm:w-56 lg:h-[410px] lg:w-72">
          <Image 
            src={`/products/${product.productID}/1.png`} 
            alt={product.productName} 
            width={150} 
            height={150} 
            className="p-5 w-48 sm:w-56 lg:w-72 object-cover"
            loading="lazy" 
          />
          <span className="text-base-content font-semibold w-40 sm:w-56 lg:w-72 h-14 px-5 text-xs sm:text-sm lg:text-lg">
            {product.productName}
          </span>
          <div className="flex flex-row items-center justify-between w-40 sm:w-56 lg:w-72 px-5 pb-1">
            <span className="text-base-content text-xs sm:text-sm lg:text-lg">
              $ {product.price}
            </span>
            <Link href={`/product/${product.productID}`}>
              <button className="btn bg-secondary rounded-none text-neutral font-semibold text-xs sm:text-sm lg:text-lg w-12 sm:w-24 lg:w-32 sm:h-4 lg:h-12 hover:bg-accent hover:text-primary">
                View
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
