"use client";
import React, { useState } from "react";
import Comment from "./comment";

export default function CommentBox() {
    const [showAll, setShowAll] = useState(false);
    const comments = [1];

    const displayedComments = showAll ? comments : comments.slice(0, 3);

    return (
        <div className='w-11/12 border-2 border-base-content p-5 gap-y-3 flex flex-col justify-start max-h-96 overflow-y-auto'>
            <div className='flex flex-col'>
                {displayedComments.map((comment, index) => (
                    <Comment key={index} />
                ))}
            </div>
            {comments.length > 3 && (
                <button 
                    onClick={() => setShowAll(!showAll)} 
                    className='mt-3 text-base-content hover:underline mx-auto'
                >
                    {showAll ? 'View Less' : 'View More'}
                </button>
            )}
        </div>
    );
}
