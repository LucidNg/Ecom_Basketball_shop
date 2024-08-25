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
import { Order, ShippingStatus, FetchOrdersByUserID } from "@/lib/order";

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  getOrderItems: (orderID: string) => Promise<OrderItem[]>;
  updateShippingStatus: (orderID: string, status: ShippingStatus) => void;
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
    setOrders((prevOrders) => {
      const existingProductIndex = prevOrders.findIndex(
        (item) => item.orderID === order.orderID
      );
      if (existingProductIndex !== -1) {
        throw new Error(
          `Server Error: the order with ID ${order.orderID} has already existed`
        );
      } else {
        return [...prevOrders, order];
      }
    });
    alert(`Order ${order.orderID} is added to list of Orders`);
  };

  const getOrder = (orderId: string): Order | undefined => {
    const order = orders.find((order) => order.orderID === orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    return order;
  };

  const getOrderItems = (orderID: string) => {
    if (orders.find((order) => order.orderID === orderID) !== undefined) {
      return FetchOrderItemsByOrderID(orderID);
    } else throw new Error(`Order with ID ${orderID} not found.`);
  };

  const updateShippingStatus = (orderID: string, status: ShippingStatus) => {
    const orderIndex = orders.findIndex((order) => order.orderID === orderID);

    if (orderIndex === -1) {
      throw new Error(`Order with ID ${orderID} not found.`);
    }

    const updatedOrders = [...orders];
    updatedOrders[orderIndex].shippingStatus = status;
    setOrders(updatedOrders);

    alert(`Order ${orderID} is updated to ${status}`);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
        getOrderItems,
        updateShippingStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
