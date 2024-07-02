import { SignIn } from "@clerk/clerk-react"

const SignInPage = ({ redirectTo }: { redirectTo: string }) => {
  return (
    <section className="h-screen flex border bg-primary flex-center justify-center items-center">
        <SignIn afterSignInUrl={redirectTo || ""} />
    </section>
  )
}

export default SignInPage
