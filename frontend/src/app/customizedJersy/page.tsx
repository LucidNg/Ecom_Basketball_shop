import React from 'react';
import Image from 'next/image';

const CustomizeJerseyPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-10">

      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-accent">Store Policy on order customized jersey</h2>
        <p className="text-gray-700">
          Welcome to our store! Before ordering your customized jersey, please
          take a moment to read our store policy. All custom jerseys are made to
          order and cannot be returned or exchanged unless there is a
          manufacturing defect. Prices varies on your requirements. Please ensure that all details provided are
          accurate to avoid any issues with your order.
        </p>
      </section>


      <section className="space-y-6">
        <h2 className="text-4xl font-bold mb-4 text-secondary-content">Jersey References</h2>
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">

          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
            <a href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
              <Image
                src={`/customizedJersey/c1.svg`}
                alt="c1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
              </h3>
            </a>
          </div>

          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
            <a href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
              <Image
                src={`/customizedJersey/c2.svg`}
                alt="c2"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
              </h3>
            </a>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
              <a href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                <Image
                  src={`/customizedJersey/c3.svg`}
                  alt="c3"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%' }}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                </h3>
              </a>
              <a href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                <Image
                  src={`/customizedJersey/c4.svg`}
                  alt="c4"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%' }}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                </h3>
              </a>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
            <a href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
              <Image
                src={`/customizedJersey/c5.svg`}
                alt="c5"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
              </h3>
            </a>
          </div>
        </div>
      </div>
  
      </section>

   
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-secondary-content">Available Sizes</h2>
        <table className="w-full text-left border-collapse text-base-content">
          <thead>
            <tr>
              <th className="border-b p-2 font-semibold">Size</th>
              <th className="border-b p-2 font-semibold">Chest (inches)</th>
              <th className="border-b p-2 font-semibold">Length (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b p-2">Small</td>
              <td className="border-b p-2">34-36</td>
              <td className="border-b p-2">27</td>
            </tr>
            <tr>
              <td className="border-b p-2">Medium</td>
              <td className="border-b p-2">38-40</td>
              <td className="border-b p-2">28</td>
            </tr>
            <tr>
              <td className="border-b p-2">Large</td>
              <td className="border-b p-2">42-44</td>
              <td className="border-b p-2">29</td>
            </tr>
            <tr>
              <td className="border-b p-2">X-Large</td>
              <td className="border-b p-2">46-48</td>
              <td className="border-b p-2">30</td>
            </tr>
            <tr>
              <td className="border-b p-2">XX-Large</td>
              <td className="border-b p-2">50-52</td>
              <td className="border-b p-2">31</td>
            </tr>
          </tbody>
        </table>
      </section>


      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-secondary-content">How to Order</h2>
        <p className="text-gray-700 mb-4">
          To order your customized jersey, please send us an email with the
          following information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Your full name</li>
          <li>The size you want (refer to the table above)</li>
          <li>
            Attach any images or PDF files that you want to include in your
            design
          </li>
          <li>A summary of the amount or detailed requirement about the product</li>
        </ul>
        <p className="text-gray-700">
          Please use the following email subject: <br />
          <span className="font-semibold">
            [Your Name] - Customized Jersey Order
          </span>
        </p>
        <p className='my-4'> 
            <span className='text-base-content'>Our contact information :</span>
            <span className='text-base-content font-semibold px-3'>boroShopCustomized@gmail.com</span> 
        </p>
      </section>
    </div>
  );
};

export default CustomizeJerseyPage;
