import  Hero  from '@/components/landing page/hero';
import FeaturedClubs from '@/components/landing page/featuredclubs';

import Wrap  from '@/components/shared/wrap'; 
import GradientBackground from '@/components/shared/gradientbackground';
import InfoCards from '@/components/cards/InfoCards';

const LandingPage = () => {
  return (
      <section>
         {/* Background Shadow */}
         <GradientBackground />
         
         <div className='space-y-12 2xl:space-y-36'>
            <Hero />
            {/* <Affiliates /> */}
            <InfoCards />
            {/* <FeaturedClubs /> */}
            <Wrap />

         </div>
      </section>
   );
};

export default LandingPage;