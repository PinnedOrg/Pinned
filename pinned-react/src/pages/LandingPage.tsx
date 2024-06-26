import  Hero  from '@/components/landing page/hero';
import  Affiliates  from '@/components/landing page/affiliates';
import  About  from '@/components/landing page/about'; 
import Wrap  from '@/components/shared/wrap'; 
import OurTeam from '@/components/landing page/team';

const LandingPage = () => {
  return (
      <section className='space-y-9'>
         {/* Background Shadow */}
         <div className='fixed w-full h-screen bg-gradient-to-b from-background to-primary-background -z-10'></div>
         
         <Hero />
         <Affiliates />
         <About />
         <OurTeam />
         <Wrap />
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