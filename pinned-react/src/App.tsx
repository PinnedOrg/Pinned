//  https://clerk.com/docs/references/react/add-react-router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react"

import { BoardContextProvider } from '@/context/BoardContext';

import LandingPage from '@/pages/LandingPage/LandingPage'
import BoardHome from '@/pages/Board/BoardHome';
import GeneralPage from "@/pages/Board/GeneralPage";
import EventsPage from "@/pages/Board/EventsPage";
import CalendarPage from "@/pages/Board/CalendarPage";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {

  return (
  <div>

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
      <SignedOut>
        <p>This content is public. Only signed out users can see this.</p>
      </SignedOut>
      <SignedIn>
        <p>This content is private. Only signed in users can see this.</p>
        <Route path="dashboard" element={<Dashboard/>}/>
      </SignedIn>
    </Routes>
  </BrowserRouter>
  
  </div>
  );
}

export default App;
