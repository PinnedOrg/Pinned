import { Link } from "react-router-dom";

import { routes } from "@/routes/routes";
// import { UserProfile } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <header className="h-[4rem] w-100% py-3 px-9 flex shadow-sm shadow-primary justify-between items-center">
      <Link to={routes.Home} className="flex gap-[0.35rem] items-center">
        <h1 className="text-black font-semibold uppercase text-2xl">UW</h1>
        <h1 className="text-primary font-bold uppercase text-3xl">Pinned</h1>
      </Link>

      <nav className="inline-flex gap-12 ">
        <div className="flex gap-2 items-center">
          <Link to={routes.ClubHub} className="text-black rounded-md px-3 py-2 font-medium uppercase hover:bg-black/10  ">
            Club Hub
          </Link>
          <Link to={routes.Register} className="text-black rounded-md px-3 py-2 font-medium uppercase hover:bg-black/10  ">
            Register
          </Link>
        </div>
        <Link to={routes.SignIn} className="text-white bg-primary rounded-md px-3 py-2 font-semibold uppercase hover:bg-primary-hover">
          Sign In
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
