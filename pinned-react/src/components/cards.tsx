import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const Cards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/*Our Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10 dark:border-slate-800">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="src/components/shared/images/PinnedAppLogo.png"
            alt="user logo"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Our Team</CardTitle>
          <CardDescription className="font-normal text-primary">
            (UW Comp. Eng '27) <sup>4</sup>
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
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
      <Card className="absolute top-[75px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Our Features
          </CardTitle>
          <CardDescription>
            Create an account to gain full access to all we have to offer!
          </CardDescription>
        </CardHeader>
        
        <Link to="/sign-up">
            <CardContent>
                <Button className="w-full">Register</Button>
            </CardContent>
        </Link>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["Stay updated with events", "Find and join clubs", "Attract new members", "Personalized dashboard", "Connect with new people"].map(
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
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10 dark:border-slate-800">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
          </div>
          <div>
            {/* connect to backend to populate stats */}
            <CardTitle>30+ Clubs and 500+ Users</CardTitle>
            <CardDescription className="text-md mt-2">
              As UW's top club source, we have a wide variety of clubs for you to get involved with!
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};