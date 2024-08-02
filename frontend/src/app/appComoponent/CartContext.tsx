"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IProduct } from "./ProductCard.type";
import ProductCard from "./ProductCard";
import { remove, update } from "lodash";

interface CartContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string | undefined) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
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
      return cart;
    } else throw new Error("Product id does not exist.");
  };

  const increaseQuantity = (productId: string) => {
    if (productId) {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) => item.id === productId
        );
        if (existingProductIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].quantity += 1;
          return updatedCart;
        } else return prevCart;
      });
    } else throw new Error("Product id does not exist.");
  };

  const decreaseQuantity = (productId: string) => {
    if (productId) {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) => item.id === productId
        );
        if (existingProductIndex !== -1) {
          let updatedCart = [...prevCart];
          if (updatedCart[existingProductIndex].quantity > 0) {
            updatedCart[existingProductIndex].quantity -= 1;
          } else updatedCart = removeFromCart(productId);
          return updatedCart;
        } else return prevCart;
      });
    } else throw new Error("Product id does not exist.");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};
