"use client";

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@geist-ui/icons";
import { ShoppingCart } from "@geist-ui/icons";
import { FetchProductByName, Product } from "@/lib/product";
import { useCart } from "./CartContext";

export default function TopBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { cart } = useCart();
  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await FetchProductByName(searchValue);
      setSearchResults(fetchedProducts);
    } catch (error) {
      console.error(`Failed to fetch products for name ${searchValue}:`, error);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      fetchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchValue, fetchProducts]);

  useEffect(() => {
    console.log("lentgh:", searchResults);
    setShowDropdown(searchResults.length > 0);
  }, [searchResults]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleProductClick = () => {
    setShowDropdown(false);
    setSearchValue("");
  };

  return (
    <div className="TopBar h-24 bg-primary flex flex-row items-center relative">
      <Link href="/">
        <div className="flex items-center justify-start min-w-10 px-5 lg:px-12 2xl:px-24">
          <Image
            className="min-w-5 inline md:hidden lg:inline"
            src={`/logo.svg`}
            alt="Boro logo"
            width={30}
            height={30}
          />
          <div className="text-base-content font-bold hidden whitespace-nowrap 2xl:inline 2xl:text-4xl lg:pl-7 md:inline md:text-3xl md:font-extrabold">
            <span>BoRo Shop</span>
          </div>
        </div>
      </Link>
      <div className="h-[40px] sm:h-[50px] items-center flex-1 w-3/5 SearchBar relative">
        <label className="input input-bordered flex items-center gap-2 h-[40px] sm:h-[50px] border-none">
          <input
            type="text"
            className="w-full text-base-content text-2xl font-semibold min-w-24 placeholder:text-opacity-25 placeholder:text-base-content"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Search color="black" className="h-5 w-5 sm:h-10 sm:w-10" />
        </label>
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 z-10">
            {searchResults.map((product) => (
              <li
                key={product.productID}
                className="p-2 hover:bg-gray-200 text-base-content cursor-pointer"
                onClick={handleProductClick}
              >
                <Link href={`/product/${product.productID}`}>
                  <div className="flex items-center justify-between">
                    <span className="ml-2">{product.productName}</span>
                    <span className="ml-2">${product.price}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <div className="beforeLogined flex items-center pl-5 pr-8 xl:pr-20">                
                <button className="h-[50px] text-xl font-semibold text-base-content hover:text-accent lg:w-44 xl:text-xl xl:w-40">
                    <Link href="/">Login</Link>
                </button>
                <button className="h-[50px] font-semibold text-accent-content bg-accent hover:bg-red-500 hidden lg:inline lg:text-xl lg:w-44 xl:w-40">
                    <Link href="/">Sign up</Link>
                </button>
            </div> */}
      <div className="afterLogined flex items-center">
        <div className="text-base-content px-3 sm:px-5 2xl:px-10 userInfo hidden 2xl:inline 2xl:text-2xl">
          <span className="whitespace-nowrap ">Xin chào, Văn A</span>
        </div>

        <div className="avatar 2xl:hidden px-5">
          <div className="w-8 sm:w-12 rounded-full bg-secondary">
            <Image src="" alt="user" />
          </div>
        </div>
        <Link href="/shopping-cart">
          <button className="Cart justify-end bg-base-100 h-[40px] sm:h-[50px] flex items-center rounded-lg mr-5 sm:mr-10">
            <div className="px-3 flex">
              <ShoppingCart color="black" className="h-5 w-5 sm:h-8 sm:w-8" />
              <span className="text-base-content hidden sm:text-2xl sm:inline px-4">
                cart.length
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
