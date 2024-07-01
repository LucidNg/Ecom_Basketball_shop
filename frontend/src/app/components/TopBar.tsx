import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Search} from "@geist-ui/icons"
import {ShoppingCart} from "@geist-ui/icons"


export default function TopBar(){
    return(
        <div className="TopBar h-[130px] bg-primary flex items-center w-screen">
            <div className="flex items-center justify-start min-w-10 px-5 lg:px-12 2xl:px-24">
                <Image className="min-w-5 inline md:hidden lg:inline " src={`/logo.svg`} alt="Boro logo" width={36} height={36} />
                <div className="text-base-content font-bold hidden whitespace-nowrap 2xl:inline 2xl:text-5xl lg:pl-7 md:inline md:text-3xl md:font-extrabold">
                    <span>BoRo Shop</span>
                </div>
            </div>
            
            <div className="w-full h-[70px] items-center flex-1">
                <label className="input input-bordered flex items-center gap-2 h-[70px] border-none">
                <input type="text" className="w-full text-base-content text-2xl font-semibold min-w-24 placeholder:text-opacity-25 placeholder:text-base-content" placeholder="Search" />
                <Search color="black" size={40}/>
                </label>
            </div>

            {/* <div className="afterLogined flex items-center">                
                <div className="flex text-base-content px-3 sm:px-5 2xl:px-10 userInfo">
                    <span className="whitespace-nowrap hidden 2xl:inline 2xl:text-4xl">Xin chào, Văn A</span>
                </div>

                <button className="Cart justify-end bg-neutral h-[70px] flex items-center rounded-lg mr-5 sm:mr-10">
                    <div className="px-3 flex">
                        <ShoppingCart color="black" size={40}/>
                        <span className="text-base-content hidden sm:text-4xl sm:inline px-4">2</span>
                    </div>
                </button>
            </div> */}

            <div className="beforeLogined flex items-center pl-5 pr-12 xl:pr-20">                
                <button className="h-[70px] text-xl font-semibold text-base-content hover:text-accent lg:w-44 xl:text-2xl xl:w-52">
                    <Link href="/">Đăng nhập</Link>
                </button>
                <button className="h-[70px] font-semibold text-accent-content bg-accent hover:bg-red-500 hidden lg:inline lg:text-xl lg:w-44 xl:text-2xl xl:w-52">
                    <Link href="/">Đăng ký</Link>
                </button>
            </div>

        </div>
    )
}