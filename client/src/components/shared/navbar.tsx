import { Link } from "react-router-dom";
import { routes } from "@/lib/routes";
import ViewportWrapper from "./ViewportWrapper";
import { Button } from "../ui/button";
import { ModeToggle } from "../context/mode-toggle";
import { FaHome } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import AuthModal from "../modals/AuthModal";

const LinkStyles = "px-3 py-2 font-medium text-sm uppercase tracking-wide dark:text-gray-200 dark:hover:text-gray-200"; // ending space is important for tailwindcss to work properly

const NavBar = () => {
  const handleRedirect = () => {
    window.location.href = 'https://forms.gle/xzCQC2fjvGyAEtbz5';
  };

  return (
    <header className="h-[4.5rem] py-3 px-4 sm:px-9 flex justify-between items-center z-10 bg-transparent">
      <ViewportWrapper breakpoint="large">
        <Link to={routes.Home} className="flex gap-1 sm:gap-[0.35rem] items-center">
          <h1 className="text-lg font-bold uppercase sm:text-2xl text-accent-foreground">UW</h1>
          <h1 className="text-xl font-bold text-transparent uppercase sm:text-3xl bg-gradient-to-r to-primary from-secondary bg-clip-text">
            Pinned
          </h1>
        </Link>
      </ViewportWrapper>

      <nav className="inline-flex mr-0">
        <div className="flex items-center gap-4 sm:gap-6 justify-evenly">
          <ViewportWrapper breakpoint="mobile">
            <Link to={routes.Home} className="p-2">
              <FaHome className="text-lg font-bold"/>
            </Link>
          </ViewportWrapper>

          <Button variant="ghost" className={LinkStyles}>
            <Link to={routes.ClubHub}>Club Hub</Link>
          </Button>

          <Button variant="ghost" className={LinkStyles}>
              <div onClick={handleRedirect}>Register</div>
          </Button>

          <SignedIn>
            <UserButton afterSignOutUrl={routes.Home}/>
          </SignedIn>
          <SignedOut>
            <AuthModal>
              <Button 
                variant="secondary" 
                className="px-3 py-2 text-sm font-semibold tracking-wide text-white uppercase hover:bg-secondary-hover"
              >
                Sign In
              </Button>
            </AuthModal>
          </SignedOut>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
