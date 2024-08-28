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
import Link from "next/link";

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
      case ShippingStatus.Received:
        return <p className="recieved-order-stamp">Recieved</p>;
      case ShippingStatus.Pending:
        return <p className="pending-order-stamp">Pending</p>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-base-100 rounded-md shadow-md">
      <div className="mb-4">
        <span className="font-semibold">Order date: </span>
        <span className="ml-2">{order.orderDate}</span>
      </div>
      <div className="border-t border-b border-base-300 py-4">
        {order.orderItems.slice(0, 2).map((item, index) => (
          <div className="flex items-center mb-4" key={index}>
            <img
              src={item.url}
              alt={item.productName}
              className="w-16 h-16 object-cover mr-4"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.productName}</p>
              <p>x {item.quantity}</p>
            </div>
            <div className="text-right">
              <p>${Intl.NumberFormat("vi-VN").format(item.price)}</p>
            </div>
          </div>
        ))}
        {order.orderItems.length > 2 && (
          <div className="text-center text-sm text-gray-500">
            And {order.orderItems.length - 2} more items...
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="font-semibold">Order status :</span>
          <span className="text-success ml-2">
            {renderShippingStatusStamp()}
          </span>
        </div>
        <div className="flex items-center">
          <Link
            href={`/order-details/${order.orderID}`}
            className="self-center"
          >
            <button className="bg-accent text-white py-1 px-4 rounded mr-2">
              View details
            </button>
          </Link>
          <div>
            <span className="font-semibold">Total bill :</span>
            <span className="text-accent ml-2">
              ${Intl.NumberFormat("vi-VN").format(order.totalBill)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
