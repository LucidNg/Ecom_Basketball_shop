"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import OrderCard from "../appComoponent/OrderCard";
import { useOrders } from "../appComoponent/OrdersContext";
import { FetchOrdersByUserID, ShippingStatus } from "@/lib/order";

export default function TrackingOrders() {
  //const userID = "60629436-da35-401c-9bf8-6e8e3aed90ed";
  const { orders } = useOrders();

  // Filter orders based on status
  const successfulOrders = orders.filter(
    (order) => order.shippingStatus === ShippingStatus.Received
  );
  const processingOrders = orders.filter(
    (order) =>
      order.shippingStatus === ShippingStatus.Delivered ||
      order.shippingStatus === ShippingStatus.Delivering ||
      order.shippingStatus === ShippingStatus.Pending
  );
  // const canceledOrders = orders.filter(
  //   (order) => order.shippingStatus === ShippingStatus.Canceled
  // );

  return (
    <div className="p-10">
      <div role="tablist" className="tabs tabs-lifted p-">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab [--tab-bg:#ebebd3] font-semibold text-2xl"
          aria-label="Successful"
        />
        <div
          role="tabpanel"
          className="tab-content border-base-300 bg-primary rounded-box p-6 space-y-4"
        >
          {successfulOrders.map((order) => (
            <OrderCard key={order.orderID} order={order} />
          ))}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab [--tab-bg:#ebebd3] font-semibold text-2xl"
          aria-label="Processing"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content border-base-300 bg-primary rounded-box p-6 space-y-4"
        >
          {processingOrders.map((order) => (
            <OrderCard key={order.orderID} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
