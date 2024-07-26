import React, { useEffect, useState } from "react";

export default function Rating() {
    const overallRating = 4.56; // Example rating
    const fullStars = Math.floor(overallRating);
    const halfStar = overallRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    // Example ratings array, typically fetched from an API
    const ratings = [5, 4, 5, 3, 4, 5, 1, 2, 5, 4, 3, 5, 4]; // Replace with your fetched data

    // State to hold the count of each rating level
    const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    useEffect(() => {
        const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ratings.forEach(rating => {
            counts[rating as keyof typeof counts]++;
        });
        setRatingCounts(counts);
    }, []);

    // Get the maximum number of ratings for any single level to set the max for the progress bars
    const maxRatings = Math.max(...Object.values(ratingCounts));

    return (
        <div className="RatingBox">
            <span className="font-semibold text-4xl text-base-content">Rating</span>
            <div className="RatingDisplay flex flex-row gap-5 text-base-content mt-8 pl-24">
                <span className="font-bold text-4xl">{overallRating}/5</span>
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
                    {Object.entries(ratingCounts)
                        .sort(([a], [b]) => Number(b) - Number(a))
                        .map(([level, count]) => (
                            <div key={level} className="gap-x-2 flex flex-row items-center">
                                <a>{level} stars</a>
                                <progress className="progress progress-info w-40 h-2" value={count} max={maxRatings}></progress>
                                <a className="numberOfRating">{count}</a>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
