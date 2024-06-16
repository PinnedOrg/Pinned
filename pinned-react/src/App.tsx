//  https://clerk.com/docs/references/react/add-react-router

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from '@/pages/LandingPage'
import SignUpPage from "@/pages/Auth/SignUpPage";
import SignInPage from "@/pages/Auth/SignInPage";
import ClubHub from "@/pages/ClubHub";
import Layout from "@/components/shared/Layout";

import { routes } from "@/routes/routes";
import EventCreate from "./pages/Creations/EventCreate";
import ClubCreate from "./pages/Creations/ClubCreate";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Layout>
                                <LandingPage/>
                                </Layout> } />
          <Route path={routes.ClubHub} element={ <Layout>
                                                  <ClubHub/>
                                                </Layout> } />
          <Route path={routes.SignUp} element={ <SignUpPage/> } />
          <Route path={routes.SignIn} element={ <SignInPage/> } />
          <Route path={routes.ClubProfile} element={ <Layout>
                                                <ClubProfile/>
                                                </Layout> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
