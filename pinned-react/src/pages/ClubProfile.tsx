import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import GradientBackground from '@/components/clubprofile/GradientBackground';
import ClubProfileHero from '@/components/clubprofile/ClubProfileHero';
// import ClubProfileAboutUs from '@/components/clubprofile/ClubProfileAboutUs';
// import ClubProfileItemizedDescription from '@/components/clubprofile/ClubProfileItemizedDescription';
// import ClubProfilePhotos from '@/components/clubprofile/ClubProfilePhotos';
import ClubDoesNotExistErrorMessage from '@/components/error/ClubDoesNotExistErrorMessage';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ClubErrorMessage from "@/components/error/ClubErrorMessage";
import { FAQAccordion } from "@/components/clubprofile/FAQAccordion";
import ClubProfileReviews from "@/components/clubprofile/ClubProfileReviews";
const ClubProfile = () => {
  // const [hasScrolledAboutUs, setHasScrolledAboutUs] = useState(false);
  // const [hasScrolledFacts, setHasScrolledFacts] = useState(false);
  // const [hasScrolledPhotos, setHasScrolledPhotos] = useState(false);

  const { clubId } = useParams()

  const fetchClubData = ( clubId: string | undefined ) => {
    return axiosInstance.get(`/api/clubs/${clubId}`);
  }

  const {isFetching, isError, data } = useQuery({
    queryKey: ["Club"], // query refreshes when this value changes
    queryFn: () => fetchClubData( clubId ),
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   // const handleScroll = () => {
  //   //   const scrollPosition = window.scrollY;
  //   //   if (scrollPosition > 200) {
  //   //     setHasScrolledAboutUs(true);
  //   //   }
  //   //   if (scrollPosition > 650) {
  //   //     setHasScrolledFacts(true);
  //   //   }
  //   //   if (scrollPosition > 1200) {
  //   //     setHasScrolledPhotos(true);
  //   //   }
  //   // };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
          (<div className="container max-w-[80rem] space-y-48">
          <div className="relative text-white flex">
            <GradientBackground />
            <ClubProfileHero clubData={clubData}/>
          </div>
          <FAQAccordion />
          <ClubProfileReviews reviews={clubData.reviews} clubId={clubData._id}/>
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
