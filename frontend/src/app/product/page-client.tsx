'use-client'

import FilterBar from "./productComponent/FilteringBar"

export default function ProductPage({
    children1
  }: {
    children1: React.ReactNode,
  }) {
    return (
      <div className="lg:pt-10 bg-base-100">
        <div className="lg:px-16 py-10 text-center lg:text-left">
            <span className="text-accent font-bold text-3xl sm:text-4xl">Tên sản phẩm</span>
        </div>
        <FilterBar/>
        <div className="flex justify-center lg:px-16">
            <div id="most-liked" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-2">
                {children1}
            </div>
        </div>
      </div>
    );
  }
  
  