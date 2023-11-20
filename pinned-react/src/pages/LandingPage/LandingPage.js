import React from "react";
import {Link, Outlet} from 'react-router-dom'

const LandingPage = () => {
  const boardRoute = 123874612 //will be fetched from backend

  return (
     <div>
         <div className="flex items-center w-screen pl-3 bg-gray-100 border-b border-black h-14 text-actionOrange">
            <h1 className="text-3xl font-bold">
                  <Link to="/">
                  Pinned
                  </Link>
            </h1>
         </div>
        <Link to={`/board:${boardRoute}`}>Go To Demo Board</Link>
        
        <Outlet />
     </div>
  );
}

export default LandingPage;