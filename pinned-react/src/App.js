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
      <Routes>
        <Route index path="/" element={<LandingPage/>}/>    
        <Route path={`board:${boardRoute}`} element={<BoardHome />}> 
          <Route path='general' element={<GeneralPage/>}/>
          <Route id='eventroute' path='events' element={<EventsPage />} />
          <Route path='calendar' element/>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
