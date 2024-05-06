
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'

const LandingPage = () => {
  

  return (
     <section>
         <div className="flex items-center w-screen pl-3 bg-gray-100 border-b border-black h-14 text-primary">
            <h1 className="text-3xl font-bold">
                  <Link to="/"> Pinned </Link>
            </h1>
         </div>

         <div className='gap-3 p-2 flex'>
         <SignInButton 
            afterSignInUrl='/dashboard'
            redirectUrl='/sign-in'
         >
            <div className='bg-primary p-2 text-white font-semibold text-xl rounded-lg hover:cursor-pointer'>
               Sign In
            </div>
         </SignInButton>
         <SignUpButton 
            afterSignInUrl='/dashboard'
            redirectUrl='/sign-up'
         >
            <div  className='bg-primary p-2 text-white font-semibold text-xl rounded-lg hover:cursor-pointer'>
               Sign Up
            </div>
         </SignUpButton>
         {/* <SignOutButton>
         <div  className='bg-primary p-2 text-white font-semibold text-xl rounded-lg hover:cursor-pointer'>
               Sign Out
            </div>
         </SignOutButton> */}
         </div>
     </section>
  );
};

export default LandingPage;