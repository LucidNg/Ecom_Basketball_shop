"use client";

import React from "react";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import {Search} from "@geist-ui/icons"
import {ShoppingCart} from "@geist-ui/icons"


export default function TopBar(){
    return(
        <div className="TopBar h-24 bg-primary flex flex-row items-center">
            <Link href="/">
                <div className="flex items-center justify-start min-w-10 px-5 lg:px-12 2xl:px-24">
                        <Image className="min-w-5 inline md:hidden lg:inline" src={`/logo.svg`} alt="Boro logo" width={30} height={30} />
                        <div className="text-base-content font-bold hidden whitespace-nowrap 2xl:inline 2xl:text-4xl lg:pl-7 md:inline md:text-3xl md:font-extrabold">
                            <span>BoRo Shop</span>
                        </div>
                </div>
            </Link>
            <div className="h-[40px] sm:h-[50px] items-center flex-1 w-3/5 SearchBar">
                <label className="input input-bordered flex items-center gap-2 h-[40px] sm:h-[50px] border-none">
                <input type="text" className="w-full text-base-content text-2xl font-semibold min-w-24 placeholder:text-opacity-25 placeholder:text-base-content" placeholder="Search" />
                <Search color="black" className="h-5 w-5 sm:h-10 sm:w-10"/>
                </label>
            </div>

            <div className="afterLogined flex items-center">                
                <div className="text-base-content px-3 sm:px-5 2xl:px-10 userInfo hidden 2xl:inline 2xl:text-2xl">
                    <span className="whitespace-nowrap ">Xin chào, Văn A</span>
                </div>

                <div className="avatar 2xl:hidden px-5">
                    <div className="w-8 sm:w-12 rounded-full bg-secondary">
                        <Image src="" alt="user" />
                    </div>
                </div>

                <button className="Cart justify-end bg-base-100 h-[40px] sm:h-[50px] flex items-center rounded-lg mr-5 sm:mr-10">
                    <div className="px-3 flex">
                        <ShoppingCart color="black" className="h-5 w-5 sm:h-8 sm:w-8"/>
                        <span className="text-base-content hidden sm:text-2xl sm:inline px-4">2</span>
                    </div>
                </button>
            </div>

            {/* <div className="beforeLogined flex items-center pl-5 pr-8 xl:pr-20">                
                <button className="h-[50px] text-xl font-semibold text-base-content hover:text-accent lg:w-44 xl:text-xl xl:w-40">
                    <Link href="/">Đăng nhập</Link>
                </button>
                <button className="h-[50px] font-semibold text-accent-content bg-accent hover:bg-red-500 hidden lg:inline lg:text-xl lg:w-44 xl:w-40">
                    <Link href="/">Đăng ký</Link>
                </button>
            </div> */}

        </div>
    )
}