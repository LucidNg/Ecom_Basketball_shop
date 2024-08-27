"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "../../appComoponent/ProductCard";
import { OrderItem } from "../../../lib/productItem";
import { Order, OrderDetailsProps, ShippingStatus } from "@/lib/order";
import { useOrders, OrdersProvider } from "../../appComoponent/OrdersContext";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { getOrder, getOrderItems, updateShippingStatus } = useOrders();
  const [order, setOrder] = useState<Order>();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  //const [order.shippingStatus, setShippingStatus] = useState("delivered");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const normalizedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;
        const details = await getOrder(normalizedOrderId);
        setOrder(details);
      } catch (error) {
        console.error("Failed to fetch order details: ", error);
        throw new Error();
      }
    };

    fetchOrderDetails();
  }, [orderId, getOrder]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getOrderItems(order ? order.orderID : "");
        setOrderItems(items);
      } catch (error) {
        console.error("Failed to fetch order items: ", error);
      }
    };

    fetchItems();
  }, [order, getOrderItems]);

  if (order === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          The order ID {orderId} does not exist
        </p>
      </div>
    );
  }

  // Function to render the appropriate stamp based on order.shippingStatus
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

  const renderUserButtons = () => {
    if (
      order.shippingStatus === ShippingStatus.Canceled ||
      order.shippingStatus === ShippingStatus.Received
    )
      return null;

    return (
      <div className="mt-6 flex justify-between gap-4">
        {/* Cancel button container */}
        {(order.shippingStatus === ShippingStatus.Delivering ||
          order.shippingStatus === ShippingStatus.Pending) && (
          <div className="flex-grow">
            <button
              className="text-error text-xl font-semibold py-4 px-8 rounded-xl
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
          </div>
        )}

        {/* Confirm button container */}
        {order.shippingStatus === ShippingStatus.Delivered && (
          <div className="ml-auto">
            <button
              className="bg-secondary text-primary-content text-xl font-semibold py-2 px-4
                hover:bg-secondary-content hover:text-secondary
                outline-none
                border-none"
              onClick={handleConfirmButton}
            >
              I have received it!
            </button>
          </div>
        )}
      </div>
    );
  };

  const handleConfirmButton = () => {
    updateShippingStatus(order.orderID, ShippingStatus.Received);
  };
  const handleCancelButton = () => {
    updateShippingStatus(order.orderID, ShippingStatus.Canceled);
  };

  return (
    <div className="p-10">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-primary-content">
          Order&apos;s ID.
          {<span className="font-semibold text-info pl-2">#{orderId}</span>}
        </h1>
        <div className="space-y-4"></div>
        <div className="flex flex-col gap-6">
          {orderItems.map((item, index) => (
            <div
              key={item.productID}
              className="flex flex-row items-center gap-20 px-16 py-6 bg-primary h-full"
            >
              <ProductCard
                key={item.productID}
                product={item}
                isEditable={false}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 text-primary-content">
          <div className="flex justify-between">
            <p className="font-medium text-xl">Coupon applied :</p>
            <p className="font-medium text-lg">{order.coupon}</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="font-medium text-xl">Delivery method :</p>
            <p className="font-medium text-lg">{order.shippingMethod}</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="font-medium text-xl">Estimated time of delivery :</p>
            <p className="font-medium text-lg">17/05/2024</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="font-medium text-xl">Payment Method :</p>
            <p className="font-medium text-lg">{order.paymentMethod}</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-bold text-2xl">Total bill :</p>
            <p className="font-bold text-2xl">$ {order.totalBill}</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-medium text-xl">Order status :</p>
            {renderShippingStatusStamp()}
          </div>
        </div>

        {renderUserButtons()}
      </div>
    </div>
  );
}
