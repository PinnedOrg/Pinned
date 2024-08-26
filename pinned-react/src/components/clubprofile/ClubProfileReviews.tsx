
import { IReview } from "@/lib/types";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import AddOrEditReviewModal from "@/components/modals/AddOrEditReviewModal";
import { Label } from "@/components/ui/label";
import StarRating from "../shared/StarRating";

type ClubProfileReviewsProps = {
    reviews: IReview[];
    clubId: string;
}

const ClubProfileReviews = ({ reviews, clubId }: ClubProfileReviewsProps) => {
    const { userId } = useAuth();
    const [clubReviews, setClubReviews] = useState<IReview[]>(reviews);

    // review.user should never be undefined here, but kept for type safety
    const userReview = reviews.find((review: IReview) => review.user?.clerkId === userId);
    return (
        <section className="mt-8 px-8 w-full">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold mb-4">Reviews<span className=" ml-2 text-muted-foreground font-normal">({clubReviews.length})</span></h2>
                <AddOrEditReviewModal review={userReview} clubId={clubId} setReviews={setClubReviews}/>
                
            </div>
            <div className="grid sm:grid-cols-1 xl:grid-cols-2 ">
                {clubReviews.map((review: IReview) => (
                    <div key={review._id} className="bg-card max-w-[36rem] rounded-md py-4 px-7 md:h-60 shadow-lg border border-muted md:flex md:justify-between">
                        <div className="md:w-[70%] space-y-1">
                            <p className="text-sm ">{review.comment}</p>
                            <p className="text-xs text-muted-foreground italic">- A Student at the University of Waterloo</p>
                        </div>
                        <div className="max-md:mt-1 grid grid-cols-2 md:block max-sm:flex-wrap md:w-fit gap-x-2  md:space-x-0 md:space-y-2">
                            <div>
                                <Label className="text-accent-foreground">
                                    Engagement
                                </Label>
                                <StarRating rating={review.engagement} className="text-sm sm:text-base"/>
                            </div>
                            <div>
                                <Label className="text-accent-foreground">
                                    Commitment
                                </Label>
                                <StarRating rating={review.commitment} className="text-sm sm:text-base"/>
                            </div>
                            <div>
                                <Label className="text-accent-foreground">
                                    Inclusivity
                                </Label>
                                <StarRating rating={review.inclusivity} className="text-sm sm:text-base"/>
                            </div>
                            <div>
                                <Label className="text-accent-foreground">
                                    Organization
                                </Label>
                                <StarRating rating={review.organization} className="text-sm sm:text-base"/>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ClubProfileReviews;