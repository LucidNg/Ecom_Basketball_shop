import { connectString } from "./constant";

export interface Review {
    comment: string;
    rating: number;
    date: string;
  }

export async function FetchReviewsByProductID(
  productID: string
): Promise<Array<Review>> {
  let url = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}/reviews/${productID}`
    : `${connectString}/reviews/${productID}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews for product with ID: ${productID}`);
  }

  const data = await response.json();
  return data as Array<Review>;
}

export interface AverageRating {
    averageRating: number;
  }
  
export async function FetchAverageRatingByProductID(
    productID: string
  ): Promise<AverageRating> {
    let url = process.env.API_ENDPOINT
      ? `${process.env.API_ENDPOINT}/averageRating/${productID}`
      : `${connectString}/averageRating/${productID}`;
  
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch average rating for product with ID: ${productID}`);
    }
  
    const data = await response.json();
    return data[0] as AverageRating;
  }


export interface RatingCount {
    one_star: number;
    two_star: number;
    three_star: number;
    four_star: number;
    five_star: number;
  }

  export async function FetchRatingCountByProductID(
    productID: string
  ): Promise<RatingCount> {
    let url = process.env.API_ENDPOINT
      ? `${process.env.API_ENDPOINT}/ratingCount/${productID}`
      : `${connectString}/ratingCount/${productID}`;
  
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch average rating for product with ID: ${productID}`);
    }
  
    const data = await response.json();
    return data[0] as RatingCount;
  }