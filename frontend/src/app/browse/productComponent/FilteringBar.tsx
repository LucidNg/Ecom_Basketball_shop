"use client"; 

import React, { useState } from "react";

const FilterBar = () => {
    const [sortBy, setSortBy] = useState("newest");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        // Add sorting logic based on sortBy value
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
        // Apply filtering logic based on min and max prices
        // Example: Call an API with filtering parameters or filter a list of products
        console.log("Filtering with min:", min, "and max:", max);
      };

      const handleClearFilter = () => {
        setMinPrice("");
        setMaxPrice("");
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
        Lates
      </div>

      <div
        className={`font-semibold text-2xl bg-base-100 text-base-content h-3/4 w-1/12 flex items-center justify-center cursor-pointer ${
          sortBy === "bestselling" ? "bg-secondary" : "bg-base-100"
        }`}
        onClick={() => setSortBy("bestselling")}
      >
        Feature
      </div>

      <select
        value={sortBy}
        onChange={handleSortChange}
        className="select select-bordered w-1/12 h-3/4 font-semibold text-2xl text-base-content rounded-none"
      >
        <option value="none">none</option>
        <option value="price-high-to-low">High to low</option>
        <option value="price-low-to-high">Low to high</option>
      </select>

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
    </div>
  );
};

export default FilterBar;
