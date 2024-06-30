import { Link } from "react-router-dom";

import { routes } from "@/lib/routes";
import ViewportWrapper from "./ViewportWrapper";
import { Button } from "../ui/button";
import { ModeToggle } from "../context/mode-toggle";

import { FaHome } from "react-icons/fa";
// import { UserProfile } from "@clerk/clerk-react";

const LinkStyles = "px-3 py-2 font-medium text-sm uppercase tracking-wide dark:text-gray-200 dark:hover:text-gray-200"; // ending space is important for tailwindcss to work properly

const NavBar = () => {
  return (
    <header className="h-[4.5rem] py-3 px-9 flex justify-center sm:justify-between items-center z-10 bg-transparent">
      <ViewportWrapper breakpoint="large">
        <Link to={routes.Home} className="flex gap-[0.35rem] items-center">
          <h1 className="text-2xl font-bold uppercase text-accent-foreground">UW</h1>
          <h1 className="text-3xl font-bold text-transparent uppercase bg-gradient-to-r to-primary from-secondary bg-clip-text">Pinned</h1>
        </Link>
      </ViewportWrapper>

      <nav className="inline-flex -mr-6">
        <div className="flex items-center gap-6">
        {/* Add all mobile routes here. Will need a drawer moving forward */}
          <ViewportWrapper breakpoint="mobile">
            <Link to={routes.Home} className="">
              <FaHome className="text-lg font-bold"/>
            </Link>
          </ViewportWrapper>
          <Button variant='ghost' className={LinkStyles}>
            <Link to={routes.ClubHub} >Club Hub</Link>
          </Button>
          <Button variant='ghost' className={LinkStyles}>
            <Link to={routes.Register} >Register</Link>
          </Button>
          <Button variant='secondary' className={LinkStyles + " font-semibold focus:bg-secondary"}>
            <Link to={routes.SignIn} >Sign In</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
