'use client';
import React from "react";
import FilterBar from "../productComponent/FilteringBar";
import { useParams } from "next/navigation";

interface ProductPageCliProps {
  children1: React.ReactNode;
}

export default function ProductPageCli({ children1 }: ProductPageCliProps) {
  var { category, subCategory } = useParams();
  return (
    <div className="lg:pt-10 bg-base-100">
      <div className="lg:px-16 py-10 text-center lg:text-left">
        <span className="text-accent font-bold text-3xl sm:text-4xl capitalize">{subCategory} {category}</span>
      </div>
      <FilterBar />
      <div className="flex justify-center lg:px-16">
        <div id="most-liked" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-2">
          {React.Children.map(children1, (child) => {
            // Pass category prop to children components
            return React.cloneElement(child as React.ReactElement<any>, { "category": subCategory.toString() + "%27s%20" + category.toString()});
          })}
        </div>
      </div>
    </div>
  );
}
