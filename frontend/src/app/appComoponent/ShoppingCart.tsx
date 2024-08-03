"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { IProduct } from "./ProductCard.type";
import { useCart } from "./CartContext";

// // mock data
// const cart: IProduct[] = [
//   {
//     id: "1",
//     name: "Jordan Air Globe T-Shirt Kids",
//     price: 587000,
//     quantity: 1,
//     image:
//       "https://i1.t4s.cz/products/95d121-001/jordan-air-globe-t-shirt-kids-749837-95d121-001.png",
//     size: "XS",
//   },
//   {
//     id: "2",
//     name: "adidas Basketball Select Tee White",
//     price: 789000,
//     quantity: 2,
//     image:
//       "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
//     size: "L",
//   },
// ];

const ShoppingCart = () => {
  const {
    cart,
    selectCart,
    addToSelectCart,
    removeFromSelectCart,
    removeFromCart,
  } = useCart();
  const [selectItems, setSelectItems] = useState<IProduct[]>(selectCart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(cart.length).fill(false)
  );

  const handleSelectAll = () => {
    const newCheckedItems = new Array(cart.length).fill(!isSelectAll);
    setCheckedItems(newCheckedItems);
    setIsSelectAll(!isSelectAll);

    if (!isSelectAll) {
      setSelectItems(cart);
      addToSelectCart(cart);
    } else {
      setSelectItems([]);
    }
    console.log(`${isSelectAll}`);
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    const selected = cart.filter((_, idx) => newCheckedItems[idx]);
    setSelectItems(selected);
    setIsSelectAll(selected.length === cart.length);
  };

  const getTotalPrice = useCallback((): number => {
    return selectItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [selectItems]);

  useEffect(() => {
    setSelectItems(selectCart);
    const newCheckedItems = cart.map((item) =>
      selectCart.some((selectedItem) => selectedItem.id === item.id)
    );
    setCheckedItems(newCheckedItems);
    setIsSelectAll(newCheckedItems.every(Boolean));
  }, [selectCart, cart]);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [selectItems, cart, getTotalPrice]);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cart]);

  return (
    <div className="flex flex-col h-full gap-12">
      <div
        className="flex flex-col gap-6 flex-grow overflow-auto"
        style={{ maxHeight: "70vh" }}
      >
        {cart.length === 0 ? (
          <div className="flex justify-center">
            <span className="text-2xl text-base-content">Shopping cart is empty.&nbsp;</span>
            <Link href="/">
              <span className="text-2xl text-blue-500 underline cursor-pointer">
                Go shopping now!
              </span>
            </Link>
          </div>
        ) : (
          cart.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-row items-center gap-20 px-16 py-6 bg-[#EBEBD5] h-full"
            >
              <div className="size-fit">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => {
                    handleCheckboxChange(index);
                    if (checkedItems[index] === false) {
                      addToSelectCart([product]);
                      console.log(
                        `number of selected items: ${selectCart.length}`
                      );
                    } else removeFromSelectCart(product.id);
                    //console.log(`item is checked: ${checkedItems[index]}`);
                  }}
                  className="size-6 bg-white"
                />
              </div>
              <ProductCard key={product.id} product={product} />
              <button
                className="px-4 py-3 bg-white text-[#C6393F] self-end min-w-fit hover:bg-secondary hover:font-semibold"
                onClick={() => {
                  const userConfirmed = window.confirm(
                    `Are you sure you want to remove product: ${product.name}?`
                  );
                  if (userConfirmed) {
                    removeFromCart(product.id);
                    // Do this to ensure the total price is updated after deleting a product
                    const updatedSelectItems = selectItems.filter(
                      (item) => item.id !== product.id
                    );
                    setSelectItems(updatedSelectItems);
                  }
                }}
              >
                <span>Delete</span>
              </button>
            </div>
          ))
        )}
      </div>
      <div className="flex-none px-16 py-6 bg-[#EBEBD5] w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={isSelectAll}
              onChange={handleSelectAll}
              className="size-6 bg-white"
            />
            <label className="text-lg text-base-content">Choose all</label>
          </div>
          <div>
            <p className="text-xl text-base-content font-semibold">
              Total bill:{" "}
              <span>
                ${Intl.NumberFormat("vi-VN").format(totalPrice)}
              </span>
            </p>
          </div>
          <div>
            <Link href="/checkout">
              <button
                className={`px-6 py-3 ${
                  selectItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#EFD471] text-[#1A3C73] font-semibold"
                }`}
                disabled={selectItems.length === 0}
              >
                <span>Checkout</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
