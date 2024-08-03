import { IClub} from '@/lib/types'
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

import {computeAverageRating} from '@/lib/utils'
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
  return (
   <Link to={`${routes.ClubProfile}${club._id}`}>
     {/*style={{ backgroundImage: `linear-gradient(to top, ${theme === 'light'? 'white, white' : '#0f172a, #0f172a'}, ${theme == 'light'? club.colorTheme : tintColor(club.colorTheme, tintFactor)})` }}
     Or add shadow or change the title color for each card
     */}
      <Card
          className={clsx('h-[25rem] min-w-[18rem] max-w-[21rem] relative border-none drop-shadow-xl group hover:scale-[1.025] ease-in-out duration-300', {'shadow-lg shadow-white/10 transition-all bg-opacity-20': club.featured != 0})}
      >
        <CardHeader className='flex flex-col items-center pb-2 space-y-2'>
          <IKContext urlEndpoint={imagekitEndpoints['club']} publicKey={import.meta.env.IMAGEKIT_PUBLIC_KEY}>
            <Avatar className='w-[8.5rem] sm:w-[8rem] md:w-[8.5rem] h-auto aspect-square border-2 border-slate-200 dark:border-slate-800'>
              {club.logo != null ? (
                <IKImage src={club.logo.url} alt={""} transformation={[{ height: "150", width: "150", }]} loading="lazy" lqip={{ active:true, quality:20 }} className='aspect-square' />
              ) : (
                <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/>
              )}
            </Avatar>
          </IKContext>
          <CardTitle className='text-center' >{club.name}</CardTitle>
          <div className='flex justify-center'>
            <Badge variant={'outline'} className='bg-white border-none text-primary bg-primary-background w-max'>
              {club.genre}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='space-y-2 mt-2 overflow-hidden'>
          <StarRating rating={computeAverageRating(club.reviews)} className='flex justify-center' />
          <CardDescription className='text-sm text-center overflow-hidden h-16'>
            {club.description}
          </CardDescription>
          {
            club.featured > 0 &&
              <div className="relative w-full flex justify-center">
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
      </Card>
    </Link>
  )
}

export default ClubPreviewCard;
