import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FetchAverageRatingByProductID, FetchRatingCountByProductID, RatingCount } from "@/lib/review";

interface LevelToLabel {
  [key: number]: string;
}

const levelToLabel: LevelToLabel = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five"
};

export default function Rating() {
    const { productId } = useParams(); // Use useParams to get productId from route params
    const [overallRating, setOverallRating] = useState<number>(0);
    const [ratingCounts, setRatingCounts] = useState<RatingCount>({
      one_star: 0,
      two_star: 0,
      three_star: 0,
      four_star: 0,
      five_star: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchRatings = async () => {
        if (productId) {
          try {
            const avgRating = await FetchAverageRatingByProductID(productId.toString());
            const counts = await FetchRatingCountByProductID(productId.toString());
            setOverallRating(avgRating.averageRating);
            setRatingCounts(counts);
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchRatings();
    }, [productId]);
  
    if (loading) {
      return <p>Loading ratings...</p>;
    }
  
    if (error) {
      return <p>Error loading ratings: {error}</p>;
    }
  
    // Calculate the number of stars
    const fullStars = Math.floor(overallRating);
    const halfStar = overallRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
  
    // Get the maximum number of ratings for any single level to set the max for the progress bars
    const maxRatings = Math.max(
      ratingCounts.one_star,
      ratingCounts.two_star,
      ratingCounts.three_star,
      ratingCounts.four_star,
      ratingCounts.five_star
    );
  
    return (
      <div className="RatingBox">
        <span className="font-semibold text-4xl text-base-content">Rating</span>
        <div className="RatingDisplay flex flex-row gap-5 text-base-content mt-8 pl-24">
          <span className="font-bold text-4xl">{overallRating.toFixed(1)}/5.0</span>
          <div className="starRating">
            <div className="rating rating-lg rating-half h-20 w-20">
              <input type="radio" name="rating-10" className="rating-hidden" />
              {Array(fullStars).fill(null).map((_, i) => (
                <React.Fragment key={`full-${i}`}>
                  <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-base-content" defaultChecked />
                  <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-base-content" defaultChecked />
                </React.Fragment>
              ))}
              {halfStar === 1 && (
                <React.Fragment>
                  <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-base-content" defaultChecked />
                  <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-base-content" />
                </React.Fragment>
              )}
              {Array(emptyStars).fill(null).map((_, i) => (
                <React.Fragment key={`empty-${i}`}>
                  <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-base-content" />
                  <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-base-content" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="RatedBoard pl-12">
          <span className="text-base-content text-xl">Detailed rating</span>
          <div className="progessBar flex flex-col gap-y-2 mt-4 pl-8 text-base-content">
            {Object.keys(levelToLabel).map((level) => (
              <div key={level} className="gap-x-2 flex flex-row items-center">
                <span>{level} stars</span>
                <progress
                  className="progress progress-info w-40 h-2"
                  value={ratingCounts[`${levelToLabel[parseInt(level)]}_star` as keyof RatingCount ] || 0}
                  max={maxRatings}
                ></progress>
                <span className="numberOfRating">{ratingCounts[`${levelToLabel[parseInt(level)]}_star`as keyof RatingCount] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
