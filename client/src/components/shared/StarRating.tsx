import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { cn } from "@/lib/utils.ts";

type StarRatingProps = {
    rating: number,
    id?: string,
    className?: string
}

const StarRating = ({ rating, className, id }: StarRatingProps) => {
    return (
        <div 
            className={cn('flex gap-2 text-yellow-500 dark:text-yellow-400', className)} 
            key={`star-rating-${rating}`}
            id={id ?? ''} 
        >
            { rating > 0 ? <FaStar /> : <FaRegStar/> }
            { rating > 1 ? <FaStar /> : <FaRegStar/> }
            { rating > 2 ? <FaStar /> : <FaRegStar/> }
            { rating > 3 ? <FaStar /> : <FaRegStar/> }
            { rating > 4 ? <FaStar /> : <FaRegStar/> }
        </div>
    )
}

export default StarRating;