//  https://clerk.com/docs/references/react/add-react-router

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { SignedOut, SignedIn } from "@clerk/clerk-react"

// import { BoardContextProvider } from '@/context/BoardContext';

import LandingPage from '@/pages/LandingPage/LandingPage'
import SignUpPage from "@/pages/Auth/SignUpPage";
import SignInPage from "@/pages/Auth/SignInPage";
import ClubHub from "@/pages/ClubHub/ClubHub";
import Layout from "@/components/shared/Layout";

import { routes } from "@/routes/routes";
import EventCreate from "./pages/Creations/EventCreate";
import ClubCreate from "./pages/Creations/ClubCreate";

const App = () => {

  return (
  <div>

  <BrowserRouter>
    <Routes>
      <Route index element={ <Layout> <LandingPage/> </Layout> } />
      <Route path={routes.ClubHub} element={ <Layout> <ClubHub/> </Layout> } />
      <Route path={routes.SignUp} element={ <SignUpPage/> } />
      <Route path={routes.SignIn} element={ <SignInPage/> } />
      <Route path={routes.EventCreate} element={ <Layout> <EventCreate/> </Layout> } />
      <Route path={routes.ClubCreate} element={ <Layout> <ClubCreate/> </Layout> } />

      {/* <Route 
        path="/board/:id/*" 
        element={
          // <BoardContextProvider>
          //   <Route index element={<BoardHome />} />
          //   <Route path="general" element={<GeneralPage />} />
          //   <Route path="events" element={<EventsPage />} />
          //   <Route path="calendar" element={<CalendarPage />} />
          // </BoardContextProvider>
        }>
      </Route> */}
      {/* <SignedOut>
        <p>This content is public. Only signed out users can see this.</p>
      </SignedOut> */}

      {/* <Route path="dashboard" element={
          <Dashboard/>
      }/> */}
    </Routes>
  </BrowserRouter>
  
  </div>
  );
}

export default App;
