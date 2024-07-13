'use client';

export default function Home({
    children1, children2, children3
  }: {
    children1: React.ReactNode,
    children2: React.ReactNode
    children3: React.ReactNode
  }) {
    return (
      <div className="lg:px-16 lg:pt-10 bg-base-100">
          <div className="py-10 text-center lg:text-left">
            <span className="text-accent font-bold text-3xl sm:text-4xl">Sản phẩm bán chạy</span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div id="most-liked" className="w-[90%] overflow-x-auto">
              <div className="flex gap-10 min-w-max">
                {children1}
              </div>
            </div>
          </div>

          <div className="py-10 text-center lg:text-left">
            <span className="text-accent font-bold text-3xl sm:text-4xl">Giày mới</span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div id="most-liked" className="w-[90%] overflow-x-auto">
              <div className="flex gap-10 min-w-max">
                {children1}
              </div>
            </div>
          </div>

          <div className="py-10 text-center lg:text-left">
            <span className="text-accent font-bold text-3xl sm:text-4xl">Quần áo mới<i></i></span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div id="most-liked" className="w-[90%] overflow-x-auto">
              <div className="flex gap-10 min-w-max">
                {children1}
              </div>
            </div>
          </div>
      </div>
    );
  }
  
  