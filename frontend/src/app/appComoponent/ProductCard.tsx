"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductCardProps } from "./ProductCard.type";
import { useCart } from "./CartContext";

const ProductCard = ({ product, isEditable }: ProductCardProps) => {
  //console.log(`Rendering ProductCard for product ID: ${product.id}`);
  //const [quantity, setQuantity] = useState<number>(product.quantity);
  const { increaseQuantity, decreaseQuantity } = useCart();

  const _decreaseQuantity = () => {
    //if (quantity > 1) setQuantity(quantity - 1);
    //console.log(`decrease quantity button clicked!`);
    decreaseQuantity(product);
  };

  const _increaseQuantity = () => {
    //setQuantity(quantity + 1);
    //console.log(`increase quantity button clicked!`);
    increaseQuantity(product);
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
        <p className="text-primary-content font-semibold text-2xl">
          {product.name}
        </p>
        <p className="text-primary-content font-normal text-lg">
          Size: {product.size}
        </p>
        <p className="text-xl text-base-content">
          ${Intl.NumberFormat("vi-VN").format(product.price)}
        </p>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 text-base-content">
            {isEditable && (
              <>
                <button
                  className="py-2 px-3 bg-base-100"
                  onClick={() => _decreaseQuantity()}
                >
                  <span className="leading-none">-</span>
                </button>
              </>
            )}
            {!isEditable && "Quantity:"}
            <p className="w-6 text-center">x{product.quantity}</p>
            {isEditable && (
              <>
                <button
                  className="py-2 px-3 bg-base-100"
                  onClick={() => _increaseQuantity()}
                >
                  <span className="leading-none">+</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
