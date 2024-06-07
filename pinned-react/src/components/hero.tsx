import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { Cards } from "./cards.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        {/* replace with pinned phrase */}
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
          <span className="inline bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
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
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Your trusted source for clubs, events, and opportunities at the University of Waterloo!
        </p>
            
        {/* Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/clubhub">
                <Button className="w-full md:w-1/3">Browse Clubs!</Button>
            </Link>
            {/* choose either google form or seperate page for club creation */}
          <a
            rel="noreferrer noopener"
            href="" // add google form link to create a club page
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Create a Club
            <PlusCircledIcon className="ml-2 w-5 h-5" />
          </a>

          {/* <Link to="/clubsignin">
                <button
                    className={`w-full md:w-1/3 ${buttonVariants({
                    variant: "outline",
                    })}`}
                >
                    Create a Club
                    <PlusCircledIcon className="ml-2 w-5 h-5" />
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