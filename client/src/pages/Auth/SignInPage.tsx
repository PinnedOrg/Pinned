import GradientBackground from "@/components/shared/gradientbackground"
import { SignIn } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom";

/*
Wherever all this page include this function in your component.
With imports for navigate = UseNavigate() and location = UseLocation() from react-router-dom
  const handleSignInClick = () => {
    navigate(routes.SignIn, { state: { from: location.pathname } });
  }
*/

const SignInPage = () => {
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  return (
    <section className="h-screen flex flex-center justify-center items-center">
        <GradientBackground />
        <SignIn redirectUrl={redirectTo} />
    </section>
  )
}

export default SignInPage
