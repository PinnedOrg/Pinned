import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { IReview } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/lib/routes";
import { Slider } from "../ui/slider";

type AddOrEditReviewModalProps = {
    review: IReview | undefined
}


const AddOrEditReviewModal = ({ review }: AddOrEditReviewModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useAuth();
    const isEditMode = review ? true : false;

    const handleSignInClick = () => {
        navigate(routes.SignIn, { state: { from: location.pathname } });
    }

    if (!userId) {
        return (
            <Button variant={'default'} onClick={handleSignInClick} >
                Add review
            </Button>
        )
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={'default'}>
                    {`${isEditMode ? 'Edit' : 'Add'} Review`}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {`${isEditMode ? 'Edit' : 'Add'} Review`}
                    </DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <DialogDescription>
                    <Slider></Slider>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default AddOrEditReviewModal;