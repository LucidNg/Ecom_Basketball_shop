"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CartItem,
  OrderItem,
  ProductCardProps,
  isCartItem,
  isOrderItem,
} from "../../lib/productItem";
import { useOrders } from "./OrdersContext";
import { FetchOrdersByUserID, Order, ShippingStatus } from "@/lib/order";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const renderShippingStatusStamp = () => {
    switch (order.shippingStatus) {
      case ShippingStatus.Delivered:
        return <p className="successful-delivery-stamp">Successful Delivery</p>;
      case ShippingStatus.Delivering:
        return <p className="ongoing-delivery-stamp">Delivering</p>;
      case ShippingStatus.Canceled:
        return <p className="canceled-order-stamp">Canceled</p>;
      case ShippingStatus.Received:
        return <p className="recieved-order-stamp">Recieved</p>;
      case ShippingStatus.Pending:
        return <p className="pending-order-stamp">Pending</p>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <div className="mb-4">
        <span className="font-semibold">Order date: </span>
        <span className="ml-2">{order.orderDate}</span>
      </div>
      <div className="border-t border-b border-gray-300 py-4">
        <div className="flex items-center mb-4">
          <img
            src="https://supersports.com.vn/cdn/shop/files/95A873-U1R-1.jpg?v=1715138351&width=1000"
            alt="Air Jordan Jumpman Globe Kids T-Shirt"
            className="w-16 h-16 object-cover mr-4"
          />
          <div className="flex-1">
            <p className="font-semibold">
              Air Jordan Jumpman Globe Kids T-Shirt "White"
            </p>
            <p>x 1</p>
          </div>
          <div className="text-right">
            <p>đ 587.000</p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/968316087fcc454e9b61c5b2106d44d0_9366/Basketball_Select_Tee_Black_IQ1038_21_model.jpg"
            alt="Adidas Basketball Select Shirt"
            className="w-16 h-16 object-cover mr-4"
          />
          <div className="flex-1">
            <p className="font-semibold">
              Adidas Basketball Select Shirt "Cloud White"
            </p>
            <p>x 1</p>
          </div>
          <div className="text-right">
            <p>đ 1.096.000</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          And 5 more items...
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="font-semibold">Order status :</span>
          <span className="text-green-600 ml-2">
            {renderShippingStatusStamp()}
          </span>
        </div>
        <button className="bg-red-500 text-white py-1 px-4 rounded">
          View details
        </button>
        <div>
          <span className="font-semibold">Totall bill :</span>
          <span className="text-red-500 ml-2">đ 1.703.000</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
