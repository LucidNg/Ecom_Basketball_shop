import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Review, FetchReviewsByProductID } from "@/lib/review";

export default function Comment() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (productId) {
      FetchReviewsByProductID(productId.toString())
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [productId]);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error loading reviews: {error}</p>;
  }

  return (
    <div className="w-[90%] mx-auto flex-col justify-center">
      {displayedReviews.map((review, index) => (
        <div
          key={index}
          className="w-full h-auto border-b-2 border-base-content text-base-content flex pb-5 pt-5 mx-auto"
        >
          <div className="commentInfo flex flex-col items-center">
            <span className="UserName text-3xl font-semibold">User</span>
            <span className="DateComment">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-col mx-7 justify-between">
            <span>{review.rating} stars</span>
            <span className="commentContent text-xl">{review.comment}</span>
          </div>
        </div>
      ))}
      {reviews.length > 3 && (
                <button 
                    onClick={() => setShowAll(!showAll)} 
                    className='mt-3 text-base-content hover:underline flex'
                >
                    {showAll ? 'View Less' : 'View More'}
                </button>
            )}
    </div>
  );
}