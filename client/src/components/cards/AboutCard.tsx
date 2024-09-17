import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { AboutCardType } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { LinkedinIcon } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

const AboutCard = ( member : AboutCardType) => {
  return (
    //bg-gradient-to-br from-secondary via-[rgb(113, 138, 232)] to-primary
    <Card className="flex flex-col items-center justify-center gap-3 p-4 bg-white border shadow-md animate-fade-in-scale dark:bg-slate-900 rounded-xl dark:shadow-slate-800 border-slate-200 dark:border-slate-800 max-w-[25rem]" >
      {/* <CardHeader className="flex items-center justify-center pb-2 "> */}
        <Avatar className="grayscale-[0%] rounded-full w-24 h-auto aspect-square mt-2">
          <AvatarImage src={member.picture} alt={member.name} />
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
          {/* className=" grayscale-[0%] rounded-full w-28 h-auto aspect-square object-cover" */}
        <CardTitle className="text-center flex items-end">
          {member.name}
          <Link to={member.linkedin} target="_blank">
            <LinkedInLogoIcon className=" ml-2 text-primary dark:text-primary-dark" />
          </Link>
        </CardTitle>
      <CardContent className="text-center">
        <CardDescription>{member.about}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default AboutCard
