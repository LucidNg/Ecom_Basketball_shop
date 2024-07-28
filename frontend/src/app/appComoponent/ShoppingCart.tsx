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

  return (
    <div className="container mx-auto p-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border-b"
        >
          <input type="checkbox" className="mr-4" />
          <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
          <div className="flex-1 ml-4">
            <p className="font-semibold">{item.name}</p>
            <p>{item.price.toLocaleString()} ₫</p>
          </div>
          <div className="flex items-center">
            <button className="px-2">-</button>
            <span className="px-2">{item.quantity}</span>
            <button className="px-2">+</button>
          </div>
          <button className="ml-4 text-red-600">Xóa ngay</button>
        </div>
      ))}
      <div className="flex items-center justify-between p-4">
        <input type="checkbox" className="mr-4" />
        <span>Chọn hết</span>
        <div className="flex-1 text-right">
          <span className="font-semibold">
            Tổng thanh toán: {calculateTotalBill().toLocaleString()} ₫
          </span>
        </div>
        <button className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded">
          Mua hàng
        </button>
      </div>
    </div>
  );
}
