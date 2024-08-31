
import { IReview } from "@/lib/types";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import AddOrEditReviewModal from "@/components/modals/AddOrEditReviewModal";
import { Label } from "@/components/ui/label";
import StarRating from "../shared/StarRating";
import { User } from "lucide-react";

type ClubProfileReviewsProps = {
    reviews: IReview[];
    clubId: string;
}

const ClubProfileReviews = ({ reviews, clubId }: ClubProfileReviewsProps) => {
    const { userId } = useAuth();
    const [clubReviews, setClubReviews] = useState<IReview[]>(reviews);

    // review.user should never be undefined here, but kept for type safety
    const userReview = clubReviews.find((review: IReview) => review.user?.clerkId === userId);

    return (
        <section className="mt-8 px-8 w-full">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold mb-4">Reviews<span className=" ml-2 text-muted-foreground font-normal">({clubReviews.length})</span></h2>
                <AddOrEditReviewModal review={userReview} clubId={clubId} setReviews={setClubReviews}/>
                
            </div>
            <div className={`grid grid-cols-1 ${clubReviews.length > 0 && "xl:grid-cols-2"}`}>
                {clubReviews.length > 0 ? clubReviews.map((review: IReview) => (
                    <div key={review._id} className="bg-card max-w-[36rem] rounded-md py-4 px-7 md:h-60 shadow-lg border border-muted md:flex md:justify-between">
                        <div className="grid grid-cols-2 md:block max-sm:flex-wrap md:w-fit gap-x-2  md:space-x-0 md:space-y-2">
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
                        <div className="max-md:mt-3 md:w-[70%] flex flex-col justify-center space-y-1">
                            <p className="text-sm ">{review.comment}</p>
                            <p className="text-xs text-muted-foreground italic">- A Student at the University of Waterloo</p>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-muted-foreground w-full h-64 flex flex-col justify-center">
                        <User size={64} className="mx-auto"/>
                        <h1 className="w-full text-3xl font-medium">No reviews yet</h1>
                        <p className="mt-2 text-sm ">Be the first to review this club!</p>
                    </div>
                )
            }
            </div>
        </section>
    )
}

export default ClubProfileReviews;