import { useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { routes } from "@/lib/routes";
import { IReview } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

type AddOrEditReviewModalProps = {
    review?: IReview;
    clubId: string;
    setReviews: React.Dispatch<React.SetStateAction<IReview[]>>
}

type ReviewFormData = {
    engagement: number;
    commitment: number;
    inclusivity: number;
    organization: number;
    comment: string;
}

type ReviewFormDataKeys = keyof ReviewFormData;

type RatingSliderProps = {
    label: string;
    sliderkey: ReviewFormDataKeys;
    value: number;
    onValueChange: (key: ReviewFormDataKeys, newValue: number | string) => void
}

const RatingSlider = ({ label, sliderkey, value, onValueChange }: RatingSliderProps) => {
    const [rating, setRating] = useState<number>(value);

    const handleValueChange = (newValue: number) => {
        setRating(newValue);
        console.log(sliderkey)
        onValueChange(sliderkey, newValue);
    }

    return (
        <div className="sm:flex max-sm:space-y-1 justify-between py-2 w-[75%]">
            <Label htmlFor={sliderkey} className="text-accent-foreground">{label}</Label>
            <div className="flex gap-4">
                <Slider
                    id={sliderkey} 
                    defaultValue={[value]} 
                    min={0} 
                    max={5} 
                    step={1} 
                    className="w-[12rem]"
                    onValueChange={(newValue: number[]) => handleValueChange(newValue[0])} 
                />
                <Label className="flex gap-1 text-accent-foreground">
                    {rating}
                    <FaStar className="text-yellow-500 dark:text-yellow-400" />
                </Label>
            </div>
        </div>
    )
}


const DeleteReviewConfirmationModal = ({ reviewId, clubId, setReviews }: { reviewId: string, clubId: string, setReviews: React.Dispatch<React.SetStateAction<IReview[]>> }) => {
    const { getToken } = useAuth();
    const { toast } = useToast();

    const deleteReviewMutation = async () => {
        const token = await getToken();
        await axiosInstance.delete(`/api/reviews/${clubId}/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } 

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this review?</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={deleteReviewMutation}>Delete</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => {}}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const AddOrEditReviewModal = ({ review, clubId, setReviews }: AddOrEditReviewModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const { userId, getToken } = useAuth();
    let isEditMode = review ? true : false;

    const [reviewFormData, setreviewFormData] = useState<IReview>({
        _id: review?._id || '',
        engagement: review?.engagement || 0,
        commitment: review?.commitment || 0,
        inclusivity: review?.inclusivity || 0,
        organization: review?.organization || 0,
        comment: review?.comment || ''
    });

    const handleSignInClick = () => {
        navigate(routes.SignIn, { state: { from: location.pathname } });
    }

    const handleUpdateFilters = (formDataKey: ReviewFormDataKeys, value: number | string) => {
        if (!formDataKey) return;
        setreviewFormData((prev) => ({
            ...prev,
            [formDataKey]: value
        }));
    }
    
    const handleSubmit = async () => {
        if (!userId) return;

        const token = await getToken()
        await axiosInstance.put(`/api/reviews/${clubId}`, reviewFormData, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            }
        }).then((data) => {
            console.log(data)
            setReviews((prevReviews) => {
                if (review) {
                    return prevReviews.map((r) => {
                        if (r._id === review._id) {
                            return {
                                ...r,
                                ...reviewFormData
                            }
                        }
                        return r;
                    })
                }
                return [...prevReviews, reviewFormData]
            });
            toast({
                variant: "default",
                description: `Your review has been successfully ${isEditMode ? "updated" : "added"}.`,
            })
            setTimeout(() => {
                window.location.reload();
            }, 5000);

        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            })
            console.error(error);
        });
    }

    if (!userId) {
        return (
            <Button variant={'secondary'} onClick={handleSignInClick} size="sm" >
                Add review
            </Button>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'secondary'} size="sm">
                    {`${isEditMode ? 'Edit' : 'Add'} Club Review`}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {`${isEditMode ? 'Edit' : 'Add'} Club Review`}
                    </DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <div className="mt-1">
                    <RatingSlider label="Engagement" sliderkey="engagement" value={reviewFormData.engagement} onValueChange={handleUpdateFilters} />
                    <RatingSlider label="Commitment" sliderkey="commitment" value={reviewFormData.commitment} onValueChange={handleUpdateFilters} />
                    <RatingSlider label="Inclusivity" sliderkey="inclusivity" value={reviewFormData.inclusivity} onValueChange={handleUpdateFilters} />
                    <RatingSlider label="Organization" sliderkey="organization" value={reviewFormData.organization} onValueChange={handleUpdateFilters} />
                    
                    <div className="mt-4">
                        <Label htmlFor="comment" className="text-accent-foreground">
                            Comment
                            <span className="font-normal text-muted-foreground">{` (${reviewFormData.comment.length}/500)`}</span>
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder="Leave your thoughts about this club..."
                            value={reviewFormData.comment}
                            onChange={(e) => handleUpdateFilters('comment', e.target.value)}
                            className="mt-1 max-h-36"
                            maxLength={500} // same as Review model in server
                        />
                    </div>
                </div>
                <DialogFooter className="mt-2">
                    <div className="flex items-center justify-between w-full">
                        <Label className="w-full italic  text-muted-foreground">Note: Reviews are anonymous</Label>
                        <div className="flex gap-2">
                            {/* {isEditMode && <DeleteReviewConfirmationModal reviewId={reviewFormData._id} clubId={clubId} setReviews={setReviews} />} */}
                            <DialogClose asChild>
                                <Button variant={'default'} onClick={handleSubmit} size={'sm'}>
                                    {isEditMode ? "Update" : "Submit"}
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddOrEditReviewModal;