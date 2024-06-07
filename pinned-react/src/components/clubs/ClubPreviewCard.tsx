import { IClub, costFilters, sizeFilters } from '@/lib/types'
import { Badge } from '../ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Link } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { hexToRGBObject } from '@/lib/utils'
import { cp } from 'fs'
import PreviewImage from '../Image/PreviewImage'
import clsx from 'clsx'

type ClubPreviewCardProps = {
  club: IClub
}

const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  const computeCostValue = (cost: number) => {
    if (cost === 0) {
      return 'Free'
    } else if (cost <= parseInt(costFilters['$0 - $10' as keyof typeof costFilters])) {
      return '$0 - $10'
    } else if (cost <= parseInt(costFilters['$10 - $50' as keyof typeof costFilters]))  {
      return '$10 - $50'
    } else {
      return 'Over $50'
    }
  }

  const computeSizeValue = (size: number) => {
    if (size <= parseInt(sizeFilters['Under 20' as keyof typeof sizeFilters])) {
      return 'Under 20'
    } else if (size <= parseInt(sizeFilters['20 - 50' as keyof typeof sizeFilters])) {
      return '20 - 50'
    } else if (size <= parseInt(sizeFilters['50 - 100' as keyof typeof sizeFilters])) {
      return '50 - 100'
    } else {
      return 'Over 100'
    }
  }
  console.log(club.colorTheme)
  return (
    <div className="flex flex-col justify-between space-y-3 sm:w-[46%] lg:w-[30%] 2xl:w-[22%] max-w-[28rem] h-[30rem] px-5 py-6 rounded-xl  shadow-lg shadow-secondary-light dark:shadow-secondary relative group hover:scale-[1.04] ease-in-out duration-300" style={{ backgroundImage: `linear-gradient(to top, white, white, ${club.colorTheme})` }} /*style={{ backgroundImage: `linear-gradient(to top, slate-900, slate-900, ${club.colorTheme})` }}*/>

      <div className='space-y-3'>
        <div className='flex justify-center h-[12rem] sm:h-[11rem] md:h-[12rem] w-full'>
          <Avatar className='w-auto h-full border-2 border-white aspect-square'>
            <AvatarImage src={club.preview}/>
            <AvatarFallback> <img src="/images/LogoPlaceholder.png" alt="placeholder" /></AvatarFallback>
          </Avatar>
        {/* <div className='w-auto h-full rounded-full border-2 border-gray-100 aspect-square overflow-hidden'>
            {club.logo ? (
              <PreviewImage preview={club.logo} alt='club logo'/>
            ) : (
              <img src="/images/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/>
            )}
        </div> */}
        </div>
        <h1 className='text-2xl font-semibold tracking-wide text-center dark:text-gray-100 '>{club.name}</h1>
        <div className='flex items-center justify-center'>
          <Badge variant={'outline'} className='bg-white border-none text-primary bg-primary-light'>
            {club.genre}
          </Badge>
        </div>
        <p className='text-center text-gray-700 dark:text-gray-500 px-6'>{club.overview}</p>
      </div>
      <div className='flex justify-center w-full space-x-16 sm:space-x-8 md:space-x-16 lg:space-x-8 xl:space-x-16'>
        <Badge variant={'outline'} className='border-none text-zinc-500 bg-zinc-100 dark:text-gray-300 dark:bg-gray-800'>
          {computeCostValue(club.cost)}
        </Badge>
        <Badge variant={'outline'} className='gap-2 border-none text-zinc-500 bg-zinc-100 dark:text-gray-300 dark:bg-gray-800'>
          {computeSizeValue(club.size)}
          <FaUserFriends />
        </Badge>
      </div>

      <TooltipProvider >
        <Tooltip >
          <TooltipTrigger className='absolute -top-1 right-2'>
            <Link to={`/${club._id}`}>
              <FaArrowUpRightFromSquare size={20} className='text-gray-300 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 hover:scale-[1.05] transition' />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Visit Page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ClubPreviewCard;
