import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import GradientBackground from '@/components/clubprofile/GradientBackground';
import ClubProfileHero from '@/components/clubprofile/ClubProfileHero';
import ClubProfileAboutUs from '@/components/clubprofile/ClubProfileAboutUs';
import ClubProfileItemizedDescription from '@/components/clubprofile/ClubProfileItemizedDescription';
import ClubProfilePhotos from '@/components/clubprofile/ClubProfilePhotos';
import ClubDoesNotExistErrorMessage from '@/components/error/ClubDoesNotExistErrorMessage';

const ClubProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledAboutUs, setHasScrolledAboutUs] = useState(false);
  const [hasScrolledFacts, setHasScrolledFacts] = useState(false);
  const [hasScrolledPhotos, setHasScrolledPhotos] = useState(false);
  const [clubData, setClubData] = useState();

  const { clubId } = useParams()

  async function getClubData( clubId ) {
    const data = await axios.get(`http://localhost:8080/api/clubs/${clubId}`);
    setClubData(data.data);
  }

  useEffect(() => {
    getClubData(clubId);
  }, [])

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
    <>
    {clubData ? 
    (<div>
      <div className="relative min-h-screen text-white flex items-center">
        <GradientBackground />
        <ClubProfileHero isVisible={isVisible} clubData={clubData}/>
      </div>
      <ClubProfileAboutUs hasScrolledAboutUs={hasScrolledAboutUs} clubData={clubData}/>
      <ClubProfileItemizedDescription hasScrolledFacts={hasScrolledFacts} clubData={clubData}/>
      <ClubProfilePhotos hasScrolledPhotos={hasScrolledPhotos} clubData={clubData}/>
    </div>)
    : 
    (
      <ClubDoesNotExistErrorMessage />
    )}
    </>
  );
};

export default ClubProfile;
