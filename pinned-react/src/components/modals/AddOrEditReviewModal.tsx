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

import {IReview} from "@/lib/types";
import {Button} from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { routes } from "@/lib/routes";

type AddOrEditReviewModalProps = {
    review: IReview | undefined
}


const AddOrEditReviewModal = ({ review }: AddOrEditReviewModalProps) => {
    const { userId } = useAuth();
    const isEditMode = review !== null || review !== undefined;

    return (
        <Dialog>
            <DialogTrigger>
                {userId ? (
                    <Link to={routes.SignIn}>
                        <Button variant={'default'}>
                            Add Review
                        </Button>
                    </Link>
                ) : (
                    <Button>
                        {`${isEditMode ? 'Edit' : 'Add'} Review`}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddOrEditReviewModal;