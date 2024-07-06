import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { clubUses, userUses } from "@/lib/data";

import { Check } from "lucide-react";

const InfoCards = () => {
  return (
    <div className="container flex flex-wrap justify-center w-full gap-10 md:gap-20 lg:gap-24">
      {/* Students */}
      <Card className="flex flex-col items-center justify-center w-[16.5rem] xl:w-[18.5rem] shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear">
        <CardHeader className="relative flex items-center justify-center pb-0 mt-6">
          <img
            src="/images/MaleStudent.png"
            alt="user logo"
            className="absolute grayscale-[0%] top-[-4.5rem] xl:top-[-5.5rem] rounded-full w-24 xl:w-28 h-auto aspect-square object-cover"
          />
          <CardTitle className="text-lg leading-tight text-center xl:text-xl">
            For those who want to get involved...
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pb-0 mt-1 text-center">
          <CardDescription className="text-sm xl:text-base" >
            Whether your want to gain useful experience, make new friends, or just have fun.
          </CardDescription>
        </CardContent>

        <hr className="w-4/5 mx-auto my-4 border-accent-foreground" />

        <CardFooter className="block">
          <div className="space-y-4">
            {userUses.map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />  
                  <h3 className="ml-2 text-sm xl:text-base">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Clubs */}
      <Card className="flex flex-col items-center justify-center w-[16.5rem] xl:w-[18.5rem] shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear">
        <CardHeader className="relative flex items-center justify-center pb-0 mt-6">
          <img
            src="/images/FemaleStudent.png"
            alt="user logo"
            className="absolute grayscale-[0%] top-[-4.5rem] xl:top-[-5.5rem] rounded-full w-24 xl:w-28 h-auto aspect-square object-cover"
          />
          <CardTitle className="text-lg leading-tight text-center xl:text-xl ">
            ... And for those looking to expand
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pb-0 mt-1 text-center ">
          <CardDescription className="text-sm xl:text-base" >
            Whether you're an established club or just starting out, we have the tools to help you grow.
          </CardDescription>
        </CardContent>

        <hr className="w-4/5 mx-auto my-4 border-accent-foreground" />

        <CardFooter className="block">
          <div className="space-y-4">
            {clubUses.map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />  
                  <h3 className="ml-2 text-sm xl:text-base">{benefit}</h3>
                </span>
              )
            )}
          </div>
          
        </CardFooter>
      </Card>

      {/* Club of the Week */}
      {/* <Card className="flex flex-col items-center justify-center w-[22rem] shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear">
        <CardHeader className="py-4">
            <CardTitle className="text-lg text-center">Discover Featured Clubs</CardTitle>
            <CardDescription className="mt-2 text-sm text-center">
              Check of some of the most exciting clubs on campus! Club of the Week, The Up and Comer and more!
            </CardDescription>
            <a href="#featured-clubs-section" className="flex justify-center">
              <Button variant={"secondary"} className="w-2/3">
                Check it out!
              </Button>
            </a>
        </CardHeader>
      </Card> */}
    </div>
  );
};

export default InfoCards;