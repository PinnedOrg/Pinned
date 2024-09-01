import { useEffect } from 'react';
import { SignedOut, SignedIn } from '@clerk/clerk-react';
import RegisterClubForm from "@/components/clubs/RegisterClubForm";
import SignInPage from '../Auth/SignInPage';
import { routes } from '@/lib/routes';

const ClubCreate = () => {
  return (
    <div>
      <SignedOut>
        <SignInPage redirectTo={routes.Register}/>
      </SignedOut>

      <SignedIn>
        <RedirectIfSignedIn />
        {/* <RegisterClubForm /> We can change this once we have a fully flushed out register club page*/}
      </SignedIn>
    </div>
  );
};

// This component handles the redirection logic
const RedirectIfSignedIn = () => {
  useEffect(() => {
    window.location.href = 'https://forms.gle/xzCQC2fjvGyAEtbz5';
  }, []);

  return null;
};

export default ClubCreate;
