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

const HeroCards = () => {
  return (
    <div>
      <div className=" relative max-w-full lg:w-[700px] lg:h-[500px] flex flex-wrap justify-center gap-10 gap-y-16 md:gap-16 mt-20 lg:mt-0 z-10 xl:ml-0">
        {/* Students */}
        <Card className="lg:absolute flex flex-col items-center justify-center lg:top-10 left-[-4.5rem] xl:left-[-1rem] w-[16.5rem] shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear animate-fade-in-scale">
          <CardHeader className="relative flex items-center justify-center pb-0 mt-6">
            <img
              src="/images/MaleStudent.png"
              alt="user logo"
              className="absolute grayscale-[0%] top-[-4.5rem] rounded-full w-24 h-24 aspect-square object-cover"
            />
            <CardTitle className="text-lg leading-tight text-center">
              For those who want to get involved...
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pb-0 mt-1 text-center">
            <CardDescription className="text-sm" >
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
                    <h3 className="ml-2 text-sm">{benefit}</h3>
                  </span>
                )
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Clubs */}
        <Card className="lg:absolute left-[14rem] xl:left-[17.5rem] lg:top-[7.5rem] w-[16.5rem] flex flex-col items-center justify-center shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear animate-fade-in-scale">
          <CardHeader className="relative flex items-center justify-center pb-0 mt-6">
            <img
              src="/images/FemaleStudent.png"
              alt="user logo"
              className="absolute grayscale-[0%] top-[-4.5rem] rounded-full w-24 h-auto aspect-square object-cover"
            />
            <CardTitle className="text-lg leading-tight text-center ">
              ... And for those looking to expand
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pb-0 mt-1 text-center ">
            <CardDescription className="text-sm" >
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
                    <h3 className="ml-2 text-sm">{benefit}</h3>
                  </span>
                )
              )}
            </div>
            
          </CardFooter>
        </Card>

        {/* Club of the Week */}
        <Card className="lg:absolute flex flex-col items-center justify-center lg:top-[27.2rem] left-[-10rem] xl:left-[-8rem] w-[22rem] shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear animate-fade-in-scale">
          <CardHeader className="py-4">
              <CardTitle className="text-lg text-center">Discover Featured Clubs</CardTitle>
              <CardDescription className="mt-2 text-sm text-center">
                Check out some of the most exciting clubs on campus! Club of the Week, The Up and Comer and more!
              </CardDescription>
              <a href="#featured-clubs-section" className="flex justify-center">
                <Button variant={"secondary"} className="w-2/3">
                  Check it out!
                </Button>
              </a>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default HeroCards;