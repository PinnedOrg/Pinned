import { SignIn } from "@clerk/clerk-react"


const SignInPage = () => {
  return (
    <section className="h-screen flex border bg-actionOrange flex-center justify-center items-center">
        <SignIn />
    </section>
  )
}

export default SignInPage
