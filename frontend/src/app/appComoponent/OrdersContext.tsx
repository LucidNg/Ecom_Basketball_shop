"use client";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, FetchCartItemsByUserID } from "../../lib/productItem";
import { remove, update } from "lodash";

export interface OrderDetails {}

interface OrdersContextType {
  orders: OrderDetails[];
}

const CartContext = createContext<OrdersContextType | undefined>(undefined);
