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
        <RegisterClubForm />
      </SignedIn>
    </div>
  );
};

export default ClubCreate;
