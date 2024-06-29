import { team } from "@/lib/data";
import { AboutCardType } from "@/lib/types";
import AboutCard from "@/components/cards/AboutCard";
const OurTeam = () => {
  return (
    <section className="container flex flex-wrap justify-center">
      <h1 className="w-full text-3xl font-bold text-center">Our Team</h1>
      <div className="grid gap-8 mt-6 md:gap-10 xl:gap-6 md:grid-cols-2 xl:grid-cols-4">
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
