import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Banner () {
    return (
      <div className="flex flex-col w-full">
        <div className="carousel w-full py-12">
          <div id="slide1" className="carousel-item relative w-full">
            <Image
              src="/mainBanner.svg"
              alt="mainBanner"
              layout="responsive"
              objectFit="cover"
              height={100}
              width={100}
              sizes="100vw"
            />
            <div className="absolute flex items-center justify-center top-1/2 inset-0">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:w-50 lg:h-20 lg:text-3xl  xl:w-72 xl:h-32 xl:text-5xl bg-neutral text-base-100 rounded-none outline-none border-none font-bold hover:bg-secondary hover:text-neutral">Buy now !</button>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <Image 
              src="/subBanner.svg" 
              alt="subBanner"
              width={100}
              height={100}
              className="w-full" 
            />
            <div className="absolute flex items-center justify-center top-1/2 inset-0">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:w-50 lg:h-20 lg:text-3xl  xl:w-72 xl:h-32 xl:text-5xl bg-neutral text-base-100 rounded-none outline-none border-none font-bold hover:bg-primary hover:text-accent">Order now!</button>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
        
        <div className="decorationImage w-full justify-between px-20 hidden lg:flex">
          <div>
            <Image
            width={800}
            height={600}
            src="/decorImg1.svg"
            alt="decorImage"
            className="pt-36 pr-5"/>
          </div>
          <div>
            <Image
            width={800}
            height={500}
            src="/decorImg2.svg"
            alt="decorImage"
            className="pl-5"/>
          </div>
        </div>
      </div>
    )
}