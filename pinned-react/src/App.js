import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage.js'
import BoardHome from './pages/Board/BoardHome.js';
import GeneralPage from "./pages/Board/GeneralPage.js";
import EventsPage from "./pages/Board/EventsPage.js";
import CalendarPage from "./pages/CalendarPage.js";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />

        <Route path="/board/:id">
          <Route index element={<BoardHome />}/> {/* <------- This line right here fixes the nested route rendering issue */}
          <Route path="general" element={<GeneralPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
