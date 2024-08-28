import { connectString } from "./constant";

export interface ProductItem {
  productID: string;
  size: string;
  quantity: number;
  price: number;
  productName: string;
  url: string;
}

export interface CartItem extends ProductItem {
  cartID: string;
}

export interface OrderItem extends ProductItem {
  orderID: string;
}

export type ProductCardProps<T extends ProductItem> = {
  product: T;
  isEditable: boolean;
};

export const isCartItem = (item: CartItem | OrderItem): item is CartItem => {
  return (item as CartItem).cartID !== undefined;
};

export const isOrderItem = (item: CartItem | OrderItem): item is OrderItem => {
  return (item as CartItem).cartID !== undefined;
};

export function convertCartItemToOrderItem(
  cartItem: CartItem,
  orderID: string
): OrderItem {
  const { cartID, ...rest } = cartItem; // Destructure and exclude cartID
  return {
    ...rest, // Spread the remaining properties
    orderID, // Add or overwrite orderID property
  };
}

export async function FetchCartItemsByUserID(
  userID: string
): Promise<Array<CartItem>> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/cartItem/${userID}`
    : `${connectString}/cartItem/${userID}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cart items for user with ID: ${userID}`);
  }

  const data = await response.json();
  return data as Array<CartItem>;
}

export async function FetchOrderItemsByOrderID(
  orderID: string
): Promise<Array<OrderItem>> {
  //replace by the actual implementation
  return [
    {
      orderID: "ORDER001",
      productID: "PROD001",
      size: "M",
      quantity: 1,
      price: 587000,
      productName: "Air Jordan Jumpman Globe Kids T-Shirt",
      url: "https://supersports.com.vn/cdn/shop/files/95A873-U1R-1.jpg?v=1715138351&width=1000",
    },
    {
      orderID: "ORDER001",
      productID: "PROD002",
      size: "L",
      quantity: 1,
      price: 1096000,
      productName: "Adidas Basketball Select Shirt",
      url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/968316087fcc454e9b61c5b2106d44d0_9366/Basketball_Select_Tee_Black_IQ1038_21_model.jpg",
    },
    {
      orderID: "ORDER001",
      productID: "PROD003",
      size: "42",
      quantity: 1,
      price: 3190000,
      productName: "Nike Air Max 270 React",
      url: "https://sneakerdaily.vn/wp-content/uploads/2023/07/Nike-Air-Max-270-React-Bauhaus-AO4971-002.jpg.webp",
    },
    {
      orderID: "CART001",
      productID: "PROD004",
      size: "XL",
      quantity: 2,
      price: 1299000,
      productName: "Puma Essentials Logo Hoodie",
      url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586688/06/mod01/fnd/EEA/fmt/png/Essentials-Big-Logo-Hoodie-Men",
    },
    {
      orderID: "ORDER001",
      productID: "PROD005",
      size: "43",
      quantity: 1,
      price: 2590000,
      productName: "Under Armour UA Charged Pursuit 2 Running Shoes",
      url: "https://underarmour.scene7.com/is/image/Underarmour/3022594-001_DEFAULT?rp=standard-30pad|pdpZoomDesktop&scl=0.50&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=1836&hei=1950&size=850,850",
    },
    {
      orderID: "ORDER001",
      productID: "PROD006",
      size: "44",
      quantity: 1,
      price: 2190000,
      productName: "Reebok Classic Leather Shoes",
      url: "https://image.hsv-tech.io/400x0/reebok/common/21773a4a-ebef-4346-aaba-47e1e04cd91f.webp",
    },
  ];
}
