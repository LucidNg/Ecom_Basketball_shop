import { connectString } from "./constant";

export interface OrderItem {
  orderID: string;
  productID: string;
  quantity: number;
  size: string;
  price: number;
  productName: string;
  url: string;
}

export type ProductCardProps = {
  product: OrderItem;
  isEditable: boolean;
};
