import React from "react";
import {Link, Outlet} from 'react-router-dom'

const LandingPage = () => {
  const boardRoute = 123874612 //will be fetched from backend

  return (
     <div>
        <Link to={`/board:${boardRoute}`}>Go To Demo Board</Link>
        
        <Outlet />
     </div>
  );
}

export default LandingPage;