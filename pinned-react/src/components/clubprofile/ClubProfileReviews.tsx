import { IReview } from "@/lib/types";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import AddOrEditReviewModal from "../modals/AddOrEditReviewModal";

type ClubProfileReviewsProps = {
    reviews: IReview[];
}

const ClubProfileReviews = ({ reviews }: ClubProfileReviewsProps) => {
    const { userId } = useAuth();
    console.log(userId);
    const userReview = reviews.find((review: IReview) => review.user.clerkId === userId);
    return (
        <section className="container">
            <h3 className="text-3xl font-bold mb-8 text-left w-full">Reviews</h3>
            <AddOrEditReviewModal review={userReview ?? undefined} />
        </section>
    )
}

export default ClubProfileReviews;