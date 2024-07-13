"use client";

import React, { useState } from "react";

const FilterBar = () => {
    const [sortBy, setSortBy] = useState("newest");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value);
    };

    const handleApplyFilter = () => {
        // Convert input strings to numbers (or leave as undefined if empty)
        const min = minPrice !== "" ? parseInt(minPrice) : undefined;
        const max = maxPrice !== "" ? parseInt(maxPrice) : undefined;

        // Check if min price is larger than max price
        if (min !== undefined && max !== undefined && min > max) {
            setError("Min price cannot be larger than max price");
            setMinPrice("");
            setMaxPrice("");
            console.error("Error: Min price cannot be larger than max price");
            return;
        }

        setError(null);
        console.log("Filtering with min:", min, "and max:", max);
        // Apply filtering logic based on min and max prices
    };

    const handleClearFilter = () => {
        setMinPrice("");
        setMaxPrice("");
        setError(null);
        console.log("Clearing filters");
    };

    return (
        <div className="filterBar w-[90%] bg-neutral h-20 mx-auto mb-32 flex items-center px-10 gap-10 justify-center">
            <span className="font-semibold text-2xl text-base-100">Filter by</span>

            <div
                className={`font-semibold text-2xl bg-base-100 text-base-content h-3/4 w-1/12 flex items-center justify-center cursor-pointer ${
                    sortBy === "newest" ? "bg-secondary" : "bg-base-100"
                }`}
                onClick={() => setSortBy("newest")}
            >
                Latest
            </div>

            <div
                className={`font-semibold text-2xl bg-base-100 text-base-content h-3/4 w-1/12 flex items-center justify-center cursor-pointer ${
                    sortBy === "bestselling" ? "bg-secondary" : "bg-base-100"
                }`}
                onClick={() => setSortBy("bestselling")}
            >
                Bestselling
            </div>

            <div
                className={`font-semibold text-2xl bg-base-100 text-base-content h-3/4 w-1/12 flex items-center justify-center cursor-pointer ${
                    sortBy === "price-high-to-low" ? "bg-secondary" : "bg-base-100"
                }`}
                onClick={() => setSortBy("price-high-to-low")}
            >
                High to low
            </div>

            <div
                className={`font-semibold text-2xl bg-base-100 text-base-content h-3/4 w-1/12 flex items-center justify-center cursor-pointer ${
                    sortBy === "price-low-to-high" ? "bg-secondary" : "bg-base-100"
                }`}
                onClick={() => setSortBy("price-low-to-high")}
            >
                Low to high
            </div>

            <div className="flex items-center space-x-4 justify-between w-1/2">
                <span className="font-semibold text-2xl text-base-100">From:</span>
                <input
                    type="text"
                    placeholder="from"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-28 h-14 px-3 bg-base-100 outline-none text-xl text-base-content font-semibold"
                />
                <span className="font-semibold text-2xl text-base-100">to</span>
                <input
                    type="text"
                    placeholder="to"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-28 h-14 px-3 bg-base-100 outline-none text-xl text-base-content font-semibold"
                />
                <button
                    onClick={handleApplyFilter}
                    className="px-4 py-2 w-36 h-14 bg-green-500 shadow-md hover:bg-green-600 text-xl text-base-100 font-semibold"
                >
                    Apply
                </button>
                <button
                    onClick={handleClearFilter}
                    className="px-4 py-2 w-36 h-14 bg-red-500 shadow-md hover:bg-accent text-xl text-base-100 font-semibold"
                >
                    Cancel
                </button>
            </div>

            {error && <div className="text-red-500 text-xl mt-2">{error}</div>}
        </div>
    );
};

export default FilterBar;
