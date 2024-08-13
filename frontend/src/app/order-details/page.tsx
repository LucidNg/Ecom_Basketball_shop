"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductCard from "../appComoponent/ProductCard";
import { CartItem } from "../../lib/cartItem";
import { useCart } from "../appComoponent/CartContext";

export default function OrderDetails() {
  const { selectCart } = useCart(); //replace with the actual orderDetails object
  const [orderStatus, setOrderStatus] = useState("pending");

  // Function to render the appropriate stamp based on orderStatus
  const renderOrderStatusStamp = () => {
    switch (orderStatus) {
      case "successful":
        return <p className="successful-delivery-stamp">Successful Delivery</p>;
      case "delivering":
        return <p className="ongoing-delivery-stamp">Delivering</p>;
      case "canceled":
        return <p className="canceled-order-stamp">Canceled</p>;
      case "recieved":
        return <p className="recieved-order-stamp">Recieved</p>;
      case "pending":
        return <p className="pending-order-stamp">Pending</p>;
      default:
        return null;
    }
  };

  const renderUserButtons = () => {
    if (orderStatus === "canceled" || orderStatus === "recieved") return null;
    return (
      <div className="mt-6 flex justify-between gap-4">
        {(orderStatus === "delivering" || orderStatus === "pending") && (
          <button
            className=" text-error text-xl font-semibold py-4 px-8 rounded-xl 
            flex-grow
            transition
            transition-duration-300
            transition-property:scale,box-shadow,background-color
            hover:scale-105 hover:drop-shadow-xl hover:bg-accent hover:text-accent-content 
            outline-none
            border
            border-error"
            onClick={handleCancelButton}
          >
            Cancel order
          </button>
        )}

        <button
          className="bg-secondary text-black text-xl font-semibold py-4 px-8 rounded-xl 
            flex-grow  
            transition
            transition-duration-300
            transition-property:scale,box-shadow,background-color
            hover:scale-105 hover:drop-shadow-xl hover:bg-secondary-content hover:text-secondary 
            outline-none
            border-none"
          onClick={handleConfirmButton}
        >
          I have received it!
        </button>
      </div>
    );
  };

  const handleConfirmButton = () => {
    setOrderStatus("recieved");
  };
  const handleCancelButton = () => {
    setOrderStatus("canceled");
  };

  return (
    <div className="p-10">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">
          {<span className="font-semibold text-info">#12/05/2024</span>} Order
          Details
        </h1>
        <div className="space-y-4"></div>
        <div
          className="flex flex-col gap-6 flex-grow overflow-auto"
          style={{ maxHeight: "45vh" }}
        >
          {selectCart.map((product, index) => (
            <div
              key={product.productID}
              className="flex flex-row items-center gap-20 px-16 py-6 bg-primary h-full"
            >
              <ProductCard
                key={product.productID}
                product={product}
                isEditable={false}
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <p className="font-medium text-xl">Coupon applied :</p>
            <p className="font-medium text-lg">Xc6A8</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="font-medium text-xl">Delivery method :</p>
            <p className="font-medium text-lg">Standard</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="font-medium text-xl">Estimated time of delivery :</p>
            <p className="font-medium text-lg">~17/05/2024</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="font-medium text-xl">Payment Method :</p>
            <p className="font-medium text-lg">COD</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-bold text-2xl">Total bill :</p>
            <p className="font-bold text-2xl text-red-600">$ 1.563.000</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-medium text-xl">Order status :</p>
            {renderOrderStatusStamp()}
          </div>
        </div>

        {renderUserButtons()}
      </div>
    </div>
  );
}
