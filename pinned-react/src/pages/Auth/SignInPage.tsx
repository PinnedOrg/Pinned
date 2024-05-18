import { SignIn } from "@clerk/clerk-react"


const SignInPage = () => {
  return (
    <section className="h-screen flex border bg-primary flex-center justify-center items-center">
        <SignIn />
    </section>
  )
}

export default SignInPage
