"use client";
import React, { useState } from "react";
import Comment from "./comment";

export default function CommentBox() {
    return (
        <div className='w-11/12 border-2 border-base-content p-5 gap-y-3 flex flex-col justify-start max-h-96 overflow-y-auto'>
            <div className='flex flex-col'>
                    <Comment/>
            </div>
        </div>
    );
}
