import React from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage.js'
import BoardHome from './pages/Board/BoardHome.js';
import GeneralPage from './pages/Board/GeneralPage.js';
import EventsPage from './pages/Board/EventsPage.js';


function App() {
  const boardRoute = 123874612 //will be fetched from backend


  return (
    <BrowserRouter>
      <div className="flex items-center w-screen pl-3 bg-gray-100 border-b border-black h-14">
        <h1 className="text-3xl font-bold">
            <Link to="/">
              Pinned
            </Link>
        </h1>
      </div>
      <Routes>
        <Route index path="/" element={<LandingPage/>}/>    
        <Route /*path="/BoardDemo:id"*/ path={`/board:${boardRoute}`} element={<BoardHome />} id={boardRoute} >
          <Route path='general' element={<GeneralPage/>}/>
          <Route path='events' element={<EventsPage />} />
          <Route path='calendar' element/>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
