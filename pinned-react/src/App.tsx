//  https://clerk.com/docs/references/react/add-react-router

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { SignedOut, SignedIn } from "@clerk/clerk-react"

// import { BoardContextProvider } from '@/context/BoardContext';

import LandingPage from '@/pages/LandingPage/LandingPage'
import SignUpPage from "@/pages/Auth/SignUpPage";
import SignInPage from "@/pages/Auth/SignInPage";
import ClubHub from "@/pages/ClubHub/ClubHub";
import Layout from "@/pages/Shared/Layout";

import { routes } from "@/routes/routes";

const App = () => {

  return (
  <div>

  <BrowserRouter>
    <Routes>
      <Route index element={ <LandingPage/> } />
      <Route path={routes.ClubHub} element={ <Layout>
                                        <ClubHub/>
                                      </Layout> } />
      <Route path={routes.SignUp} element={ <SignUpPage/> } />
      <Route path={routes.SignIn} element={ <SignInPage/> } />

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
