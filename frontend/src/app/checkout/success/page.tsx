import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-28">
      <video
        width="400"
        height="400"
        autoPlay
        loop
        muted
        className="mb-4"
      >
        <source src="/video/checkoutAnimation.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <h1 className="text-5xl font-bold mt-4 text-base-content">Checkout Successful</h1>
      <p className="text-lg mt-2 text-base-content">Thank you for your purchase! Your order has been successfully processed.</p>
      <div className='btnGroup grid-cols-2 gap-28 flex pt-10'>

        <Link href="/">
            <button className='btn w-56 h-16 text-2xl font-semibold text-neutral hover:bg-secondary outline-none border-none'>
                Shop more 
            </button>
        </Link>
        <button className='btn w-56 h-16 text-2xl font-semibold text-neutral hover:bg-secondary outline-none border-none'>
            Order&#39;s detail 
        </button>
      </div>
    </div>
  );
}
