"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "./ProductCard.type";
import Link from "next/link";

const cartItems: IProduct[] = [
  {
    id: "1",
    name: "Jordan Air Globe T-Shirt Kids",
    price: 587000,
    quantity: 1,
    image:
      "https://i1.t4s.cz/products/95d121-001/jordan-air-globe-t-shirt-kids-749837-95d121-001.png",
  },
  {
    id: "2",
    name: "adidas Basketball Select Tee White",
    price: 789000,
    quantity: 2,
    image:
      "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
  },
];

const ShoppingCart = () => {
  const [selectItems, setSelectItems] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(cartItems.length).fill(false)
  );

  const handleSelectAll = () => {
    const newCheckedItems = new Array(cartItems.length).fill(!isSelectAll);
    setCheckedItems(newCheckedItems);
    setIsSelectAll(!isSelectAll);

    if (!isSelectAll) {
      setSelectItems(cartItems);
    } else {
      setSelectItems([]);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    const selected = cartItems.filter((_, idx) => newCheckedItems[idx]);
    setSelectItems(selected);
    setIsSelectAll(selected.length === cartItems.length);
  };

  const getTotalBill = (): number => {
    return selectItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    setTotalPrice(getTotalBill());
  }, [selectItems]);

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 h-max">
          {cartItems.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-row items-center gap-20 px-16 py-6 bg-[#EBEBD5] h-full"
            >
              <div className="size-fit">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="size-6 bg-white"
                />
              </div>
              <ProductCard key={product.id} product={product} />
              <button className="px-4 py-3 bg-white text-[#C6393F] self-end min-w-fit">
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex px-16 py-6 bg-[#EBEBD5] w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={handleSelectAll}
                className="size-6 bg-white"
              />
              <label className="text-lg">Choose all</label>
            </div>
            <div>
              <p>
                Total bill:{" "}
                <span className="text-xl">
                  {getTotalBill().toLocaleString()}{" "}
                  <span className="underline">đ</span>
                </span>
              </p>
            </div>
            <div>
              <Link href="/checkout">
                <button className="px-6 py-3 bg-[#EFD471] text-[#1A3C73]">
                  <span>Check out</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
