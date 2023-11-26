import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.js';
import BoardHome from './pages/Board/BoardHome.js';
import GeneralPage from './pages/Board/GeneralPage.js';
import EventsPage from './pages/Board/EventsPage.js';

function App() {
  const boardRoute = 123874612; // will be fetched from backend

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path={`board/:${boardRoute}`} element={<BoardHome />} />
        <Route path={`/board/:${boardRoute}/general`} element={<GeneralPage />} />
        <Route path={`/board/:${boardRoute}/events`} element={<EventsPage />} />
        <Route path={`/board/:${boardRoute}/calendar`} element={<div>Calendar</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
