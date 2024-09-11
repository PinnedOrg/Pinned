import GradientBackground from "@/components/shared/gradientbackground"
import { SignUp } from "@clerk/clerk-react"

const SignUpPage = () => {
  return (
    <div className="h-screen flex flex-center justify-center items-center">
        <GradientBackground />
        <SignUp redirectUrl={'/'} />
    </div>
  )
}

export default SignUpPage
