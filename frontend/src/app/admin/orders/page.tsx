"use client"
import React, {useRef} from "react";

export default function AdminOrderPage() {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <div className="DisplayArea w-full flex flex-col">
            <h1 className="text-5xl text-base-content font-semibold mt-32 ml-20">Orders</h1>
            <div className="border-black w-full border-[0.5px] border-opacity-50 my-8"></div>
            <div className=" mx-auto overflow-auto w-[80%] rounded-lg mt-10 shadow-xl shadow-indigo-300/40">
                <table className="w-ful min-w-[600px] mx-auto border-separate border-spacing-y-5">
                    <thead className="">
                        <tr className="text-xl text-base-content text-opacity-50">
                            <th className="tracking-wide text-left w-40 p-3">Order</th>
                            <th className="tracking-wide text-left w-56 p-3">Customer</th>
                            <th className="tracking-wide text-left w-32 p-3">Type</th>
                            <th className="tracking-wide text-left w-28 p-3">Status</th>
                            <th className="tracking-wide text-left w-96 p-3">Tracking</th>
                            <th className="tracking-wide text-left w-28 p-3">Total</th>
                            <th className="tracking-wide text-left w-28 p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="text-xl text-base-content font-medium">
                            <td className="p-2">#101310</td>
                            <td className="p-2">Nguyen Loc An</td>
                            <td className="p-2">Standard</td>
                            <td className="text-red-500 p-2">Unpaid</td>
                            <td className="p-2 min-w-48">On preparing</td>
                            <td className="p-2">$30.56</td>
                            <td className="p-2">25/08/2024</td>
                            <td className="pl-2 md:pl-10 pr-2">
                                <span 
                                    className="text-secondary-content hover:underline-offset-1 hover:underline cursor-pointer" 
                                    onClick={openModal}
                                >
                                    View
                                </span>
                            </td>
                        </tr>
                    </tbody>    
                </table>
            </div>

            <dialog ref={modalRef} id="my_modal_5" className="modal sm:modal-middle">
                <div className="w-[90%] md:w-1/2 lg:w-[30%] bg-base-100">
                    <div className="modelHeader bg-base-content h-14 flex items-center justify-between p-4">
                        <span className="text-lg text-white">#101310</span>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost text-white">✕</button>
                        </form>
                    </div>
                    <div className="modalBody p-10 flex flex-col gap-y-2">
                        <span className="text-lg font-medium text-pretty text-base-content">Customer name : Nguyen Loc An</span>
                        <span className="text-lg font-medium text-pretty text-base-content">Address : 227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</span>
                        <span className="text-lg font-medium text-pretty text-base-content">Contact number : 09XXXXXXXX</span>
                        <span className="text-lg font-semibold text-pretty py-4 text-base-content">Order items</span>

                        <button className="btn w-1/4 self-center bg-secondary-content text-base-100 text-xl hover:bg-secondary-content hover:bg-opacity-75">Save</button>
                    </div>
                </div>
            </dialog>

        </div>
    );
}
