'use client';
import React, { useState, useEffect } from "react";
import FilterBar from "./productComponent/FilteringBar";
import { useParams, useRouter } from "next/navigation";
import { validateCategory } from '@/lib/validation';


interface ProductPageCliProps {
  children1: React.ReactNode;
}

export default function ProductPageCli({ children1 }: ProductPageCliProps) {
  const { category } = useParams();
  const router = useRouter();
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const itemsPerPage = 15;

  const [sortBy, setSortBy] = useState("latest");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("1000");

  useEffect(() => {
    const validateCategoryAsync = async () => {
      const categoryString = Array.isArray(category) ? category[0] : category;
      
      const valid = await validateCategory(categoryString);
      if (!valid) {
        router.push('/not-found');
      }
      setIsValidCategory(valid);
    };

    validateCategoryAsync();
  }, [category, router]);

  if (!isValidCategory) {
    return null; 
  }


  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const checkHasMoreProducts = (hasMore: boolean) => {
    setHasMoreProducts(hasMore);
  };

  return (
    <div className="lg:pt-10 bg-base-100 w-screen">
      <div className="lg:px-16 py-10 text-center lg:text-left">
        <span className="text-accent font-bold text-3xl sm:text-4xl capitalize">{category}</span>
      </div>
      <FilterBar 
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="flex justify-center items-center w-full lg:px-16 overflow-x-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-2 max-w-full">
          {React.Children.map(children1, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, { 
              category, 
              currentPage, 
              itemsPerPage, 
              checkHasMoreProducts,
              sortBy,
              minPrice,
              maxPrice
            });
          })}
        </div>
      </div>
      <div className="join flex justify-center my-5">
        <button className="join-item btn" onClick={handlePrevPage} disabled={currentPage === 1}>«</button>
        <span className="join-item btn">Page {currentPage}</span>
        <button className="join-item btn" onClick={handleNextPage} disabled={!hasMoreProducts}>»</button>
      </div>
    </div>
  );
}
