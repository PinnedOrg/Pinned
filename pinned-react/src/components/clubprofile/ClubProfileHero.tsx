import { useEffect, useState } from 'react';

const ClubProfileHero = ({ clubData }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
    return (
      <>
        <div
          className={`relative -top-16 left-64 z-10 flex flex-col justify-center p-6 w-1/2 transition-transform duration-1000 ${
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
          </>

    );
  };
  
  export default ClubProfileHero;
  