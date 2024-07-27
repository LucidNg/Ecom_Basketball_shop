import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FetchProductByCategory, FetchProductByBrand, Product } from "../../../lib/product";

interface CardProps {
  limit?: number;
  category: string;
  currentPage: number;
  itemsPerPage: number;
  checkHasMoreProducts: (hasMore: boolean) => void;
  sortBy: string;
  minPrice: string;
  maxPrice: string;
}

const Card: React.FC<CardProps> = ({ limit, category, currentPage, itemsPerPage, checkHasMoreProducts, sortBy, minPrice, maxPrice }: CardProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let fetchedProducts;
        
        if (category.includes("brand")) {
          // Extract the brand name from the category
        const parts = category.split(" ");
        const brandName = parts[0].replace("'s", "");
          if (brandName !== undefined) {
            fetchedProducts = await FetchProductByBrand(brandName);
          }
        } else {
          fetchedProducts = await FetchProductByCategory(category, sortBy, maxPrice, minPrice);
        }

        setProducts(fetchedProducts || []); // Ensure products is not null
        // Check if there are more products available for the next page
        const hasMore = Boolean(fetchedProducts && fetchedProducts.length > currentPage * itemsPerPage);
        checkHasMoreProducts(hasMore);
      } catch (error) {
        console.error(`Failed to fetch products for category ${category}:`, error);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, currentPage, itemsPerPage, checkHasMoreProducts, sortBy, minPrice, maxPrice]);

  const displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  return (
    <>
      {displayedProducts.length > 0 ? (
        displayedProducts.map(product => (
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
                $ {formatPrice(product.price)}
              </span>
              <Link href={`/product/${product.productID}`}>
                <button className="btn bg-secondary rounded-none text-neutral font-semibold text-xs sm:text-sm lg:text-lg w-12 sm:w-24 lg:w-32 sm:h-4 lg:h-12 hover:bg-accent hover:text-primary">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="text-base-content text-center mt-4">
          No products available.
        </div>
      )}
    </>
  );
};

export default Card;
