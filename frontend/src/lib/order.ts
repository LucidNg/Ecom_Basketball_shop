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
  items: OrderItem[];
}
