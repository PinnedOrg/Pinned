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

type AddOrEditReviewModalProps = {
    review: IReview
}


const AddOrEditReviewModal = ({ review }: AddOrEditReviewModalProps) => {
    const isEditMode = review !== null;

    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    {`${isEditMode ? 'Edit' : 'Add'} Review`}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddOrEditReviewModal;