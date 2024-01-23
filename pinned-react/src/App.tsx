import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react"
import { BoardContextProvider } from '@/context/BoardContext';
import LandingPage from '@/pages/LandingPage/LandingPage'
import BoardHome from '@/pages/Board/BoardHome';
import GeneralPage from "@/pages/Board/GeneralPage";
import EventsPage from "@/pages/Board/EventsPage";
import CalendarPage from "@/pages/Board/CalendarPage";

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
