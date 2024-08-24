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
import { decryptToken } from "@/lib/decrypt";

interface CartContextType {
  cart: CartItem[];
  selectCart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  addToSelectCart: (products: CartItem[]) => void;
  removeFromSelectCart: (product: CartItem) => void;
  removeAllFromSelectCart: () => void;
  removeCheckedOutItems: () => void;
  increaseQuantity: (product: CartItem) => void;
  decreaseQuantity: (product: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [selectCart, setSelectCart] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([
  ]);

  // useEffect(() => {
  //   // Retrieve the user ID from a reliable source, e.g., localStorage or another context
  //   const token = localStorage.getItem("jwt"); // Replace with the actual key used for storing user ID
  //   if (token) {
  //     const decrypted = decryptToken(token); 
  //     const payload = JSON.parse(atob(decrypted.split('.')[1]));
  //     const userID = payload.userID
  //     const fetchCartItems = async () => {
  //       try {
  //         const cartItems = await FetchCartItemsByUserID(userID);
  //         setCart(cartItems);
  //       } catch (error) {
  //         console.error("Failed to fetch cart items:", error);
  //       }
  //     };
  
  //     fetchCartItems();
  //   } else {
  //     console.log("User ID not found. Cannot fetch cart items.");
  //     // Optionally, handle the case where user ID is not available
  //   }
  // }, []); // The dependency array is empty
  

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.productID === product.productID && item.size === product.size
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

  const removeFromCart = (product: CartItem) => {
    if (product) {
      setCart((prevCart) => {
        const productToRemove = prevCart.find(
          (item) =>
            item.productID === product.productID && item.size === product.size
        );
        if (productToRemove) {
          return prevCart.filter(
            (item) =>
              !(
                item.productID === product.productID &&
                item.size === product.size
              )
          );
        } else {
          throw new Error("Product id does not exist.");
        }
      });
      removeFromSelectCart(product);
    } else throw new Error("Product id does not exist.");
  };

  const increaseQuantity = useCallback((product: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productID === product.productID && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((product: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productID === product.productID &&
        item.size === product.size &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  const addToSelectCart = (products: CartItem[]) => {
    setSelectCart((prevSelectCart) => {
      const newProducts = products.filter(
        (product) =>
          !prevSelectCart.some(
            (item) =>
              item.productID === product.productID && item.size === product.size
          )
      );
      return [...prevSelectCart, ...newProducts];
    });
  };

  const removeFromSelectCart = (product: CartItem) => {
    if (product) {
      setSelectCart((prevSelectCart) => {
        const productToRemove = prevSelectCart.find(
          (item) =>
            item.productID === product.productID && item.size === product.size
        );
        if (productToRemove) {
          return prevSelectCart.filter(
            (item) =>
              !(
                item.productID === product.productID &&
                item.size === product.size
              )
          );
        } else {
          throw new Error("Product id does not exist.");
        }
      });
    } else throw new Error("Product id does not exist.");
  };

  const removeAllFromSelectCart = () => {
    setSelectCart([]);
  };

  useEffect(() => {
    setSelectCart((prevSelectCart) =>
      prevSelectCart.map((selectItem) => {
        const cartItem = cart.find(
          (item) =>
            item.productID === selectItem.productID &&
            item.size === selectItem.size
        );
        return cartItem
          ? { ...selectItem, quantity: cartItem.quantity }
          : selectItem;
      })
    );
  }, [cart]);

  const removeCheckedOutItems = () => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !selectCart.some(
            (selectItem) =>
              selectItem.productID === item.productID &&
              selectItem.size === item.size
          )
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        selectCart,
        addToCart,
        removeFromCart,
        addToSelectCart,
        removeFromSelectCart,
        removeAllFromSelectCart,
        removeCheckedOutItems,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
