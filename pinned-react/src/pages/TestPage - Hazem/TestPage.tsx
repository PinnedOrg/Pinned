import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ClubForm } from "@/components/clubpage/ClubForm";

const TestPage = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-[30vh] rounded-lg overflow-hidden">
      <img src="https://cdn.evbstatic.com/s3-build/fe/build/images/2e27983556c064883a94ddb9bffafcc2-toronto_desktop.webp" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent flex flex-col justify-center px-8 text-white">
          <h1 className="text-4xl">Best Club to Join</h1>
          <p className="mt-2 text-sm">
            Join our amazing club and be a part of a vibrant community. Enjoy exclusive events, make new friends, and have a great time!
          </p>
          <div className="flex space-x-4 mt-4">
            <Avatar>
              <AvatarImage src="path-to-facebook-icon.png" alt="Facebook" /> 
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="path-to-instagram-icon.png" alt="Instagram" /> 
              <AvatarFallback>IG</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="path-to-email-icon.png" alt="Email" />
              <AvatarFallback>Email</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="path-to-website-icon.png" alt="Website" />
              <AvatarFallback>Web</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="p-8 grid grid-cols-3 gap-4">
        <div className="col-span-2">
        </div>
        <div className="col-span-1">
          <ClubForm />
        </div>
      </div>

    </div>
  );
}

export default TestPage;
