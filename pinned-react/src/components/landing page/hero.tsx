import { Button } from "@/components/ui/button";
import  HeroCards from "@/components/cards/HeroCards";
import { routes } from "@/lib/routes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="container grid gap-10 pt-16 pb-20 lg:grid-cols-2 place-items-center md:pb-32">
      <div className="z-10 space-y-6 text-center lg:text-start">
        {/* replace with pinned phrase */}
        <main className="text-5xl font-bold md:text-6xl">
          <h1 className="inline">
          <span className="inline text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text">
            </span>{" "}
              Pinned
          for{" "}
            <span className="inline bg-gradient-to-tr from-[#eaab00] to-[#e9d100]  text-transparent bg-clip-text">
              UWaterloo
            </span>
          </h1>
          
        </main>

        {/* replace with our mission statement */}
        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
            Your trusted source for getting involved and connecting with others at the University of Waterloo!
        </p>
            
        {/* Buttons */}
        <div className="justify-center gap-5 space-y-4 md:space-y-0 md:space-x-4">
            <Link to={routes.ClubHub}>
                <Button variant={"secondary"} className="px-8 ">Browse Clubs!</Button>
            </Link>
            <Link to={routes.Register}>
              <Button variant={"ghost"}>
                Register a Club
                <PlusCircledIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
        </div>
      </div>

      {/* sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};

export default Hero;
