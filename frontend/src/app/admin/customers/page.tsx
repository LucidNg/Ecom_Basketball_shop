"use client";
import React, { useState, useEffect, useRef } from "react";
import { FetchAllUsers, Admin_User } from "@/lib/admin";

export default function AdminOrderPage() {
    const [customers, setCustomers] = useState<Admin_User[]>([]);
    const [offset, setOffset] = useState<number>(0); 
    const [hasMoreCustomer, setHasMoreCustomers] = useState<boolean>(true);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const FetchCustomers = await FetchAllUsers(offset);
                if (FetchCustomers.length > 0) {
                    setHasMoreCustomers(true); 
                } else {
                    setHasMoreCustomers(false);
                }
                setCustomers(FetchCustomers);
            } catch (error) {
                console.error("Failed to load orders:", error);
            } 
        };
        console.log(hasMoreCustomer);
        loadOrders();
    }, [offset]);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const nextPage = () => {
        if (hasMoreCustomer) {
            setOffset(offset + 1);
        }
    };

    const prevPage = () => {
        if (offset > 0) {
            setOffset(offset - 1);
        }
    };

    return (
        <div className="DisplayArea w-full flex flex-col mb-10">
            <h1 className="text-5xl text-base-content font-semibold mt-12 ml-20">Customers</h1>
            <div className="border-black w-full border-[0.5px] border-opacity-50 my-8"></div>
            <div className="mx-auto overflow-auto w-1/2 md:w-[90%] lg:w-[70%] px-10 rounded-lg mt-10 shadow-xl shadow-indigo-300/40">
                {customers.length > 0 ? (
                    <table className="w-full min-w-[90%]] mx-10 border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-xl text-base-content text-opacity-50">
                                <th className="tracking-wide text-left w-1/6 p-3">Fullname</th>
                                <th className="tracking-wide text-left w-1/6 p-3">Email</th>
                                <th className="tracking-wide text-left w-1/6 p-3">Date of birth</th>
                                <th className="tracking-wide text-left w-1/6 p-3">Contact number</th>
                                <th className="tracking-wide text-left w-1/6 p-3">Member since</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customers) => (
                                <tr key={customers.fullName} className="text-xl text-base-content font-medium">
                                    <td className="p-2 min-w-20">#{customers.fullName}</td>
                                    <td className="p-2 min-w-12">{customers.email}</td>
                                    <td className="p-2 min-w-10">{customers.dob}</td>
                                    <td className="p-2 min-w-12">{customers.phoneNumber}</td>
                                    <td className="p-2 min-w-10">${customers.memberSince}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center text-xl text-base-content py-10">
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
                        disabled={!hasMoreCustomer}
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
                        <span className="text-lg font-medium text-pretty text-base-content">Customer name : ...</span>
                        <span className="text-lg font-medium text-pretty text-base-content">Address : ...</span>
                        <span className="text-lg font-medium text-pretty text-base-content">Contact number : ...</span>
                        <span className="text-lg font-semibold text-pretty py-4 text-base-content">Order items</span>

                        <button className="btn w-1/4 self-center bg-secondary-content text-base-100 text-xl hover:bg-secondary-content hover:bg-opacity-75">Save</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
