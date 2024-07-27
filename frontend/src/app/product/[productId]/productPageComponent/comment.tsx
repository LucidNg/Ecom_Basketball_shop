
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Review, FetchReviewsByProductID } from "@/lib/review";

export default function Comment() {
    const { productId } = useParams();
    const [reviews, setReviews] = useState<Array<Review>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
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
  
    if (loading) {
      return <p>Loading reviews...</p>;
    }
  
    if (error) {
      return <p>Error loading reviews: {error}</p>;
    }
  
    return (
      <div className="w-[90%] mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-full h-auto border-b-2 border-base-content text-base-content flex pb-5 pt-5 mx-auto"
          >
            <div className="commentInfo flex flex-col items-center">
              <span className="UserName text-3xl font-semibold">User</span>
              <span className="DateComment">{new Date(review.date).toLocaleDateString()}</span>
            </div>
  
            <div className="flex flex-col mx-7 justify-between">
              <span>{review.rating} stars</span>
              <span className="commentContent text-xl">{review.comment}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
