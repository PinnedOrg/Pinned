import { IClub} from '@/lib/types'
import { Badge } from '../ui/badge'
import {
  Avatar,
  AvatarFallback
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
import { IKContext, IKImage } from 'imagekitio-react'
import { imagekitEndpoints } from '@/lib/data'
import { routes } from '@/lib/routes'

type ClubPreviewCardProps = {
  club: IClub
}

const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  const { theme } = useTheme();
  const tintFactor = 0.75;
// #020617
  return (
   <Link to={`${routes.ClubProfile}${club._id}`}>
      <Card className='h-[23.2rem] max-w-[21rem] relative border-none drop-shadow-xl group hover:scale-[1.025] ease-in-out duration-300' style={{ backgroundImage: `linear-gradient(to top, ${theme === 'light'? 'white, white' : '#0f172a, #0f172a'}, ${theme == 'light'? club.colorTheme : tintColor(club.colorTheme, tintFactor)})` }}>
        <CardHeader className='flex flex-col items-center pb-2'>

          <IKContext urlEndpoint={imagekitEndpoints['default']} publicKey={import.meta.env.IMAGEKIT_PUBLIC_KEY}>
            <Avatar className='w-[8.5rem] sm:w-[8rem] md:w-[8.5rem] h-auto aspect-square border-2 border-slate-200 dark:border-slate-800'>
              {club.logo != null ? (
                <IKImage src={club.logo.url} alt={""} transformation={[{ height: "150", width: "150", }]} loading="lazy" lqip={{ active:true, quality:20 }} className='aspect-square' />
              ) : (
                <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square'/>
              )}
            </Avatar>
           </IKContext>
          <CardTitle className='text-center'>{club.name}</CardTitle>
          <Badge variant={'outline'} className='mt-2 bg-white border-none text-primary bg-primary-background'>
            {club.genre}
          </Badge>
        </CardHeader>
        <CardContent className=''>
          <CardDescription className='text-sm text-center'>{club.overview}</CardDescription>
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
          <Tooltip>
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
