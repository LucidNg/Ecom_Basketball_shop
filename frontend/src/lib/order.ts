import { connectString } from "./constant";
import { OrderItem } from "./productItem";

export interface Order {
  orderID: string;
  userID: string;
  orderDate: string;
  shipDate: string;
  payment_method: string;
  payment_status: string;
  shipping_method: string;
  shipping_status: string;
  totalBill: number;
  quantity: number;
}

export async function FetchOrderItemsByOrderID(
  orderID: string
): Promise<Array<OrderItem>> {
  //replace by the actual implementation
  return [
    {
      orderID: "CART001",
      productID: "PROD001",
      size: "M",
      quantity: 1,
      price: 587000,
      productName: "Air Jordan Jumpman Globe Kids T-Shirt",
      url: "https://supersports.com.vn/cdn/shop/files/95A873-U1R-1.jpg?v=1715138351&width=1000",
    },
    {
      orderID: "CART002",
      productID: "PROD002",
      size: "L",
      quantity: 1,
      price: 1096000,
      productName: "Adidas Basketball Select Shirt",
      url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/968316087fcc454e9b61c5b2106d44d0_9366/Basketball_Select_Tee_Black_IQ1038_21_model.jpg",
    },
    {
      orderID: "CART003",
      productID: "PROD003",
      size: "42",
      quantity: 1,
      price: 3190000,
      productName: "Nike Air Max 270 React",
      url: "https://sneakerdaily.vn/wp-content/uploads/2023/07/Nike-Air-Max-270-React-Bauhaus-AO4971-002.jpg.webp",
    },
    {
      orderID: "CART004",
      productID: "PROD004",
      size: "XL",
      quantity: 2,
      price: 1299000,
      productName: "Puma Essentials Logo Hoodie",
      url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586688/06/mod01/fnd/EEA/fmt/png/Essentials-Big-Logo-Hoodie-Men",
    },
    {
      orderID: "CART005",
      productID: "PROD005",
      size: "43",
      quantity: 1,
      price: 2590000,
      productName: "Under Armour UA Charged Pursuit 2 Running Shoes",
      url: "https://underarmour.scene7.com/is/image/Underarmour/3022594-001_DEFAULT?rp=standard-30pad|pdpZoomDesktop&scl=0.50&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=1836&hei=1950&size=850,850",
    },
    {
      orderID: "CART006",
      productID: "PROD006",
      size: "44",
      quantity: 1,
      price: 2190000,
      productName: "Reebok Classic Leather Shoes",
      url: "https://image.hsv-tech.io/400x0/reebok/common/21773a4a-ebef-4346-aaba-47e1e04cd91f.webp",
    },
  ];
}
