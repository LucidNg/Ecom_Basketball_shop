"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IProduct } from "./ProductCard.type";
import ProductCard from "./ProductCard";
import { remove } from "lodash";

interface CartContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart myust be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<IProduct[] | []>([]);

  const addToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId: string | undefined) => {
    if (productId) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else throw new Error("Product id does not exist.");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {" "}
      {children}
    </CartContext.Provider>
  );
};
