"use client";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { IProduct } from "./ProductCard.type";
import ProductCard from "./ProductCard";
import { remove, update } from "lodash";

interface CartContextType {
  cart: IProduct[];
  selectCart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  addToSelectCart: (products: IProduct[]) => void;
  removeFromSelectCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
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
  const [selectCart, setSelectCart] = useState<IProduct[] | []>([]);
  const [cart, setCart] = useState<IProduct[] | []>([
    // {
    //   id: "1",
    //   name: "Jordan Globe Tee Kids XS",
    //   price: 25.99,
    //   quantity: 1,
    //   image:
    //     "https://i1.t4s.cz/products/95d121-001/jordan-air-globe-t-shirt-kids-749837-95d121-001.png",
    //   size: "XS",
    // },
    // {
    //   id: "2",
    //   name: "adidas Hoops Tee L",
    //   price: 34.99,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
    // {
    //   id: "3",
    //   name: "adidas Court Tee L",
    //   price: 32.5,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
    // {
    //   id: "4",
    //   name: "adidas Slam Tee L",
    //   price: 33.75,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
    // {
    //   id: "5",
    //   name: "adidas Dunk Tee L",
    //   price: 35.0,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
    // {
    //   id: "6",
    //   name: "adidas Dribble Tee L",
    //   price: 30.99,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
    // {
    //   id: "7",
    //   name: "adidas Fastbreak Tee L",
    //   price: 31.5,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
    // {
    //   id: "8",
    //   name: "adidas Crossover Tee L",
    //   price: 34.25,
    //   quantity: 2,
    //   image:
    //     "https://www.cosmossport.gr/2869439-product_medium/adidas-basketball-select-tee.jpg",
    //   size: "L",
    // },
  ]);
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

  // 1
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

  // 2
  // const increaseQuantity = useCallback(
  //   (productId: string) => {
  //     if (productId) {
  //       setCart((prevCart) => {
  //         const existingProductIndex = prevCart.findIndex(
  //           (item) => item.id === productId
  //         );
  //         if (existingProductIndex !== -1) {
  //           const updatedCart = [...prevCart];
  //           updatedCart[existingProductIndex].quantity += 1;
  //           return updatedCart;
  //         } else return prevCart;
  //       });
  //     } else throw new Error("Product id does not exist.");
  //   },
  //   [setCart]
  // ); // Dependency on setCart

  // const decreaseQuantity = useCallback(
  //   (productId: string) => {
  //     if (productId) {
  //       setCart((prevCart) => {
  //         const existingProductIndex = prevCart.findIndex(
  //           (item) => item.id === productId
  //         );
  //         if (existingProductIndex !== -1) {
  //           const updatedCart = [...prevCart];
  //           if (updatedCart[existingProductIndex].quantity > 1) {
  //             updatedCart[existingProductIndex].quantity -= 1;
  //           }
  //           return updatedCart;
  //         } else return prevCart;
  //       });
  //     } else throw new Error("Product id does not exist.");
  //   },
  //   [setCart]
  // ); // Dependency on setCart

  // 3
  // const increaseQuantity = (productId: string) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const decreaseQuantity = (productId: string) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === productId && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  const addToSelectCart = (products: IProduct[]) => {
    setSelectCart((prevSelectCart) => {
      // Filter out the products that already exist in the selectCart
      const newProducts = products.filter(
        (product) => !prevSelectCart.some((item) => item.id === product.id)
      );

      // Add only the new products to the selectCart
      return [...prevSelectCart, ...newProducts];
    });
  };

  const removeFromSelectCart = (productId: string) => {
    if (productId) {
      setSelectCart((prevSelectCart) => {
        const productToRemove = prevSelectCart.find(
          (item) => item.id === productId
        );
        if (productToRemove) {
          return prevSelectCart.filter((item) => item.id !== productId);
        } else {
          throw new Error("Product id does not exist.");
        }
      });
    } else throw new Error("Product id does not exist.");
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
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};
