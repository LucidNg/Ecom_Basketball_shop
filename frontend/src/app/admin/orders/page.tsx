import React from "react";

export default function AdminOrderPage() {
    return (
        <div className="DisplayArea w-full flex flex-col">
            <h1 className="text-5xl text-base-content font-semibold mt-32 ml-20">Orders</h1>
            <div className="border-black w-full border-[0.5px] border-opacity-50 my-8"></div>
            <div className=" mx-auto overflow-auto shadow-lg w-[80%] rounded-lg mt-10 ">
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
                            <td className="p-2">On preparing</td>
                            <td className="p-2">$30.56</td>
                            <td className="p-2">25/08/2024</td>
                            <td className="pl-2 md:pl-10 pr-2">
                                <span className="text-secondary-content hover:underline-offset-1 hover:underline">View</span>
                            </td>
                        </tr>
                    </tbody>    
                </table>
            </div>
        </div>
    );
}
