import { IClub} from '@/lib/types'
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
import { costLabel, sizeLabel, tintColor } from '@/lib/utils'
import { useTheme } from '@/components/shared/ThemeProvider'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import PreviewImage from '../Image/PreviewImage'

type ClubPreviewCardProps = {
  club: IClub
}

const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  const { theme } = useTheme();
  const tintFactor = 0.75;
// #020617
  return (
    <Link to={`/${club._id}`}>
      <Card className='h-[25rem] max-w-[22rem] relative border-none drop-shadow-xl group hover:scale-[1.025] ease-in-out duration-300' style={{ backgroundImage: `linear-gradient(to top, ${theme === 'light'? 'white, white' : '#0f172a, #0f172a'}, ${theme == 'light'? club.colorTheme : tintColor(club.colorTheme, tintFactor)})` }}>
        <CardHeader className='flex flex-col items-center pb-2'>
          <Avatar className='w-[8.5rem] sm:w-[8rem] md:w-[8.5rem] h-auto aspect-square border-2 border-slate-200 dark:border-slate-800'>
            <AvatarImage src={club.preview}/>
            {/* <PreviewImage preview={club.logo} /> */}
            <AvatarFallback>
              <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/>
            </AvatarFallback>
          </Avatar>
          <CardTitle className='text-center'>{club.name}</CardTitle>
          <Badge variant={'outline'} className='mt-2 bg-white border-none text-primary bg-primary-background'>
            {club.genre}
          </Badge>
        </CardHeader>
        <CardContent className=''>
          <CardDescription className='text-center'>{club.overview}</CardDescription>
          <CardFooter className='absolute bottom-0 left-0 flex justify-center w-full gap-4 '>
            <Badge variant={'outline'} className='border-none bg-muted text-nowrap'>
              {costLabel(club.cost)}
            </Badge>
            <Badge variant={'outline'} className='gap-2 border-none bg-muted text-nowrap '>
              {sizeLabel(club.size)}
              <FaUserFriends />
            </Badge>
          </CardFooter>
        </CardContent>

        <TooltipProvider >
          <Tooltip >
            <TooltipTrigger className='absolute top-2 right-2'>
                <FaArrowUpRightFromSquare size={20} className='text-gray-300 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 hover:scale-[1.05] transition' />
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

{/* <div className="flex flex-col justify-between space-y-2 sm:w-[46%] lg:w-[30%] xl:w-[22%] max-w-[28rem] xl:max-w-[22rem] h-[25rem] px-5 py-4 rounded-xl shadow-md shadow-slate-200 dark:shadow-slate-800 border border-slate-200 dark:border-slate-800 relative group hover:scale-[1.04] ease-in-out duration-300" 
    style={{ backgroundImage: `linear-gradient(to top, ${theme === 'light'? 'white, white' : '#020617, #020617'}, ${theme == 'light'? club.colorTheme : tintColor(club.colorTheme, tintFactor)})` }} >

      <div className='space-y-2'>
        <div className='flex justify-center h-[8.5rem] sm:h-[8rem] md:h-[8.5rem] w-full'>
          <Avatar className='w-auto h-full border-2 border-slate-200 dark:border-slate-800 aspect-square'>
            <AvatarImage src={club.preview}/>
            <AvatarFallback> <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/></AvatarFallback>
          </Avatar>
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
          {sizeLabel(club.size)}
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
    </div> */}