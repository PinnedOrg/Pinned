import  Hero  from '@/components/landing page/hero';
import FeaturedClubs from '@/components/landing page/featuredclubs';

import Wrap  from '@/components/shared/wrap'; 
import GradientBackground from '@/components/shared/gradientbackground';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
      <section>
         {/* Background Shadow */}
         <GradientBackground />
         
         <div className='space-y-10 lg:space-y-36'>
            <Hero />
            {/* <Affiliates /> */}
            <FeaturedClubs />
            <section className="py-10 lg:pt-0">
               <h1 className='mb-4 mx-4 text-2xl font-bold text-center lg:text-3xl text-accent-foreground'>We have lots of plans for the future of this platform</h1>
               <a 
                  target='_blank'
                  href='https://docs.google.com/document/d/1BvTQLufhOuK6_oevA_ZS4WpufMFcMFCeksfXDQSDrnM/edit'
                  className='flex justify-center'
               >
               <Button variant={'secondary'} size={'lg'} className='transition-all hover:scale-105'>
                  Check out our roadmap!
               </Button>
               </a>

            </section>
            <div data-tf-live="01J8DJKHFXY270SRHRGB45K2YM"></div>
            <script src="//embed.typeform.com/next/embed.js"></script>
            <Wrap />

         </div>
      </section>
   );
};

export default LandingPage;

{/* <div className="flex items-center w-screen pl-3 bg-gray-100 border-b border-black h-14 text-primary">
            <h1 className="text-3xl font-bold">
                  <Link to="/"> Pinned </Link>
            </h1>
         </div>

         <div className='flex gap-3 p-2'>
         <SignInButton 
            afterSignInUrl='/dashboard'
            redirectUrl='/sign-in'
         >
            <div className='p-2 text-xl font-semibold text-white rounded-lg bg-primary hover:cursor-pointer'>
               Sign In
            </div>
         </SignInButton>
         <SignUpButton 
            afterSignInUrl='/dashboard'
            redirectUrl='/sign-up'
         >
            <div  className='p-2 text-xl font-semibold text-white rounded-lg bg-primary hover:cursor-pointer'>
               Sign Up
            </div>
         </SignUpButton> 
 ] <SignOutButton>
         <div  className='p-2 text-xl font-semibold text-white rounded-lg bg-primary hover:cursor-pointer'>
               Sign Out
            </div>
         </SignOutButton> 
</div> */}