"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductCard from "../appComoponent/ProductCard";
import { CartItem } from "../../lib/productItem";
import { useCart } from "../appComoponent/CartContext";

export default function TrackingOrders() {
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
          className="tab-content border-base-300 bg-primary rounded-box p-6"
        >
          Tab content 1
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
          className="tab-content border-base-300 bg-primary rounded-box p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab [--tab-bg:#ebebd3] font-semibold text-2xl"
          aria-label="Canceled"
        />
        <div
          role="tabpanel"
          className="tab-content border-base-300 bg-primary rounded-box p-6"
        >
          Tab content 3
        </div>
      </div>
    </div>
  );
}
