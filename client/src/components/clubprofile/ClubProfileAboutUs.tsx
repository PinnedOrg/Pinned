import { IClub } from "@/lib/types";

type ClubProfileAboutUsProps = {
  clubData: IClub,
  hasScrolledAboutUs: boolean
}

const ClubProfileAboutUs = ({ hasScrolledAboutUs, clubData }: ClubProfileAboutUsProps) => {
  return (
    <div
      className={`relative z-10 flex flex-col -top-32 items-center justify-center mt-24 px-6 w-full max-w-3xl mx-auto transition-opacity duration-1000 ${
        hasScrolledAboutUs ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-lg font-large text-purple-600 dark:text-purple-400">ABOUT US</h3>
      <p className="mt-4 text-center text-lg">
        {clubData.description}
      </p>
      {clubData.apply_link && <button className="mt-6 w-48 px-6 py-2 border border-purple-600 dark:border-white text-purple-600 dark:text-white font-semibold rounded-full hover:bg-purple-600 hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300">
        <a href={clubData.apply_link}>Join Us</a>
      </button>}
    </div>
  );
};
  
  export default ClubProfileAboutUs;
  