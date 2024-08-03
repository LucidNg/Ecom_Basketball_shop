"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IProduct } from "./ProductCard.type";
import ProductCard from "./ProductCard";
import { remove, update } from "lodash";

interface CartContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
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
  const [cart, setCart] = useState<IProduct[] | []>(
    [
      {
        id: "1",
        name: "Jordan Air Globe T-Shirt Kids",
        price: 587000,
        quantity: 1,
        image:
          "https://i1.t4s.cz/products/95d121-001/jordan-air-globe-t-shirt-kids-749837-95d121-001.png",
        size: "XS",
      },
      {
        id: "2",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
      {
        id: "3",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
      {
        id: "4",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
      {
        id: "5",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
      {
        id: "6",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
      {
        id: "7",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
      {
        id: "8",
        name: "adidas Basketball Select Tee White",
        price: 789000,
        quantity: 2,
        image:
          "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
        size: "L",
      },
    ]
    //[]
  );
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

  const removeFromCart = (productId: string) => {
    if (productId) {
      setCart((prevCart) => {
        const productToRemove = prevCart.find((item) => item.id === productId);
        if (productToRemove) {
          return prevCart.filter((item) => item.id !== productId);
        } else {
          throw new Error("Product id does not exist.");
        }
      });
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
          const updatedCart = [...prevCart];
          if (updatedCart[existingProductIndex].quantity > 1) {
            updatedCart[existingProductIndex].quantity -= 1;
          }
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
