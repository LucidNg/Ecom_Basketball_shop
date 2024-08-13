"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useCart } from "../appComoponent/CartContext";
import ProductCard from "../appComoponent/ProductCard";

export default function CheckoutPage() {
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [deliveryPrice, setDeliveryPrice] = useState(4);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  const { cart, selectCart, removeCheckedOutItems } = useCart();

  const handleCheckboxDeliChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDelivery(event.target.id);
    if (event.target.id === "standard") {
      setDeliveryPrice(4);
    } else if (event.target.id === "fast") {
      setDeliveryPrice(10);
    } else {
      // Handle other potential delivery options (optional)
    }
  };

  const handleCheckboxPayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPayment(event.target.id);
  };

  const getTotalPrice = useCallback((): number => {
    let total = 0;
    selectCart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }, [selectCart]);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [selectCart, getTotalPrice, cart]);

  return (
    <main>
      <div className="w-full p-10 flex flex-row">
        <div className="leftSide w-1/2 px-5 border-r-2 border-black">
          <div className="info">
            <h2 className="text-4xl font-bold text-base-content">Address</h2>
            <form className="p-10">
              <input
                className="bg-transparent border-b-2 border-base-content text-2xl text-base-content w-10/12 mb-4 pl-5 
                placeholder:text-base-content placeholder:text-opacity-30 focus:outline-none"
                placeholder="Full name"
              />
              <input
                className="bg-transparent border-b-2 border-base-content text-2xl text-base-content w-10/12 my-6 pl-5
                placeholder:text-base-content placeholder:text-opacity-30 focus:outline-none"
                placeholder="Phone's number"
              />
              <input
                className="bg-transparent border-b-2 border-base-content text-2xl text-base-content w-10/12 my-4 pl-5
                placeholder:text-base-content placeholder:text-opacity-30 focus:outline-none"
                placeholder="Address"
              />
            </form>
          </div>

          <h2 className="text-4xl font-bold text-base-content">Coupon</h2>
          <h2 className="text-lg font-extralight text-base-content py-5 pl-10">
            Sorry, coupon is not available right now.
          </h2>

          <h2 className="text-4xl font-bold text-base-content py-5">
            Delivery Options
          </h2>
          <div className="DevMethod py-5 pl-10">
            <div
              className={`items-center flex p-3 border-2 w-96 mb-5 ${
                selectedDelivery === "standard" ? "border-black" : ""
              }`}
            >
              <input
                type="checkbox"
                className="checkbox h-7 w-7 focus:fill-base-content stroke-2 stroke-black"
                name="standard"
                id="standard"
                checked={selectedDelivery === "standard"}
                onChange={handleCheckboxDeliChange}
              />
              <label
                htmlFor="standard"
                className="text-base-content text-xl px-5"
              >
                Standard delivery ($4)
              </label>
            </div>
            <div
              className={`items-center flex p-3 border-2 w-96 ${
                selectedDelivery === "fast" ? "border-black" : ""
              }`}
            >
              <input
                type="checkbox"
                className="checkbox h-7 w-7 focus:fill-base-content stroke-2 stroke-black"
                name="fast"
                id="fast"
                checked={selectedDelivery === "fast"}
                onChange={handleCheckboxDeliChange}
              />
              <label htmlFor="fast" className="text-base-content text-xl px-5">
                Fast delivery ($10)
              </label>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-base-content py-5">Payment</h2>
          <div className="PayMethod py-5 pl-10">
            <div
              className={`items-center flex p-3 border-2 w-96 mb-5 ${
                selectedPayment === "cod" ? "border-black" : ""
              }`}
            >
              <input
                type="checkbox"
                className="checkbox h-7 w-7 focus:fill-base-content stroke-2 stroke-black"
                name="cod"
                id="cod"
                checked={selectedPayment === "cod"}
                onChange={handleCheckboxPayChange}
              />
              <label htmlFor="cod" className="text-base-content text-xl px-5">
                COD (Cash on Delivery)
              </label>
            </div>
            <div
              className={`items-center flex p-3 border-2 w-96 ${
                selectedPayment === "paypal" ? "border-black" : ""
              }`}
            >
              <input
                type="checkbox"
                className="checkbox h-7 w-7 focus:fill-base-content stroke-2 stroke-black"
                name="paypal"
                id="paypal"
                checked={selectedPayment === "paypal"}
                onChange={handleCheckboxPayChange}
              />
              <label
                htmlFor="paypal"
                className="text-base-content text-xl px-5"
              >
                Paypal
              </label>
            </div>
          </div>
        </div>

        <div className="rightSide w-1/2 pl-20 flex flex-col">
          <h2 className="text-4xl font-bold text-base-content">Cart info</h2>
          <div
            className="flex flex-col gap-6 flex-grow overflow-auto"
            style={{ maxHeight: "45vh" }}
          >
            {selectCart.map((product, index) => (
              <div
                key={product.productID}
                className="flex flex-row items-center gap-20 px-16 py-6 bg-[#EBEBD5] h-full"
              >
                <ProductCard
                  key={product.productID}
                  product={product}
                  isEditable={false}
                />
              </div>
            ))}
          </div>

          <div className="itemsBox border-b-2 border-black py-10 w-[90%]"></div>

          <h3 className="text-3xl font-semibold text-base-content py-10 pl-5">
            Summary
          </h3>

          <div className="w-[90%] flex justify-between py-1">
            <h4 className="text-2xl text-base-content pl-20">Total price</h4>
            <h4 className="text-2xl text-base-content">
              ${Intl.NumberFormat("vi-VN").format(totalPrice)}
            </h4>
          </div>
          <div className="w-[90%] flex justify-between py-1">
            <h4 className="text-2xl text-base-content pl-20">Coupon</h4>
            <h4 className="text-2xl text-base-content">none</h4>
          </div>
          <div className="w-[90%] flex justify-between py-1">
            <h4 className="text-2xl text-base-content pl-20">Delivery price</h4>
            <h4 className="text-2xl text-base-content">${deliveryPrice}</h4>
          </div>
          <div className="w-[90%] flex justify-between py-1">
            <h4 className="text-2xl text-base-content pl-20 font-semibold">
              Total bill
            </h4>
            <h4 className="text-2xl text-base-content font-semibold">
              $
              {Intl.NumberFormat("vi-VN").format(
                totalPrice + deliveryPrice - couponPrice
              )}
            </h4>
          </div>

          <Link href="/checkout/success" className="self-center">
            <button
              className="btn font-semibold text-4xl h-20 w-96 self-center my-20 transition transition-duration-300 transition-property:scale,box-shadow,background-color hover:scale-105 hover:drop-shadow-xl hover:bg-secondary outline-none border-none"
              onClick={() => {
                //removeCheckedOutItems
              }}
            >
              Check out
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
