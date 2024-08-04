"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { IProduct } from "./ProductCard.type";
import { useCart } from "./CartContext";

const ShoppingCart = () => {
  const {
    cart,
    selectCart,
    addToSelectCart,
    removeFromSelectCart,
    removeAllFromSelectCart,
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
      removeAllFromSelectCart();
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
    return selectCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [selectCart]);

  // useEffect(() => {
  //   setSelectItems(selectCart);
  //   const newCheckedItems = cart.map((item) =>
  //     selectCart.some((selectedItem) => selectedItem.id === item.id)
  //   );
  //   setCheckedItems(newCheckedItems);
  //   setIsSelectAll(newCheckedItems.every(Boolean));
  // }, [selectCart, cart]);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [selectCart, cart, getTotalPrice]);

  return (
    <div className="flex flex-col h-full gap-12">
      <div
        className="flex flex-col gap-6 flex-grow overflow-auto"
        style={{ maxHeight: "70vh" }}
      >
        {cart.length === 0 ? (
          <div className="flex justify-center">
            <span className="text-2xl text-base-content">
              Shopping cart is empty.&nbsp;
            </span>
            <Link href="/">
              <span className="text-2xl text-info underline cursor-pointer">
                Go shopping now!
              </span>
            </Link>
          </div>
        ) : (
          cart.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-row items-center gap-20 px-16 py-6 bg-primary h-full"
            >
              <div className="size-fit">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => {
                    handleCheckboxChange(index);
                    if (checkedItems[index] === false) {
                      addToSelectCart([product]);
                    } else removeFromSelectCart(product);
                    //console.log(`item is checked: ${checkedItems[index]}`);
                  }}
                  className="size-6 custom-checkbox"
                />
              </div>
              <ProductCard
                key={product.id}
                product={product}
                isEditable={true}
              />
              <button
                className="px-4 py-3 bg-base-100 text-accent self-end min-w-fit hover:bg-accent hover:font-semibold hover:text-accent-content"
                onClick={() => {
                  const userConfirmed = window.confirm(
                    `Are you sure you want to remove product: ${product.name}?`
                  );
                  if (userConfirmed) {
                    removeFromCart(product);
                    // Do this to ensure the total price is updated after deleting a product
                    const updatedSelectItems = selectItems.filter(
                      (item) =>
                        item.id !== product.id && item.size === product.size
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
      <div className="flex-none px-16 py-6 bg-primary w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={isSelectAll}
              onChange={handleSelectAll}
              className="size-6 bg-base-100 custom-checkbox"
            />
            <label className="text-lg text-base-content">Choose all</label>
          </div>
          <div>
            <p className="text-xl text-base-content font-semibold">
              Total bill:{" "}
              <span>${Intl.NumberFormat("vi-VN").format(totalPrice)}</span>
            </p>
          </div>
          <div>
            <Link href="/checkout">
              <button
                className={`px-6 py-3 ${
                  selectItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary text-secondary-content font-semibold hover:bg-secondary-content hover:text-secondary hover:font-semibold}"
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
