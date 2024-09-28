import { Badge } from '@/components/ui/badge'
import { Avatar } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StarRating from "@/components/shared/StarRating.tsx";

import { Link } from 'react-router-dom'
import { clsx } from "clsx";
import { IKContext, IKImage } from 'imagekitio-react'

import { IClub} from '@/lib/types'
import { imagekitEndpoints } from '@/lib/data'
import { routes } from '@/lib/routes'

import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type ClubPreviewCardProps = {
  club: IClub
}

const featureTexts: { [key: number]: string } = {
  1: "Club of the Week",
  2: "Upcoming Club"
}

// #020617: hex color for bg

const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  // Dynamically set the line-clamp value based on club.featured
  const descriptionLines = club.featured !== 0 ? 2 : 3;

  return (
    <Card
        className={clsx('h-[25rem] min-w-[18rem] max-w-[21rem] relative border-none drop-shadow-xl group hover:scale-[1.025] ease-in-out duration-300', {'shadow-lg shadow-white/10 transition-all bg-opacity-20': club.featured != 0})}
    >
    <Link to={`${routes.ClubProfile}${club._id}`}>
        <CardHeader className='flex flex-col items-center pb-2 space-y-2'>
          <IKContext urlEndpoint={imagekitEndpoints['club']} publicKey={import.meta.env.IMAGEKIT_PUBLIC_KEY}>
            <Avatar className='w-[8.5rem] sm:w-[8rem] md:w-[8.5rem] h-auto aspect-square border-2 border-slate-200 dark:border-slate-800'>
              {club.logo !== null ? (
                <IKImage 
                  src={club.logo.url}
                  alt={""} 
                  transformation={[{ height: "150", width: "150", }]} 
                  loading="lazy" 
                  lqip={{ active:true, quality:20 }} 
                  className='aspect-square'
                />
              ) : (
                <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/>
              )}
            </Avatar>
          </IKContext>
          <CardTitle className='text-center'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2, // Always clamp to 2 lines
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '1.2em', // Adjust line height for better spacing
              maxHeight: '2.4em',  // Ensures that it doesn't exceed 2 lines
            }}>
            {club.name}
          </CardTitle>
          <div className='flex justify-center'>
            <Badge variant={'outline'} className='line-clamp-2 bg-white border-none text-primary bg-primary-background w-max'>
              {club.genre}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='mt-2 space-y-2 overflow-hidden'>
          <StarRating rating={club.avgRating} className='flex justify-center' />
          <CardDescription className='text-sm text-center'
           style={{
            display: '-webkit-box',
            WebkitLineClamp: descriptionLines, // Dynamically set the number of lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden', // Ensure overflow is hidden
            textOverflow: 'ellipsis' // Add "..." when overflowing
          }}>
            {club.description}
          </CardDescription>
          {
            club.featured > 0 &&
              <div className="relative flex justify-center w-full">
                <img src='/images/Goldbanner.png' alt='banner' className='object-cover h-12'/>
                <h1 className='absolute left-0 w-full font-bold text-center text-gray-900 top-[0.15rem]'>{featureTexts[club.featured]}</h1>
              </div>
          }
        </CardContent>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='absolute top-3 right-3'>
              <FaArrowUpRightFromSquare size={20}
                                        className='text-gray-300 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 hover:scale-[1.05] transition' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Visit Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </Card>
  )
}

export default ClubPreviewCard;
