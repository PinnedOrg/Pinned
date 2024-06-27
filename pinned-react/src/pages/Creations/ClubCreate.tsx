import { SignedOut, SignedIn } from '@clerk/clerk-react';
import RegisterClubForm from "@/components/clubs/RegisterClubForm";
import SignInPage from '../Auth/SignInPage';

const ClubCreate = () => {
  return (
    <div>
      <SignedOut>
        <SignInPage redirectTo={"/register"}/>
      </SignedOut>

      <SignedIn>
        <RegisterClubForm />
      </SignedIn>
    </div>
  );
};

export default ClubCreate;

