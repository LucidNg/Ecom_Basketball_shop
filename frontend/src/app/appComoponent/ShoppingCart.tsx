import React from "react";
import Image from "next/image";

//Mock data
const cartItems = [
  {
    id: 1,
    name: 'Air Jordan Jumpman Globe Kids T-Shirt "White"',
    price: 587000,
    quantity: 1,
    imageUrl: "/path/to/air-jordan.jpg", // replace with your image path
  },
  {
    id: 2,
    name: 'Adidas Basketball Select Shirt "Cloud White"',
    price: 1096000,
    quantity: 1,
    imageUrl: "/path/to/adidas-shirt.jpg", // replace with your image path
  },
];

export default function ShoppingCart({
  children,
}: {
  children: React.ReactNode;
}) {
  const calculateTotalBill = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
}
