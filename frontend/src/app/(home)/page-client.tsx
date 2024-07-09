'use-client'

export default function Home({
    children1
  }: {
    children1: React.ReactNode,
  }) {
    return (
      <div className="px-10 py-5 bg-base-100">
        <div>
          <div className="pb-4">
            <span className="text-primary font-bold text-2xl">Most liked</span>
          </div>
          <div className="flex flex-row w-full align-middle justify-between items-center">
            <div id="most-liked" className="w-[90%] flex flex-row gap-10 overflow-x-scroll scroll-smooth p-2">
              {children1}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  