import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from '@/pages/LandingPage'
import SignUpPage from "@/pages/Auth/SignUpPage";
import SignInPage from "@/pages/Auth/SignInPage";
import ClubHub from "@/pages/ClubHub";
import Layout from "@/components/shared/Layout";
import { routes } from "@/lib/routes";
import RegisterClub from "@/pages/Creations/ClubCreate";
import ClubProfile from "@/pages/ClubProfile";
import AboutPage from "@/pages/AboutPage";

const App = () => {
  return (
  <div>

  <BrowserRouter>
    <Routes>
      <Route index element={ <Layout> <LandingPage/> </Layout> } />
      <Route path={routes.ClubHub} element={ <Layout> <ClubHub/> </Layout> } />
      <Route path={routes.SignUp} element={ <SignUpPage/> } />
      <Route path={routes.SignIn} element={ <SignInPage redirectTo="" /> } />
      <Route path={routes.About} element={ <Layout> <AboutPage/> </Layout> } />
      <Route path={routes.Register} element={ <Layout> <RegisterClub/> </Layout> } />
      <Route path={routes.ClubProfile} element={ <Layout> <ClubProfile/> </Layout> } />
    </Routes>
  </BrowserRouter>
  
  </div>
  );
}

export default App;
