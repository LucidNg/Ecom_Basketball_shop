"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FetchAllOrders,
  Admin_Order,
  FetchOrderItemsByOrderID,
  Admin_OrderItem,
  UpdateOrderStatus,
} from "@/lib/admin";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Admin_Order[]>([]);
  const [orderItems, setOrderItems] = useState<Admin_OrderItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Admin_Order | null>(null);
  const [status, setStatus] = useState<string>("");
  const [originalStatus, setOriginalStatus] = useState<string>("");
  const [method, setMethod] = useState<string>("all");
  const [offset, setOffset] = useState<number>(0);
  const [hasMoreOrders, setHasMoreOrders] = useState<boolean>(true);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Define valid transitions
  const statusTransitions: Record<string, string[]> = {
    prepared: ["sent"],
    sent: ["processed"],
    processed: [], // No further status changes
    finished: [], // No further status changes
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await FetchAllOrders(method, offset);
        if (fetchedOrders.length < 1) {
          setHasMoreOrders(false);
        } else {
          setHasMoreOrders(true);
        }
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    loadOrders();
  }, [method, offset]);

  const openModal = async (order: Admin_Order) => {
    if (modalRef.current) {
      try {
        const items = await FetchOrderItemsByOrderID(order.orderID);
        setOrderItems(items);
        setSelectedOrder(order);
        setOriginalStatus(order.status);
        setStatus(order.status);
        modalRef.current.showModal();
      } catch (error) {
        console.error("Failed to load order items:", error);
      }
    }
  };

  const saveOrderStatus = async () => {
    if (selectedOrder) {
      try {
        const currentStatus = selectedOrder.status;
        // Check if the current status allows the desired status transition
        if (statusTransitions[currentStatus]?.includes(status)) {
          await UpdateOrderStatus(selectedOrder.orderID, status);
          // Refresh the page or reload orders after updating status
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.orderID === selectedOrder.orderID
                ? { ...order, status }
                : order
            )
          );
          modalRef.current?.close();
        } else {
          alert("Invalid status transition.");
        }
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    }
  };

  const nextPage = () => {
    if (hasMoreOrders) {
      setOffset(offset + 1);
    }
  };

  const prevPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  // Determine if status change is allowed
  const canChangeStatus = !["processed", "finished"].includes(selectedOrder?.status || "");

  const statusOptions = selectedOrder
    ? statusTransitions[selectedOrder.status].map((statusOption) => (
        <option key={statusOption} value={statusOption}>
          {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
        </option>
      ))
    : [];

  return (
    <div className="DisplayArea w-full h-screen flex flex-col">
      <h1 className="text-5xl text-base-content font-semibold mt-12 ml-20">Orders</h1>
      <div className="border-black w-full border-[0.5px] border-opacity-50 my-8"></div>
      <div className="mx-auto overflow-auto max-w-[65%] rounded-lg mt-4 shadow-xl shadow-indigo-300/40">
        <div className="tabBar w-full flex justify-start relative">
          {["all", "prepared", "sent", "processed", "finished"].map((tab) => (
            <button
              key={tab}
              className={`m-5 text-xl w-32 rounded-xl p-3 border-2 transition-all duration-300 ease-in-out transform
                ${method === tab ? "bg-base-content text-base-100" : "text-base-content"}
                hover:bg-base-content hover:text-base-100
                focus:bg-base-content focus:text-base-100
              `}
              onClick={() => {
                setMethod(tab);
                setOffset(0);
              }}
              style={{
                transform:
                  method === tab ? "translateX(0px)" : "translateX(-2px)",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {orders.length > 0 ? (
          <table className="w-auto min-w-[600px] mx-10 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-xl text-base-content text-opacity-50">
                <th className="tracking-wide text-left w-20 p-3">Order</th>
                <th className="tracking-wide text-left w-56 p-3">Customer</th>
                <th className="tracking-wide text-left w-40 p-3">Tracking</th>
                <th className="tracking-wide text-left w-28 p-3">Total</th>
                <th className="tracking-wide text-left w-28 p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderID} className="text-xl text-base-content font-medium">
                  <td className="p-2 min-w-72">#{order.orderID}</td>
                  <td className="p-2 capitalize">{order.fullName}</td>
                  <td className="p-2 min-w-32 capitalize">{order.status}</td>
                  <td className="p-2">${order.price.toFixed(2)}</td>
                  <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="pl-2 md:pl-10 pr-2">
                    <span
                      className="text-secondary-content hover:underline-offset-1 hover:underline cursor-pointer"
                      onClick={() => openModal(order)}
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-4xl font-semibold py-10 text-red-500">
            No orders found.
          </div>
        )}

        <div className="pagination flex justify-between p-4">
          <button
            className="btn w-32"
            onClick={prevPage}
            disabled={offset === 0}
          >
            Previous
          </button>
          <button
            className="btn w-32"
            onClick={nextPage}
            disabled={!hasMoreOrders}
          >
            Next
          </button>
        </div>
      </div>

      <dialog ref={modalRef} id="my_modal_5" className="modal sm:modal-middle">
        <div className="w-[90%] md:w-1/2 lg:w-[30%] bg-base-100">
          <div className="modelHeader bg-base-content h-14 flex items-center justify-between p-4">
            <span className="text-lg text-white">Order Details</span>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-white">✕</button>
            </form>
          </div>
          <div className="modalBody p-10 flex flex-col gap-y-2">
            {selectedOrder && (
              <>
                <span className="text-lg font-medium text-pretty text-base-content">
                  Customer name: {selectedOrder.fullName}
                </span>
                <span className="text-lg font-medium text-pretty text-base-content">
                  Address: {selectedOrder.shippingAddress}
                </span>
                <span className="text-lg font-medium text-pretty text-base-content">
                  Contact number: {selectedOrder.phoneNumber}
                </span>
                <span className="text-lg font-semibold text-pretty pt-4 text-base-content">Order items</span>
                {orderItems.length > 0 ? (
                  <ul className="">
                    {orderItems.map((item) => (
                      <li key={item.orderID} className="text-base-content">
                        {item.productName} (x{item.quantity}) - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-base-content">No items found.</span>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-medium text-base-content">Status</span>
                  <select
                    className="select select-bordered text-base-content text-lg font-semibold"
                    value={status}
                    onChange={handleStatusChange}
                    disabled={!canChangeStatus}
                  >
                    <option value="">Select status</option>
                    {statusOptions}
                  </select>
                </div>
                <button
                  className={`btn btn-primary mt-4 ${!canChangeStatus ? "btn-disabled" : ""}`}
                  onClick={saveOrderStatus}
                  disabled={!canChangeStatus}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
