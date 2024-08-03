import { IClub} from '@/lib/types'
import { Badge } from '../ui/badge'
import { Avatar } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Link } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import {computeAverageRating, costLabel, sizeLabel, tintColor} from '@/lib/utils'
import { useTheme } from '@/components/shared/ThemeProvider'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { IKContext, IKImage } from 'imagekitio-react'
import { imagekitEndpoints } from '@/lib/data'
import { routes } from '@/lib/routes'
import shadow from "@/components/clubprofile/Shadow.tsx";
import StarRating from "@/components/shared/StarRating.tsx";

type ClubPreviewCardProps = {
  club: IClub
}

const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  const { theme } = useTheme();
  const tintFactor = 0.75;
// #020617
  return (
   <Link to={`${routes.ClubProfile}${club._id}`}>
     {/*style={{ backgroundImage: `linear-gradient(to top, ${theme === 'light'? 'white, white' : '#0f172a, #0f172a'}, ${theme == 'light'? club.colorTheme : tintColor(club.colorTheme, tintFactor)})` }}
     Or add shadow or change the title color for each card
     */}
      <Card className='h-[25rem] min-w-[18rem] max-w-[21rem] relative border-none drop-shadow-xl group hover:scale-[1.025] ease-in-out duration-300' >
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
          <StarRating rating={computeAverageRating(club.reviews)} />
        </CardHeader>

        <CardContent className='space-y-2 mt-2 overflow-hidden'>
          <CardDescription className='text-sm text-center overflow-hidden h-16'>
            {club.description}
          </CardDescription>
          <div className='flex justify-center'>
            <Badge variant={'outline'} className='bg-white border-none text-primary bg-primary-background w-max'>
              {club.genre}
            </Badge>
          </div>
          <CardFooter className=' mt-4 flex justify-center w-full gap-4 h-min '>
            <Badge variant={'outline'} className=' border-muted-foreground bg-muted text-nowrap w-24 justify-center'>
              {costLabel(club.cost)}
            </Badge>
            <Badge variant={'outline'} className='gap-2 border-muted-foreground bg-muted text-nowrap '>
              {sizeLabel(club.size)}
              <FaUserFriends />
            </Badge>
          </CardFooter>
        </CardContent>

        <TooltipProvider >
          <Tooltip>
            <TooltipTrigger className='absolute top-3 right-3'>
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
