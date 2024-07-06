import  Hero  from '@/components/landing page/hero';
import FeaturedClubs from '@/components/landing page/featuredclubs';

import Wrap  from '@/components/shared/wrap'; 
import GradientBackground from '@/components/shared/gradientbackground';
import HeroCards from '@/components/cards/HeroCards';

const LandingPage = () => {
  return (
      <section>
         {/* Background Shadow */}
         <GradientBackground />
         
         <div className='space-y-12 2xl:space-y-56'>
            <Hero />
            {/* <Affiliates /> */}
            <HeroCards />
            {/* <FeaturedClubs /> */}
            <Wrap />

         </div>
      </section>
   );
};

export default LandingPage;