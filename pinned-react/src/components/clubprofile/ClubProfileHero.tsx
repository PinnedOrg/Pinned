
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full px-6 lg:px-16 pt-8 lg:pt-0 lg:min-h-screen">
      <div
        className={`w-full lg:w-1/2 mb-8 lg:mb-0 transition-transform duration-1000 pl-4 -mt-32 lg:-mt-16 pt-4 lg:pl-64 ${
          isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}
        >
          <h1 className="text-lg font-medium">WELCOME TO OUR CLUB</h1>
          <h2 className="mt-2 text-7xl font-extrabold">{clubData.name}</h2>
          <p className="mt-6 text-lg max-w-md">
            {clubData.overview}
          </p>
          {clubData.apply_link && <button className="mt-6 w-48 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">
            <a href={clubData.apply_link}>Join Here</a>
          </button>}
          <div className="mt-4 flex space-x-4">
            {clubData.facebook && <a href={clubData.facebook} className="text-gray-400 hover:text-white">
              FB
            </a>}
            {clubData.instagram && <a href={clubData.instagram} className="text-gray-400 hover:text-white">
              IG
            </a>}
            {clubData.discord && <a href={clubData.discord} className="text-gray-400 hover:text-white">
              DC
            </a>}
          </div>
          </div>
              <div
              className={`absolute right-48 -top-16 bottom-0 w-1/3 flex items-center justify-center transition-transform duration-1000 ${
                isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
              }`}
            >
              <img
                src="https://images.pexels.com/photos/7658616/pexels-photo-7658616.jpeg?cs=srgb&dl=pexels-ekaterina-bolovtsova-7658616.jpg&fm=jpg"
                alt="Club"
                className="w-2/3 h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
        </div>
  );
};

export default ClubProfileHero;