"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FetchProduct, FetchProductByCategory, Product } from "../../../lib/product";
import Loading from "@/app/appComoponent/Loading";

interface CardProps {
  category?: string;
  limit?: number;
}

const Card: React.FC<CardProps> = ({ category, limit }: CardProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch products with a simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        let fetchedProducts: Product[] = [];

        if (category) {
          fetchedProducts = await FetchProductByCategory(category, "latest", "0", "1000");
        } else {
          fetchedProducts = await FetchProduct();
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  function convertInvalidJsonStringToArray(invalidJsonString: string) {
    const cleanedString = invalidJsonString.slice(1, -1);
    const elements = cleanedString.split(',').map(element => element.trim());
    const validJsonArray = elements.map(element => `"${element}"`);
    const jsonArray = JSON.parse(`[${validJsonArray.join(',')}]`);
    return jsonArray;
  }

  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {displayedProducts.map(product => (
        <div key={product.productID} className="bg-primary flex flex-col h-64 w-40 sm:h-80 sm:w-56 lg:h-[410px] lg:w-72 transition-transform transform hover:scale-95 shadow-md hover:shadow-2xl hover:drop-shadow-lg hover:shadow-zinc-400 hover:will-change-transform">
          <Image 
            src={`https://drive.google.com/uc?export=view&id=${convertInvalidJsonStringToArray(product.url)[0]}`}
            alt={product.productName} 
            width={150} 
            height={150} 
            className="p-5 w-48 sm:w-56 lg:w-72 sm:h-56 lg:h-72 object-cover"
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
};

export default Card;
