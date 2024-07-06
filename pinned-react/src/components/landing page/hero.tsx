import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { testClubData } from "@/lib/data";
import ClubPreviewCard from "@/components/cards/ClubPreviewCard";
import { IClub } from "@/lib/types";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";

const Hero = () => {
  // Carousel docs: https://www.embla-carousel.com/plugins/autoplay/
  const carouselPlugin = useRef(Autoplay({
    delay: 6000,
    stopOnMouseEnter: true,
  }))


  return (
    <section className="container flex flex-wrap justify-center pb-20 mt-20 gap-y-20 lg:mt-4 md:pb-32">
      <div className="z-10 w-full space-y-6 text-center lg:w-7/12 lg:text-start lg:pl-4">
        {/* replace with pinned phrase */}
        <main className="pr-3 text-5xl font-bold md:text-6xl lg:mt-40 animate-fade-in-up">
          <h1>
              Pinned for{" "}
            <span className="bg-gradient-to-tr from-[#eaab00] to-[#e9d100]  text-transparent bg-clip-text">
              UWaterloo
            </span>
          </h1>
          
        </main>

        {/* replace with our mission statement */}
        <p className="mx-auto text-xl w-fit text-muted-foreground md:w-10/12 lg:mx-0 animate-fade-in-up">
            Your trusted source for getting involved and connecting with others at the University of Waterloo!
        </p>
            
        {/* Buttons */}
        <div className="justify-center gap-5 space-y-4 md:space-y-0 md:space-x-4 animate-fade-in-up">
            <Link to={routes.ClubHub}>
                <Button variant={"secondary"} className="px-8 ">Browse Clubs!</Button>
            </Link>
            <Link to={routes.About}>
              <Button variant={"ghost"}>
                Learn More
                {/* <PlusCircledIcon className="w-5 h-5 ml-2" /> */}
              </Button>
            </Link>
        </div>
      </div>

      <div className="flex justify-start pl-4 mt-12 lg:w-5/12 animate-fade-in-scale">
        <Carousel 
          opts={{
            active: true,
            loop: true,
          }}
          plugins={[carouselPlugin.current]}
          onMouseLeave={() => carouselPlugin.current?.play()}
          className="max-w-sm"
        >
          <CarouselContent>
              <CarouselItem className="p-6 sha">
                <ClubPreviewCard club={testClubData[0]} featureText="Club of the Week"/>
              </CarouselItem>
              <CarouselItem className="py-6">
                <ClubPreviewCard club={testClubData[1]} featureText="The Up'n Comer"/>
              </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      

      {/* Shadow effect */}
      {/* <div className="shadow"></div> */}
    </section>
  );
};

export default Hero;
