import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Card () {
    return (
        <div className="bg-primary flex flex-col h-[400px] w-72">
            <Image src="" alt="Card" width={150} height={150} className="p-5 min-w-72" />
            <span className="text-base-content font-semibold w-72 px-5 text-lg">Air Jordan 4 Retro {"Military Blue"}</span>

            <div className="flex flex-row items-center justify-between w-72 px-5 mb-5">
                <span className="text-base-content text-lg">đ 4.956.000</span>
                <button className="btn bg-secondary rounded-none text-neutral font-semibold text-xl min-w-32">Xem</button>
            </div>
        </div>
    )
}