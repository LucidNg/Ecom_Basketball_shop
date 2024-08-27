export default function loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="flex justify-center items-center flex-row">
          <span className="loading loading-spinner loading-sm bg-neutral"></span>
          <span className=" pl-5 text-base-content font-semibold">Loading products...</span>
      </div>
    )
  }