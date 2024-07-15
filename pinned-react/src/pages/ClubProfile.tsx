import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import GradientBackground from '@/components/clubprofile/GradientBackground';
import ClubProfileHero from '@/components/clubprofile/ClubProfileHero';
import ClubProfileAboutUs from '@/components/clubprofile/ClubProfileAboutUs';
import ClubProfileItemizedDescription from '@/components/clubprofile/ClubProfileItemizedDescription';
import ClubProfilePhotos from '@/components/clubprofile/ClubProfilePhotos';
import ClubDoesNotExistErrorMessage from '@/components/error/ClubDoesNotExistErrorMessage';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ClubErrorMessage from "@/components/error/ClubErrorMessage";

const ClubProfile = () => {
  const [hasScrolledAboutUs, setHasScrolledAboutUs] = useState(false);
  const [hasScrolledFacts, setHasScrolledFacts] = useState(false);
  const [hasScrolledPhotos, setHasScrolledPhotos] = useState(false);

  const { clubId } = useParams()

  const fetchClubData = ( clubId: string ) => {
    return axiosInstance.get(`http://localhost:8080/api/clubs/${clubId}`);
  }

  const {isFetching, isError, data } = useQuery({
    queryKey: ["Club"], // query refreshes when this value changes
    queryFn: () => fetchClubData( clubId ),
    refetchOnWindowFocus: false,
  });

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

  const clubData = data?.data;
  console.log(clubData);
  return (
    <>
    {isFetching ? 
      (<LoadingSpinner />)
      :
      (isError ? 
        <ClubErrorMessage /> 
        :
        (clubData ? 
        (<div className="overflow-hidden">
          <div className="relative min-h-screen text-white dark:text-white flex items-center">
            <GradientBackground />
            <ClubProfileHero clubData={clubData}/>
          </div>
          <ClubProfileAboutUs hasScrolledAboutUs={hasScrolledAboutUs} clubData={clubData}/>
          <ClubProfileItemizedDescription hasScrolledFacts={hasScrolledFacts} clubData={clubData}/>
          <ClubProfilePhotos hasScrolledPhotos={hasScrolledPhotos} clubData={clubData}/>
        </div>)
        : 
        (
          <ClubDoesNotExistErrorMessage />
        ))
      )
    }
    </>
  );
};

export default ClubProfile;