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
            <span className="text-accent font-bold text-3xl sm:text-4xl">Feature products</span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div className="w-[90%] overflow-x-auto">
              <div className="flex gap-10 min-w-max">
                {children1}
              </div>
            </div>
          </div>

          <div className="py-10 text-center lg:text-left">
            <span className="text-accent font-bold text-3xl sm:text-4xl">Latest shoes</span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div className="w-[90%] overflow-x-auto">
              <div className="flex gap-10 min-w-max">
                {children2}
              </div>
            </div>
          </div>

          <div className="py-10 text-center lg:text-left">
            <span className="text-accent font-bold text-3xl sm:text-4xl">Latest clothes</span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div className="w-[90%] overflow-x-auto">
              <div className="flex gap-10 min-w-max">
                {children3}
              </div>
            </div>
          </div>
      </div>
    );
  }
  
  