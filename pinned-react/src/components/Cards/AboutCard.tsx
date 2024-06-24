import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { AboutCardType } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AboutCard = ( member : AboutCardType) => {
  return (
    //bg-gradient-to-br from-secondary via-[rgb(113, 138, 232)] to-primary
    <Card className="flex flex-col items-center justify-center gap-3 p-4 bg-white border shadow-md dark:bg-slate-900 rounded-xl dark:shadow-slate-800 border-slate-200 dark:border-slate-800 " >
      {/* <CardHeader className="flex items-center justify-center pb-2 "> */}
        <Avatar className="grayscale-[0%] rounded-full w-24 h-auto aspect-square mt-2">
          <AvatarImage src={member.picture} alt={member.name} />
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
          {/* className=" grayscale-[0%] rounded-full w-28 h-auto aspect-square object-cover" */}
        <CardTitle className="text-center">{member.name}</CardTitle>
      <CardContent className="text-center">
        <CardDescription>{member.about}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default AboutCard
