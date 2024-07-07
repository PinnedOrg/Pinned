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
    <div className="overflow-hidden">
      <div className="relative min-h-screen text-white dark:text-white flex items-center">
        <GradientBackground />
        <ClubProfileHero isVisible={isVisible} />
      </div>
      <ClubProfileAboutUs hasScrolledAboutUs={hasScrolledAboutUs} />
      <ClubProfileItemizedDescription hasScrolledFacts={hasScrolledFacts} />
      <ClubProfilePhotos hasScrolledPhotos={hasScrolledPhotos} />
    </div>
  );
};

export default ClubProfile;