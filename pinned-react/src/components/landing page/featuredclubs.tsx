import { 
  Carousel, 
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AboutCardType, IClub } from "@/lib/types";
import { testClubData } from "@/lib/data";
import AboutCard from "../cards/AboutCard";
import ClubPreviewCard from "../cards/ClubPreviewCard";


const FeaturedClubs = () => {
  const ClubOfTheWeekId = "667cb486bc94145d7cf2b468";
  const upcomingClubId = "664c08955c58341b46c62acc";


  return (
    <section className="container flex flex-wrap justify-center gap-y-10" id="featured-clubs-section">
      <h1 className="w-full text-2xl font-bold text-center lg:text-3xl">Featured Clubs</h1>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="relative">
        <ClubPreviewCard club={testClubData[0]} />
        <div className="absolute rotate-[-30deg] bg-[#FFD700] shadow-sm px-2 py-1 rounded-md top-0 left-[-2rem]  ">
          Club of the Week
        </div>
        </div>
        <div>
        <ClubPreviewCard club={testClubData[1]} />
        
        </div>
      </div>  

    </section>
  )
}

export default FeaturedClubs;

{/* <Carousel 
  className="w-full max-w-5xl"

  opts={{
    active: true,
    interval: 1000,
    autoplay: true,
    loop: true,
    animationSpeed: 300,
    showIndicators: true,
    showControls: true,
    pauseOnHover: true,
    swipe: true,
    keyboard: true,
    drag: false,
    mousewheel: false,
    touch: true,
  }}
>
  <CarouselContent>
    {testClubData.map((club: IClub) => (
      <CarouselItem className="basis-1/3">
        <ClubPreviewCard club={club} />
      </CarouselItem>
      ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>  */}