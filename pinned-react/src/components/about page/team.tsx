import { team } from "@/lib/data";
import { AboutCardType } from "@/lib/types";
import AboutCard from "@/components/cards/AboutCard";
const OurTeam = () => {
  return (
    <section className="container flex flex-wrap justify-center animate-fade-in-up">
      <h1 className="w-full text-3xl font-bold text-center">Our Team</h1>
      <div className="container grid mt-6 gap-y-6 gap-x-8 md:gap-x-10 md:grid-cols-2 xl:grid-cols-3">
        {
            team.map((member: AboutCardType) => (
                <AboutCard {...member} key={member.name}/>
            ))
        }
      </div>
    </section>
  )
}

export default OurTeam;
