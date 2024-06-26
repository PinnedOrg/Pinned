import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { uses } from "@/lib/data";

import { Check } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { routes } from "@/lib/routes";

const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/*Our Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-none">
        <CardHeader className="flex items-center justify-center pb-2 mt-8">
          <img
            src="/images/logos/PinnedAppLogo.png"
            alt="user logo"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Our Team</CardTitle>
          <CardDescription className="font-normal text-primary">
            (UW Comp. Eng '27) <sup>4</sup>
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-center">
          <p>
            Our team consists of 4 passionate students who are dedicated to improving the UW club experience.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/PinnedOrg/Pinned"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Features */}
      <Card className="absolute top-[75px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-none">
        <CardHeader>
          <CardTitle className="flex justify-between item-center">
            Our Features
          </CardTitle>
          <CardDescription>
            Create an account to gain full access to all we have to offer!
          </CardDescription>
        </CardHeader>
        
        <Link to={routes.SignUp}>
            <CardContent>
                <Button className="w-full">Sign Up</Button>
            </CardContent>
        </Link>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {uses.map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-none">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="p-1 mt-1 bg-primary/20 rounded-2xl">
          </div>
          <div>
            {/* connect to backend to populate stats */}
            <CardTitle>30+ Clubs and 500+ Users</CardTitle>
            <CardDescription className="mt-2 text-md">
              As UW's top club source, we have a wide variety of clubs for you to get involved with!
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default HeroCards;