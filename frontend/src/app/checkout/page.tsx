"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useCart } from "../appComoponent/CartContext";
import { useOrders } from "../appComoponent/OrdersContext";
import {
  convertOrderItemToOrderItemRequest,
  convertOrderToOrderRequest,
  convertOrderToShippingRequest,
  PaymentStatus,
  removeCartItemsFromOrder,
  ShippingStatus,
  updateStock,
  CreateOrder,
  CreateOrderItems,
  CreateShipping,
  Order,
  getNewOrderID,
} from "@/lib/order";
import ProductCard from "../appComoponent/ProductCard";
import { convertCartItemToOrderItem, OrderItem } from "@/lib/productItem";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/decrypt";

export default function CheckoutPage() {
  const router = useRouter(); // Use useRouter hook
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [deliveryPrice, setDeliveryPrice] = useState(4);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { cart, selectCart, removeCheckedOutItems } = useCart();
  const { orders, getOrder, addOrder } = useOrders();
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

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

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

  const handleCheckoutClick = async () => {
    if (!tokenAvailable) return; // Only proceed if token is available

    const token = localStorage.getItem("jwt");
    if (token) {
      const decrypted = decryptToken(token);
      const payload = JSON.parse(atob(decrypted.split(".")[1]));
      const userID = payload.userID;

      let newOrder: Order = {
        orderID: "",
        userID: userID, // Replace with the actual user ID
        orderDate: getToday(),
        shipDate:
          selectedDelivery === "Standard" ? getNext5Days() : getNext2Days(),
        paymentMethod: selectedPayment,
        paymentStatus:
          selectedPayment === "cod" ? PaymentStatus.Unpaid : PaymentStatus.Paid,
        shippingMethod: selectedDelivery,
        shippingStatus: ShippingStatus.Pending,
        shippingAddress: address,
        billingAddress: "123 Main St, City A, Country X",
        coupon: "None",
        totalBill: totalPrice,
        quantity: selectCart.length,
        orderItems: [],
      };

      /* New order details handling - DB */
      // convert Order to OrderRequest to fit the database
      const newOrderRequest = convertOrderToOrderRequest(newOrder);
      // create and add the new orderdetails to DB (return the new order ID)
      //const newOrderID = await CreateOrder(newOrderRequest);
      const newOrderID = getNewOrderID();
      // const newOrderID = "cee3fcbe-0d91-40be-ba60-110a5b532167";

      // set the new order id for variable newOrder
      newOrder.orderID = newOrderID;

      /* New shipping details handling - DB */
      // convert order to shipping request to fit the database
      const newShippingRequest = convertOrderToShippingRequest(
        newOrder,
        deliveryPrice
      );
      // create and add the new shipping request in database
      //CreateShipping(newShippingRequest);

      /* New order items handling - DB */
      // convert from selected cart items to order items
      const newOrderItems: OrderItem[] = selectCart.map((selectedItem) => {
        return convertCartItemToOrderItem(selectedItem, newOrderID);
      });
      // set the new order items for variable newOrder
      newOrder.orderItems = newOrderItems;
      // convert from order items to order item requests
      const newOrderItemRequests = newOrderItems.map((item) => {
        return convertOrderItemToOrderItemRequest(item);
      });
      // create and add the new order items to DB
      //CreateOrderItems(newOrderItemRequests);

      /* Contexts handling */
      console.log(orders);
      addOrder(newOrder); // add the new order to order context
      removeCheckedOutItems(); // remove the items in cart context
      console.log(orders);

      /* Other handling in DB */
      // await removeCartItemsFromOrder({
      //   orderID: newOrderID,
      //   items: newOrderItemRequests,
      // }); // remove the items in cart table in database
      await updateStock({
        orderID: newOrderID,
        items: newOrderItemRequests,
      }); // update products stock in DB

      // Redirect to the success page with the new order ID
      router.push(`/checkout/success/${newOrderID}`);
    }
  };
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
                onChange={handleFullNameChange}
              />
              <input
                className="bg-transparent border-b-2 border-base-content text-2xl text-base-content w-10/12 my-6 pl-5
                placeholder:text-base-content placeholder:text-opacity-30 focus:outline-none"
                placeholder="Phone's number"
                onChange={handlePhoneNumberChange}
              />
              <input
                className="bg-transparent border-b-2 border-base-content text-2xl text-base-content w-10/12 my-4 pl-5
                placeholder:text-base-content placeholder:text-opacity-30 focus:outline-none"
                placeholder="Address"
                onChange={handleAddressChange}
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
                disabled={true}
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
            className="flex flex-col gap-6 flex-grow overflow-auto py-10"
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

          <div className="itemsBox border-b-2 border-black py-5 w-[90%]"></div>

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

          <button
            className="btn font-semibold text-4xl h-20 w-96 self-center my-20 transition transition-duration-300 transition-property:scale,box-shadow,background-color hover:scale-105 hover:drop-shadow-xl hover:bg-secondary outline-none border-none"
            onClick={handleCheckoutClick}
          >
            Check out
          </button>
        </div>
      </div>
    </main>
  );
}

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed in JavaScript
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDateDMY = `${day}-${month}-${year}`;

  return formattedDateDMY;
}

function getNext5Days() {
  const today = new Date();
  const fiveDaysLater = new Date(today);

  // Add 5 days to the current date
  fiveDaysLater.setDate(today.getDate() + 5);

  // Format date as 'DD-MM-YYYY'
  const year = fiveDaysLater.getFullYear();
  const month = String(fiveDaysLater.getMonth() + 1).padStart(2, "0");
  const day = String(fiveDaysLater.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

function getNext2Days() {
  const today = new Date();
  const twoDaysLater = new Date(today);

  // Add 2 days to the current date
  twoDaysLater.setDate(today.getDate() + 2);

  // Format date as 'DD-MM-YYYY'
  const year = twoDaysLater.getFullYear();
  const month = String(twoDaysLater.getMonth() + 1).padStart(2, "0");
  const day = String(twoDaysLater.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}
