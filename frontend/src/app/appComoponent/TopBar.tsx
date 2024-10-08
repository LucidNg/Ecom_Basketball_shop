"use client";

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the hook for navigation
import { Search, ShoppingCart } from "@geist-ui/icons";
import { FetchProductByName, Product } from "@/lib/product";
import { useCart } from "./CartContext";
import { decryptToken } from '@/lib/decrypt';

export default function TopBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { cart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const router = useRouter(); // Initialize router for navigation

  // Fetch products based on search input
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
    setShowDropdown(searchResults.length > 0);
  }, [searchResults]);

  // Check JWT in local storage
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
      // Optionally, decode the token to get user information
      const decrypted = decryptToken(token); 
      const payload = JSON.parse(atob(decrypted.split('.')[1]));
      setUsername(payload.fullname);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove JWT from local storage
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setUsername("");
    
    // Navigate to the home page
    router.push("/");
  };

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

      {isAuthenticated ? (
        <div className="afterLogined flex items-center">
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="text-base-content px-3 sm:px-5 2xl:px-10 userInfo hidden 2xl:inline 2xl:text-2xl underline">Hello, {username}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-y-2">
              <Link href="/profile"><div className="whitespace-nowrap text-primary-content bg-primary h-12 flex justify-center items-center rounded-lg text-2xl hover:font-semibold bg-opacity-50 hover:bg-opacity-100">Profile</div></Link>
              <Link href="/tracking-orders"><div className="whitespace-nowrap text-primary-content bg-primary h-12 flex justify-center items-center rounded-lg text-2xl hover:font-semibold bg-opacity-50 hover:bg-opacity-100">Orders</div></Link>
              <div role="button" className="whitespace-nowrap text-primary-content bg-primary h-12 flex justify-center items-center rounded-lg text-2xl hover:font-semibold bg-opacity-50 hover:bg-opacity-100" onClick={handleLogout}>Logout</div>
            </ul>
          </div>

          <div className="dropdown dropdown-hover">
            <div className="avatar 2xl:hidden px-5" tabIndex={0} role="button">
              <div className="w-8 sm:w-12 rounded-full bg-secondary">
                <Image src="" alt="" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-y-2">
                <Link href="/profile"><div className="whitespace-nowrap text-primary-content bg-primary h-12 flex justify-center items-center rounded-lg text-2xl hover:font-semibold bg-opacity-50 hover:bg-opacity-100">Profile</div></Link>
                <Link href="/tracking-orders"><div className="whitespace-nowrap text-primary-content bg-primary h-12 flex justify-center items-center rounded-lg text-2xl hover:font-semibold bg-opacity-50 hover:bg-opacity-100">Orders</div></Link>
                <div role="button" className="whitespace-nowrap text-primary-content bg-primary h-12 flex justify-center items-center rounded-lg text-2xl hover:font-semibold bg-opacity-50 hover:bg-opacity-100" onClick={handleLogout}>Logout</div>
              </ul>
            </div>
          </div>
          
          <Link href="/shopping-cart">
            <button className="Cart justify-end bg-base-100 h-[40px] sm:h-[50px] flex items-center rounded-lg mr-5 sm:mr-10">
              <div className="px-3 flex">
                <ShoppingCart color="black" className="h-5 w-5 sm:h-8 sm:w-8" />
                <span className="text-base-content hidden sm:text-2xl sm:inline px-4">
                  {cart.length}
                </span>
              </div>
            </button>
          </Link>
        </div>
      ) : (
        <div className="beforeLogined flex items-center pl-5 pr-4 lg:pr-8">
          <button className="h-[50px] text-xl font-semibold text-base-content hover:text-accent hidden lg:inline lg:w-44 xl:text-xl xl:w-40">
            <Link href="/auth/login">Login</Link>
          </button>
          <button className="h-[50px] font-semibold text-accent-content bg-accent hover:bg-red-500 w-24 lg:text-xl lg:w-44 xl:w-40">
            <Link href="/auth/register">Sign up</Link>
          </button>
          <Link href="/shopping-cart">
            <button className="Cart justify-end bg-base-100 h-[40px] sm:h-[50px] flex items-center rounded-lg mx-7  ">
              <div className="px-3 flex">
                <ShoppingCart color="black" className="h-5 w-5 sm:h-8 sm:w-8" />
                <span className="text-base-content hidden sm:text-2xl sm:inline px-4">
                  {cart.length}
                </span>
              </div>
            </button>
          </Link>
        </div>
      )}
      
    </div>
  );
}
