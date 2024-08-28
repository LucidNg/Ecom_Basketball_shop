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
import {
  Order,
  ShippingStatus,
  FetchOrdersByUserID,
  convertToOrder,
} from "@/lib/order";
import { decryptToken } from "@/lib/decrypt";

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
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
  //const userID = "60629436-da35-401c-9bf8-6e8e3aed90ed"; // Replace with the actual user ID
  const [tokenAvailable, setTokenAvailable] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt"); // Check immediately if token is available

    if (token) {
      setTokenAvailable(true);
    } else {
      // Set up an interval to keep checking for the token
      const checkForToken = setInterval(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
          setTokenAvailable(true);
          clearInterval(checkForToken);
        }
      }, 100); // Adjust interval as needed

      return () => clearInterval(checkForToken); // Clear interval on component unmount
    }
  }, []);

  useEffect(() => {
    if (!tokenAvailable) return; // Only proceed if token is available

    const token = localStorage.getItem("jwt");
    if (token) {
      const decrypted = decryptToken(token);
      const payload = JSON.parse(atob(decrypted.split(".")[1]));
      const userID = payload.userID;

      const fetchOrders = async () => {
        try {
          const _ordersByUserID = await FetchOrdersByUserID(userID);
          if (_ordersByUserID && _ordersByUserID.orders) {
            const _ordersPromises = _ordersByUserID.orders.map(
              (orderRequest) => {
                return convertToOrder(orderRequest);
              }
            );
            const _orders = await Promise.all(_ordersPromises);
            setOrders(_orders);
          }
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      };
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [tokenAvailable]);

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
    console.log("New orders: ", orders);
  };

  const getOrder = (orderId: string): Order | undefined => {
    const order = orders.find((order) => order.orderID === orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    return order;
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
        updateShippingStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
