import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

import { IClub } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IKContext, IKImage } from "imagekitio-react";
import { imagekitEndpoints } from "@/lib/data";
import StarRating from "@/components/shared/StarRating";
import { Label } from "../ui/label";

type ClubProfileHeroProps = {
  clubData: IClub
}

const ClubProfileHero = ({ clubData }: ClubProfileHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const hasLogo = clubData.logo !== null;
  const averageEngagement = clubData.reviews.reduce((acc, review) => acc + review.engagement, 0) / (clubData.reviews.length || 1);
  const averageCommitment = clubData.reviews.reduce((acc, review) => acc + review.commitment, 0) / (clubData.reviews.length || 1);
  const averageInclusivity = clubData.reviews.reduce((acc, review) => acc + review.inclusivity, 0) / (clubData.reviews.length || 1);
  const averageOrganization = clubData.reviews.reduce((acc, review) => acc + review.organization, 0) / (clubData.reviews.length || 1);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full mt-20 overflow-hidden h-max">
      <div 
      className="flex flex-col items-start justify-center lg:flex-row "
      // className={`flex flex-col lg:flex-row justify-center items-start transition-transform duration-1000 ${
      //   isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
      // }`}
      >
        <div className="z-10 flex flex-col justify-center order-2 w-full p-6 lg:w-1/2 lg:order-1 animate-fade-in-up">
          <h1 className="text-lg font-medium text-purple-600 dark:text-purple-400">WELCOME TO OUR CLUB</h1>
          <h2 className="mt-2 text-4xl font-bold text-gray-900 lg:text-7xl dark:text-white">{clubData.name}</h2>
          <div className="flex my-4 space-x-4">
            {clubData.instagram && (
              <Link target="blank" to={clubData.instagram} className="text-2xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white">
                <FaInstagram />
              </Link>
            )}
            {clubData.discord && (
              <Link target="blank" to={clubData.discord} className="text-2xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white">
                <FaDiscord />
              </Link>
            )}
            {clubData.email && (
              <Link target="blank" to={`mailto:${clubData.email}`} className="text-2xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white">
                <MdOutlineMailOutline />
              </Link>
            )}
            {clubData.facebook && (
              <Link target="blank" to={clubData.facebook} className="text-2xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white">
                <FaFacebook />
              </Link>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Label htmlFor="engagement" className="text-accent-foreground">Engagement</Label>
            <Label htmlFor="commitment" className="text-accent-foreground">Commitment</Label>
            <StarRating rating={averageEngagement} id="engagement" />
            <StarRating rating={averageCommitment} id="commitment" />
            <Label htmlFor="inclusivity" className="text-accent-foreground">Inclusivity</Label>
            <Label htmlFor="organization" className="text-accent-foreground">Organization</Label>
            <StarRating rating={averageInclusivity} id="inclusivity" />
            <StarRating rating={averageOrganization} id="organization" />
          </div>
        </div>
        <div 
        className="flex items-center justify-center order-1 w-full mt-8 transition-transform duration-1000 rounded-lg lg:w-1/3 lg:mt-0 lg:order-2 animate-fade-in-scale"
        // className={`w-full lg:w-1/3 flex items-center justify-center rounded-lg mt-8 lg:mt-0 order-1 lg:order-2 transition-transform duration-1000 ${
        //   isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
        // }`}
        >
          {hasLogo ? (
                <IKContext urlEndpoint={imagekitEndpoints['club']} publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}>
                  <IKImage 
                    src={clubData.logo.url}
                    alt={""} 
                    loading="lazy" 
                    lqip={{ active:true, quality:20 }} 
                    className='overflow-hidden rounded-2xl max-w-[15rem] h-auto object-cover'
                  />
                </IKContext>
              ) : (
                <img src="/images/logos/LogoPlaceholder.png" alt="placeholder" className='aspect-square rounded-2xl max-w-[15rem] h-auto'/>
              )}
        </div>
      </div>
      <div className="mx-20">
        <p className="mt-6 text-base text-gray-700 text-wrap lg:text-lg dark:text-gray-300 animate-fade-in-up ">
          {clubData.description}
        </p>
      </div>
    </div>
  );
};

export default ClubProfileHero;
