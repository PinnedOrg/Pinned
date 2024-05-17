import { SignInButton, SignOutButton, SignUpButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"

/* ui components */
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuIndicator,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   NavigationMenuViewport,
 } from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"

const LandingPage = () => {
  
   // here we want a big search bar to directly seach for clubs, a button to take them to the directory page, and a sign-in/ sign-up button
  return (
     <div className='flex flex-center items-center justify-center'>
         <div>
            <Input className='bg-white'/>
         </div>
         <div> 
            <Link to="/directory">
               <div className='bg-primary p-2 text-white font-semibold text-xl rounded-lg hover:cursor-pointer'>
                  Club Hub
               </div>
            </Link>
         </div>
         <Button>
            <Link to="/directory">
               Sign In
            </Link>
         </Button>
         <SignInButton afterSignInUrl='/directory'/>
         <SignOutButton />
     </div>
  );
};

export default LandingPage;




{/* <div className="flex items-center w-screen pl-3 bg-gray-100 border-b border-black h-14 text-primary">
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
 ] <SignOutButton>
         <div  className='bg-primary p-2 text-white font-semibold text-xl rounded-lg hover:cursor-pointer'>
               Sign Out
            </div>
         </SignOutButton> 
</div> */}