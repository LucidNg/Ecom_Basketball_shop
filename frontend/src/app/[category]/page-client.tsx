'use client';
import React from "react";
import FilterBar from "./productComponent/FilteringBar";
import { useParams } from "next/navigation";
import BreadCrumbs from "../appComoponent/BreadCrumb";

interface ProductPageCliProps {
  children1: React.ReactNode;
}

export default function ProductPageCli({ children1 }: ProductPageCliProps) {
  const { category } = useParams();

  return (
    <div className="lg:pt-10 bg-base-100 w-screen">
      <div className="lg:px-16 py-10 text-center lg:text-left">
        <span className="text-accent font-bold text-3xl sm:text-4xl capitalize">{category}</span>
      </div>
      <FilterBar />
      <div className="flex justify-center items-center w-full lg:px-16 overflow-x-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-2 max-w-full">
          {React.Children.map(children1, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, { category });
          })}
        </div>
      </div>
    </div>
  );
}
