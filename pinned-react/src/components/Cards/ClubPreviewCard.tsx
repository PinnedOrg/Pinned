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
import { routes } from '@/lib/routes'
import clsx from 'clsx'

type ClubPreviewCardProps = {
  club: IClub
  featureText?: string
}

const ClubPreviewCard = ({ club, featureText }: ClubPreviewCardProps) => {
  const { theme } = useTheme();
  const tintFactor = 0.75;
// #020617

const CardBackground = () => {
  if (featureText) {
    // Each color now includes an alpha value for opacity
    return 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, rgba(248, 214, 78, 0.2) 25%, rgba(212, 175, 55, 0.2) 50%, rgba(176, 141, 87, 0.2) 75%, rgba(128, 99, 20, 0.2) 100%)';
  }
  // Adjust the linear gradient similarly if needed
  return `linear-gradient(to top, ${theme === 'light' ? 'rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.2)'}, ${theme == 'light' ? club.colorTheme : tintColor(club.colorTheme, tintFactor)})`;
}


  return (
   <Link to={`${routes.ClubProfile}${club._id}`}>
      <Card 
        className={clsx('h-[25rem] max-w-[22rem] relative border-none drop-shadow-xl group hover:scale-[1.025] ease-in-out duration-300', {'shadow-lg shadow-white/10 transition-all bg-opacity-20': featureText})} 
        style={{ backgroundImage: CardBackground() }}>
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
            {!featureText ? 
              <>
                <Badge variant={'outline'} className='border-none bg-muted text-nowrap'>
                  {costLabel(club.cost)}
                </Badge>
                <Badge variant={'outline'} className='gap-2 border-none bg-muted text-nowrap '>
                  {sizeLabel(club.size)}
                  <FaUserFriends />
                </Badge>
              </> 
              : 
              <div className="relative w-full">
                <img src='/images/goldbanner1.png' alt='banner' className='object-cover w-full h-12' />
                <h1 className='absolute left-0 w-full font-bold text-center text-gray-900 top-[0.15rem]'>{featureText}</h1>
              </div>
          }
          </CardFooter>
        </CardContent>
        <TooltipProvider >
          <Tooltip >
            <TooltipTrigger className='absolute top-2 right-2'>
              <Link to={`${routes.ClubProfile}${club._id}`}>
                <FaArrowUpRightFromSquare size={20} className='text-gray-300 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 hover:scale-[1.05] transition' />
              </Link>
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
