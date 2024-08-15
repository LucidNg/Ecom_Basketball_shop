"use client";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import {
  OrderItem,
  FetchCartItemsByUserID,
  FetchOrderItemsByOrderID,
} from "../../lib/productItem";
import { remove, update } from "lodash";
import { Order, OrderStatus, FetchOrdersByUserID } from "@/lib/order";

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderItems: (orderID: string) => Promise<OrderItem[]>;
  updatePaymentStatus: (orderID: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within a OrdersProvider");
  }
  return context;
};

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userID = "60629436-da35-401c-9bf8-6e8e3aed90ed"; // Replace with the actual user ID

  useEffect(() => {
    const fetchOrdersItems = async () => {
      try {
        const _orders = await FetchOrdersByUserID(userID);
        setOrders(_orders);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchOrdersItems();
  }, [userID]);

  const addOrder = (order: Order) => {
    alert(`Order ${order.orderID} is added to list of Orders`);
  };

  const getOrderItems = (orderID: string) => {
    if (orders.find((order) => order.orderID === orderID) !== undefined) {
      return FetchOrderItemsByOrderID(orderID);
    } else throw new Error("Order ID does not exist");
  };

  const updatePaymentStatus = (orderID: string, status: OrderStatus) => {
    alert(`Order ${orderID} is updated to ${status}`);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrderItems,
        updatePaymentStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
