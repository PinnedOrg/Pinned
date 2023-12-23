import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BoardContextProvider } from './context/BoardContext.js';
import LandingPage from './pages/LandingPage/LandingPage.js'
import BoardHome from './pages/Board/BoardHome.js';
import GeneralPage from "./pages/Board/GeneralPage.js";
import EventsPage from "./pages/Board/EventsPage.js";
import CalendarPage from "./pages/Board/CalendarPage.js";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />

        <Route 
          path="/board/:id/*" 
          element={
            <BoardContextProvider>
              <Routes>
                <Route index element={<BoardHome />} />
                <Route path="general" element={<GeneralPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
              </Routes>
            </BoardContextProvider>
          }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
