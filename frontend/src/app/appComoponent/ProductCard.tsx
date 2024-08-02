"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductCardProps } from "./ProductCard.type";

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center gap-12 w-full ">
      <div className="min-w-52 size-52">
        <Image
          src={product.image}
          width={206}
          height={206}
          alt="product image"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between h-52 w-full">
        <p className="text-[#1E1E1E] font-semibold text-2xl">{product.name}</p>
        <p className="text-[#1E1E1E] font-normal text-lg">
          Size: {product.size}
        </p>
        <p className="text-xl">
          {product.price.toLocaleString()} <span className="underline">đ</span>
        </p>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <button className="py-2 px-3 bg-white" onClick={decreaseQuantity}>
              <span className="leading-none">-</span>
            </button>
            <p className="w-6 text-center">{quantity}</p>
            <button className="py-2 px-3 bg-white" onClick={increaseQuantity}>
              <span className="leading-none">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
