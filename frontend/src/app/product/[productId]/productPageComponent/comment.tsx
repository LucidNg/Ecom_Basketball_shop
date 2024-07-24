
import React from "react";

export default function Comment() {
    return (
        <div className='w-[90%] h-auto border-b-2 border-base-content text-base-content flex pb-5 pt-5 mx-auto'>
            <div className="commentInfo flex flex-col items-center">
                <span className="UserName text-3xl font-semibold">Felix</span>
                <span className="DateComment">26/07/2024</span>
            </div>

            <div className="flex flex-col mx-7 justify-between">
                <span>X stars</span>
                <span className="commentContent text-xl">This shirt is rock ! Must buy</span>
            </div>
        </div>
    );
}
