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
import { Order, OrderStatus, FetchOrdersByUserID } from "@/lib/order";

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updatePaymentStatus: (order: Order, status: OrderStatus) => void;
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
        const cartItems = await FetchOrdersByUserID(userID);
        setOrders(cartItems);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchOrdersItems();
  }, [userID]);

  const addOrder = (order: Order) => {
    alert(`Order ${order.orderID} is added to list of Orders`);
  };

  const updatePaymentStatus = (order: Order, status: OrderStatus) => {
    alert(`Order ${order.orderID} is updated to ${status}`);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updatePaymentStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
