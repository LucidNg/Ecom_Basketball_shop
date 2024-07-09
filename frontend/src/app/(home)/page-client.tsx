'use-client'

export default function Home({
    children1
  }: {
    children1: React.ReactNode,
  }) {
    return (
      <div className="px-16 py-10 bg-base-100">
        <div>
          <div className="pb-4">
            <span className="text-accent font-bold text-4xl">Sản phẩm bán chạy</span>
          </div>
          <div className="flex flex-row w-full align-middle justify-between items-center">
            <div id="most-liked" className="w-[90%] flex flex-row gap-10 p-2">
              {children1}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  