"use client";
import React, { useState, useEffect } from "react";
import { FetchStats, Admin_StatResponse } from "@/lib/admin";

export default function AdminStatsPage() {
    const [stats, setStats] = useState<Admin_StatResponse | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const statsData = await FetchStats();
                setStats(statsData);
            } catch (error) {
                console.error("Failed to load stats:", error);
            }
        };

        loadStats();
    }, []);

    if (!stats) {
        return (
            <div className="text-base-content font-semibold text-lg p-10">
                Loading...
            </div>
        );
    }

    const discountPercentage = 0.20;
    const discountedTotalMoney = stats.totalMoney * (1 - discountPercentage);

    return (
        <div className="DisplayArea w-full flex flex-col">
            <h1 className="text-5xl text-base-content font-semibold mt-12 ml-20">
                Statistics
            </h1>
            <div className="border-black w-full border-[0.5px] border-opacity-50 my-8 mb-32"></div>
            <div className="grid grid-cols-4 gap-6 w-[60%] mx-auto">
                <div className="bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <span className="text-base-content text-xl font-semibold">
                        Total Revenue
                    </span>
                    <span className="text-end text-5xl mt-5 text-green-500 font-bold">
                        ${discountedTotalMoney.toFixed(2)}
                    </span>
                </div>
                <div className="bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <span className="text-base-content text-xl font-semibold">
                        Total Customer
                    </span>
                    <span className="text-end text-5xl mt-5 mr-10 text-gray-700 font-bold">
                        {stats.totalCustomer}
                    </span>
                </div>
                <div className="bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <span className="text-base-content text-xl font-semibold">
                        Total Product
                    </span>
                    <span className="text-end text-5xl mt-5 mr-10 text-gray-700 font-bold">
                        {stats.totalProduct}
                    </span>
                </div>
                <div className="bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <span className="text-base-content text-xl font-semibold">
                        Total Order
                    </span>
                    <span className="text-end text-5xl mt-5 mr-10 text-gray-700 font-bold">
                        {stats.totalOrder}
                    </span>
                </div>
                <div className="col-span-2 row-span-2 bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <div className="text-base-content text-xl font-semibold">
                        Top Sale Product
                    </div>
                    <div className="text-end text-2xl mt-5 mr-10 text-gray-700 font-bold flex flex-col">
                        <div className="flex justify-around">
                            <span className="text-5xl text-green-600">${stats.topProduct?.totalPrice ?? 'N/A'}</span>
                            <div className="flex justify-end flex-col">
                                <span>{stats.topProduct?.productName ?? 'N/A'}</span>
                                <div className="flex">
                                    <span>{stats.topProduct?.totalQuantity ?? 'N/A'}</span>
                                    <span className="text-lg text-gray-400 mx-2">sales</span>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                <div className="bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <span className="text-base-content text-xl font-semibold">
                    Finished Order
                    </span>
                    <span className="text-end text-5xl mt-5 mr-10 text-green-600 font-bold">
                        {stats.finishedOrder}
                    </span>
                </div>
                <div className="bg-gray-200/40 rounded-lg h-36 min-w-56 flex flex-col p-5 shadow-lg">
                    <span className="text-base-content text-xl font-semibold">
                    In-progress Order
                    </span>
                    <span className="text-end text-5xl mt-5 mr-10 text-red-700 font-bold">
                        {stats.unfinishedOrder}
                    </span>
                </div>
            </div>
        </div>
    );
}
