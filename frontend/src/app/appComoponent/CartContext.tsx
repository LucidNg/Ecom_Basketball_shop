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

const mock_data = [
  {
    cartID: "ORDER001",
    productID: "PROD001",
    size: "M",
    quantity: 1,
    price: 587000,
    productName: "Air Jordan Jumpman Globe Kids T-Shirt",
    url: "https://supersports.com.vn/cdn/shop/files/95A873-U1R-1.jpg?v=1715138351&width=1000",
  },
  {
    cartID: "ORDER001",
    productID: "PROD002",
    size: "L",
    quantity: 1,
    price: 1096000,
    productName: "Adidas Basketball Select Shirt",
    url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/968316087fcc454e9b61c5b2106d44d0_9366/Basketball_Select_Tee_Black_IQ1038_21_model.jpg",
  },
  {
    cartID: "ORDER001",
    productID: "PROD003",
    size: "42",
    quantity: 1,
    price: 3190000,
    productName: "Nike Air Max 270 React",
    url: "https://sneakerdaily.vn/wp-content/uploads/2023/07/Nike-Air-Max-270-React-Bauhaus-AO4971-002.jpg.webp",
  },
  {
    cartID: "CART001",
    productID: "PROD004",
    size: "XL",
    quantity: 2,
    price: 1299000,
    productName: "Puma Essentials Logo Hoodie",
    url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586688/06/mod01/fnd/EEA/fmt/png/Essentials-Big-Logo-Hoodie-Men",
  },
  {
    cartID: "ORDER001",
    productID: "PROD005",
    size: "43",
    quantity: 1,
    price: 2590000,
    productName: "Under Armour UA Charged Pursuit 2 Running Shoes",
    url: "https://underarmour.scene7.com/is/image/Underarmour/3022594-001_DEFAULT?rp=standard-30pad|pdpZoomDesktop&scl=0.50&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=1836&hei=1950&size=850,850",
  },
  {
    cartID: "ORDER001",
    productID: "PROD006",
    size: "44",
    quantity: 1,
    price: 2190000,
    productName: "Reebok Classic Leather Shoes",
    url: "https://image.hsv-tech.io/400x0/reebok/common/21773a4a-ebef-4346-aaba-47e1e04cd91f.webp",
  },
  {
    cartID: "ORDER001",
    productID: "PROD006",
    size: "45",
    quantity: 1,
    price: 2200000,
    productName: "Reebok Classic Leather Shoes",
    url: "https://image.hsv-tech.io/400x0/reebok/common/21773a4a-ebef-4346-aaba-47e1e04cd91f.webp",
  },
];

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
  const [cart, setCart] = useState<CartItem[]>(mock_data);

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

      const fetchCartItems = async () => {
        try {
          const cartItems = await FetchCartItemsByUserID(userID);
          setCart(cartItems);
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      };

      fetchCartItems();
    } else {
      setCart([]);
    }
  }, [tokenAvailable]); // Dependency array includes tokenAvailable

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
