import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/lib/routes";
import { Toaster } from "./components/ui/toaster";

import RegisterClub from "@/pages/Creations/ClubCreate";
import ClubProfile from "@/pages/ClubProfile";
import AboutPage from "@/pages/AboutPage";
import PageDoesNotExistErrorMessage from "./components/error/PageDoesNotExistErrorMessage";
import LandingPage from '@/pages/LandingPage'
import SignUpPage from "@/pages/Auth/SignUpPage";
import SignInPage from "@/pages/Auth/SignInPage";
import ClubHub from "@/pages/ClubHub";
import Layout from "@/components/shared/Layout";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const App = () => {
  return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route index element={ <Layout> <LandingPage/> </Layout> } />
        <Route path={routes.ClubHub} element={ <Layout> <ClubHub/> </Layout> } />
        <Route path={routes.SignUp} element={ <Layout> <SignUpPage/>  </Layout>} />
        <Route path={routes.SignIn} element={ <Layout> <SignInPage/> </Layout> } />
        <Route path={routes.About} element={ <Layout> <AboutPage/> </Layout> } />
        <Route path={routes.PrivacyPolicy} element={ <Layout> <PrivacyPolicyPage/> </Layout> } />
        <Route path={routes.Register} element={ <Layout> <RegisterClub/> </Layout> } />
        <Route path={`${routes.ClubProfile}:clubId`} element={ <Layout> <ClubProfile/> </Layout> } />
        <Route path={"*"} element={ <Layout> <PageDoesNotExistErrorMessage/> </Layout>} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </div>
  );
}

export default App;
