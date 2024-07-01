import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import  Cards from "./Cards/HeroCards.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="container grid gap-10 py-20 lg:grid-cols-2 place-items-center md:py-32">
      <div className="space-y-6 text-center lg:text-start">
        {/* replace with pinned phrase */}
        <main className="text-5xl font-bold md:text-6xl">
          <h1 className="inline">
          <span className="inline text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text">
              Pinned
            </span>{" "}
            ClubHub
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#FAE100] to-[#EAAB00] text-transparent bg-clip-text">
              UWaterloo
            </span>{" "}
            students
          </h2>
        </main>

        {/* replace with our mission statement */}
        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
            Your trusted source for clubs, events, and opportunities at the University of Waterloo!
        </p>
            
        {/* Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/clubhub">
                <Button className="w-full md:w-1/3">Browse Clubs!</Button>
            </Link>
            {/* choose either google form or seperate page for club creation */}
            <Link to="/register">
              <Button className={`w-full md:w-1/3 ${buttonVariants({ variant: "outline" })}`}>
              Create a Club
                <PlusCircledIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>

          {/* <Link to="/clubsignin">
                <button
                    className={`w-full md:w-1/3 ${buttonVariants({
                    variant: "outline",
                    })}`}
                >
                    Create a Club
                    <PlusCircledIcon className="w-5 h-5 ml-2" />
                </button>
            </Link> */}
        </div>
      </div>

      {/* cards sections */}
      <div className="z-10">
        <Cards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};

export default Hero;
