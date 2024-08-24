import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

import { IClub } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IKContext, IKImage } from "imagekitio-react";
import { imagekitEndpoints } from "@/lib/data";

type ClubProfileHeroProps = {
  clubData: IClub
}

const ClubProfileHero = ({ clubData }: ClubProfileHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const hasLogo = clubData.logo !== null;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden -mt-24">
      <div className={`flex flex-col lg:flex-row justify-between items-center px-4 lg:px-64 transition-transform duration-1000 ${
        isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
      }`}>
        <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center p-6 order-2 lg:order-1">
          <h1 className="text-lg font-medium text-purple-600 dark:text-purple-400">WELCOME TO OUR CLUB</h1>
          <h2 className="mt-2 text-4xl lg:text-7xl font-bold text-gray-900 dark:text-white">{clubData.name}</h2>
          <div className="mt-4 flex space-x-4">
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
          <p className="mt-6 text-base lg:text-lg max-w-md text-gray-700 dark:text-gray-300">
            {clubData.description}
          </p>
        </div>
        <div className={`w-full lg:w-1/3 flex items-center justify-center rounded-lg mt-8 lg:mt-0 order-1 lg:order-2 transition-transform duration-1000 ${
          isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}>
          {hasLogo ? (
                <IKContext urlEndpoint={imagekitEndpoints['club']} publicKey={import.meta.env.IMAGEKIT_PUBLIC_KEY}>
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
    </div>
  );
};

export default ClubProfileHero;
