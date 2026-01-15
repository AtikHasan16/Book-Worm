import React from "react";
import ReviewManager from "@/components/dashboard/reviews/ReviewManager";

const getPendingReviews = async () => {
  try {
    const res = await fetch(
      "https://bw-server-seven.vercel.app/api/reviews/pending",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch pending reviews");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading pending reviews:", error);
    return [];
  }
};

const ManageReviewPage = async () => {
  const reviews = await getPendingReviews();

  return (
    <div className="p-6">
      <ReviewManager initialReviews={reviews} />
    </div>
  );
};

export default ManageReviewPage;
