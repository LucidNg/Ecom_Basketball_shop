"use client";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { OrderItem } from "../../lib/productItem";
import { remove, update } from "lodash";
import { Order } from "@/lib/order";

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updatePaymentStatus: (order: Order) => void;
}

const CartContext = createContext<OrdersContextType | undefined>(undefined);
