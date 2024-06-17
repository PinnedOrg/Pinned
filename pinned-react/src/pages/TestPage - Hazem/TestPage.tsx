import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ClubForm } from "@/components/clubpage/ClubForm";
import { ClubEvent } from "@/components/clubpage/ClubEvent";
import { FAQAccordion } from "@/components/clubpage/FAQAccordion";
import { InstagramEmbed } from 'react-social-media-embed';

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
        <div className="col-span-2 mt-4 px-4 flex flex-wrap gap-4">
          <ClubEvent 
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkZ6g42MpLvGsAntEa-0keBi52LBsX8Y_Cw&s" 
              title="sodfjsoifdj sdfsdofn" 
              description="sdofu souvndbd ovdo dso di dfih ix ix ix ix vi vsi vis visbv hidvhdlh." 
            />
          <ClubEvent 
            imageUrl="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699" 
            title="sodfjsoifdj sdfsdofn" 
            description="sdofu souvndbd ovdo dso di dfih ix ix ix ix vi vsi vis visbv hidvhdlh." 
          />
          <ClubEvent 
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg" 
            title="sodfjsoifdj sdfsdofn" 
            description="sdofu souvndbd ovdo dso di dfih ix ix ix ix vi vsi vis visbv hidvhdlh." 
          />
                  <ClubEvent 
            imageUrl="https://uwaterloo.ca/electrical-computer-engineering/sites/default/files/styles/large/public/uploads/images/harder_douglas.jpg?itok=OPtGC5j-" 
            title="sodfjsoifdj sdfsdofn" 
            description="sdofu souvndbd ovdo dso di dfih ix ix ix ix vi vsi vis visbv hidvhdlh." 
          />
          <ClubEvent 
            imageUrl="https://static.vecteezy.com/system/resources/previews/022/149/130/non_2x/cute-white-paw-in-pixel-art-style-vector.jpg" 
            title="sodfjsoifdj sdfsdofn" 
            description="sdofu souvndbd ovdo dso di dfih ix ix ix ix vi vsi vis visbv hidvhdlh." 
          />
                  <ClubEvent 
            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/190326162345-lead-justin-bieber-crop.jpg?q=w_3000,c_fill" 
            title="sodfjsoifdj sdfsdofn" 
            description="sdofu souvndbd ovdo dso di dfih ix ix ix ix vi vsi vis visbv hidvhdlh." 
          />
        </div>

        <div className="col-span-1">
          <ClubForm />
        </div>
      </div>
      <div className="p-8 flex gap-4">
        <div className="w-1/2">
          <FAQAccordion />
        </div>
        <div className="w-1/2">
          <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
        </div>
      </div>


    </div>
  );
}

export default TestPage;
