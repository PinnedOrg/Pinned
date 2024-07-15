import { IClub } from '@/lib/types';
import { useEffect, useState } from 'react';

type ClubProfileHeroProps = {
  clubData: IClub
}

const ClubProfileHero = ({ clubData }: ClubProfileHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className={`flex flex-col lg:flex-row justify-between items-center px-4 lg:px-64 transition-transform duration-1000 ${
        isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
      }`}>
        <div className="w-full lg:w-1/2 lg:-top-16 lg:left-64 z-10 flex flex-col justify-center p-6 order-2 lg:order-1">
          <h1 className="text-lg font-medium">WELCOME TO OUR CLUB</h1>
          <h2 className="mt-2 text-4xl lg:text-7xl font-extrabold">{clubData.name}</h2>
          <p className="mt-6 text-base lg:text-lg max-w-md">
            {clubData.overview}
          </p>
          {clubData.apply_link && (
            <button className="mt-6 w-48 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">
              <a href={clubData.apply_link}>Join Here</a>
            </button>
          )}
          <div className="mt-4 flex space-x-4">
            {clubData.facebook && (
              <a href={clubData.facebook} className="text-gray-400 hover:text-white">
                FB
              </a>
            )}
            {clubData.instagram && (
              <a href={clubData.instagram} className="text-gray-400 hover:text-white">
                IG
              </a>
            )}
            {clubData.discord && (
              <a href={clubData.discord} className="text-gray-400 hover:text-white">
                DC
              </a>
            )}
          </div>
        </div>
        <div className={`w-full lg:w-1/3 lg:absolute lg:right-48 lg:-top-16 lg:bottom-0 flex items-center justify-center mt-8 lg:mt-0 order-1 lg:order-2 transition-transform duration-1000 ${
          isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}>
          <img
            src="https://as2.ftcdn.net/v2/jpg/05/21/15/83/1000_F_521158350_czdCbzL74T78pgPhT7pT4KnDBkldoHvy.jpg"
            alt="Club"
            className="w-2/3 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ClubProfileHero;
