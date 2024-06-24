import { IClub} from '@/lib/types'
import { costFilters, sizeFilters } from '@/lib/data'
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
import { hexToRGBObject, tintColor } from '@/lib/utils'
import { useTheme } from '@/components/shared/ThemeProvider'

type ClubPreviewCardProps = {
  club: IClub
}
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
const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  const { theme } = useTheme();
  const tintFactor = 0.75;

  return (
    <div className="flex flex-col justify-between space-y-2 sm:w-[46%] lg:w-[30%] xl:w-[22%] max-w-[28rem] xl:max-w-[22rem] h-[25rem] px-5 py-4 rounded-xl shadow-md shadow-slate-200 dark:shadow-slate-800 border border-slate-200 dark:border-slate-800 relative group hover:scale-[1.04] ease-in-out duration-300" 
    style={{ backgroundImage: `linear-gradient(to top, ${theme === 'light'? 'white, white' : '#020617, #020617'}, ${theme == 'light'? club.colorTheme : tintColor(club.colorTheme, tintFactor)})` }} /*style={{ backgroundImage: `linear-gradient(to top, slate-900, slate-900, ${club.colorTheme})` }}*/>

      <div className='space-y-2'>
        <div className='flex justify-center h-[8.5rem] sm:h-[8rem] md:h-[8.5rem] w-full'>
          <Avatar className='w-auto h-full border-2 border-slate-200 dark:border-slate-800 aspect-square'>
            <AvatarImage src={club.preview}/>
            <AvatarFallback> <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/></AvatarFallback>
          </Avatar>
        {/* <div className='w-auto h-full overflow-hidden border-2 border-gray-100 rounded-full aspect-square'>
            {club.logo ? (
              <PreviewImage preview={club.logo} alt='club logo'/>
            ) : (
              <img src="/images/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/>
            )}
        </div> */}
        </div>
        <h1 className='text-xl font-semibold tracking-wide text-center dark:text-slate-300 '>{club.name}</h1>
        <div className='flex items-center justify-center'>
          <Badge variant={'outline'} className='bg-white border-none text-primary bg-primary-light'>
            {club.genre}
          </Badge>
        </div>
        <p className='px-6 text-sm text-center text-gray-700 dark:text-gray-500'>{club.overview}</p>
      </div>
      <div className='flex justify-center w-full space-x-16 sm:space-x-8 md:space-x-16 lg:space-x-4 xl:space-8 '>
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
          <TooltipTrigger className='absolute top-0 right-2'>
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
