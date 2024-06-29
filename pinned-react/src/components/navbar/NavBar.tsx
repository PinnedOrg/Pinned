import { Link } from "react-router-dom";

import { routes } from "@/lib/routes";
import ViewportWrapper from "../shared/ViewportWrapper";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const LinkStyles = "px-3 py-2 font-medium text-sm uppercase tracking-wide dark:text-gray-200 dark:hover:text-gray-200 dark:hover:bg-gray-800"; // ending space is important for tailwindcss to work properly

const NavBar = () => {
  return (
    <header className="h-[4.5rem] w-100% py-3 px-9 flex shadow-sm shadow-primary justify-center sm:justify-between items-center z-10  dark:bg-slate-950">
      <ViewportWrapper breakpoint="large">
        <Link to={routes.Home} className="flex gap-[0.35rem] items-center">
          <h1 className="text-2xl font-bold uppercase dark:text-gray-200">UW</h1>
          <h1 className="text-3xl font-bold text-transparent uppercase bg-gradient-to-r to-primary from-secondary bg-clip-text">Pinned</h1>
        </Link>
      </ViewportWrapper>
      {/* <ViewportWrapper breakpoint="mobile">
        <Link to={routes.Home} className="">
          <img src="@/public/images/PinnedAppLogo.png" alt="Pinned Logo" />
        </Link>
      </ViewportWrapper> */}

      <nav className="inline-flex gap-12 ">
        <div className="flex items-center gap-2">
          <Button variant='ghost' className={LinkStyles}>
            <Link to={routes.ClubHub} >Club Hub</Link>
          </Button>
          <Button variant='ghost' className={LinkStyles}>
            <Link to={routes.Register} >Register</Link>
          </Button>
        </div>
        <SignedIn>
          <UserButton /> 
        </SignedIn>
        <SignedOut>
          <Button variant='secondary' className={LinkStyles + " text-white font-semibold hover:bg-secondary-hover"}>
            <Link to={routes.SignIn} >Sign In</Link>
          </Button>
        </SignedOut>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default NavBar;
