import GradientBackground from "@/components/shared/gradientbackground"
import { SignIn } from "@clerk/clerk-react"

const SignInPage = ({ redirectTo }: { redirectTo: string }) => {
  return (
    <section className="h-screen flex flex-center justify-center items-center">
        <GradientBackground />
        <SignIn afterSignInUrl={redirectTo || ""} />
    </section>
  )
}

export default SignInPage
