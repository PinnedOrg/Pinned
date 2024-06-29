import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { clubUses, userUses } from "@/lib/data";

import { Check, View } from "lucide-react";
import ViewPortWrapper from "@/components/shared/ViewportWrapper";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { routes } from "@/lib/routes";

const HeroCards = () => {
  return (
    <div>
      <ViewPortWrapper breakpoint="large" >
        <div className=" relative w-[700px] h-[500px]">
          {/* Features */}
          <Card className="absolute flex flex-col items-center justify-center top-10 left-2 w-[16.5rem] shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear">
            <CardHeader className="flex items-center justify-center pb-0 mt-6">
              <img
                src="https://avatar.iran.liara.run/public/33"
                alt="user logo"
                className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              />
              <CardTitle className="text-lg text-center">
                For those who want to get involved...
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-0 text-center">
              <CardDescription className="text-xs" >
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
          <Card className="absolute left-[20rem] top-[7.5rem] w-[16.5rem] flex flex-col items-center justify-center shadow-xl shadow-black/20 dark:shadow-black/50 border-none hover:scale-105 transition-all ease-linear">
            <CardHeader className="flex items-center justify-center pb-0 mt-6">
              <img
                src="https://avatar.iran.liara.run/public/68"
                alt="user logo"
                className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              />
              <CardTitle className="text-lg text-center">
                ... And for those looking to expand
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-0 text-center">
              <CardDescription className="text-xs" >
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

          

          {/* Service */}
          <Card className="absolute w-[20rem] bottom-[-6rem] left-[-4rem]  drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-none">
            <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
              <div className="p-1 mt-1 bg-primary/20 rounded-2xl">
              </div>
              <div>
                <CardTitle>30+ Clubs and 500+ Users</CardTitle>
                <CardDescription className="mt-2 text-md">
                  As UW's top club source, we have a wide variety of clubs for you to get involved with!
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </ViewPortWrapper>
      <ViewPortWrapper breakpoint="mobile">
        <div>
        </div>
      </ViewPortWrapper>
    </div>
  );
};

export default HeroCards;