import { useEffect, useState } from 'react';
import GradientBackground from '@/components/clubprofile/GradientBackground';
import ClubProfileHero from '@/components/clubprofile/ClubProfileHero';
import ClubProfileAboutUs from '@/components/clubprofile/ClubProfileAboutUs';
import ClubProfileItemizedDescription from '@/components/clubprofile/ClubProfileItemizedDescription';
import ClubProfilePhotos from '@/components/clubprofile/ClubProfilePhotos';

const ClubProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledAboutUs, setHasScrolledAboutUs] = useState(false);
  const [hasScrolledFacts, setHasScrolledFacts] = useState(false);
  const [hasScrolledPhotos, setHasScrolledPhotos] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setHasScrolledAboutUs(true);
      }
      if (scrollPosition > 650) {
        setHasScrolledFacts(true);
      }
      if (scrollPosition > 1200) {
        setHasScrolledPhotos(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      <div className="relative min-h-screen text-white flex items-center">
        <GradientBackground />
        <ClubProfileHero isVisible={isVisible} />
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
      <ClubProfileAboutUs hasScrolledAboutUs={hasScrolledAboutUs} />
      <ClubProfileItemizedDescription hasScrolledFacts={hasScrolledFacts} />
      <ClubProfilePhotos hasScrolledPhotos={hasScrolledPhotos} />
    </div>
  );
};

export default ClubProfile;
