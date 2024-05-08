//  https://clerk.com/docs/references/react/add-react-router

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { SignedOut, SignedIn } from "@clerk/clerk-react"

import { BoardContextProvider } from '@/context/BoardContext';

import LandingPage from '@/pages/LandingPage/LandingPage'
import BoardHome from '@/pages/Board/BoardHome';
import GeneralPage from "@/pages/Board/GeneralPage";
import EventsPage from "@/pages/Board/EventsPage";
import CalendarPage from "@/pages/Board/CalendarPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUpPage from "./pages/Auth/SignUpPage";
import SignInPage from "./pages/Auth/SignInPage";
import Directory from "./pages/Directory/Directory";

const App = () => {

  return (
  <div>

  <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage/>} />
      <Route path="directory" element={<Directory/>} />
      <Route path="sign-up" element={<SignUpPage/>} />
      <Route path="sign-in" element={<SignInPage/>} />

      <Route 
        path="/board/:id/*" 
        element={
          <BoardContextProvider>
            <Route index element={<BoardHome />} />
            <Route path="general" element={<GeneralPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
          </BoardContextProvider>
        }>
      </Route>
      {/* <SignedOut>
        <p>This content is public. Only signed out users can see this.</p>
      </SignedOut> */}

      <Route path="dashboard" element={
          <Dashboard/>
      }/>
    </Routes>
  </BrowserRouter>
  
  </div>
  );
}

export default App;
