const ClubProfileAboutUs = ({ hasScrolledAboutUs }) => {
  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center -mt-16 lg:mt-24 px-4 lg:px-6 w-full max-w-3xl mx-auto transition-opacity duration-1000 ${
        hasScrolledAboutUs ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-lg font-large text-purple-500 dark:text-purple-400">ABOUT US</h3>
      <p className="mt-4 text-center text-lg text-gray-800 dark:text-gray-200">
        The National Society of Black Engineers (NSBE) is a society that was founded in 1975 at Purdue University, located in West Lafayette, Indiana. It is one of the largest student-run organizations in the United States, with core activities centered on improving the recruitment and retention of Black and other minority engineers in both academia and industry.
      </p>
      <button className="mt-6 w-48 px-6 py-2 border border-purple-500 text-purple-500 dark:border-white dark:text-white font-semibold rounded-full hover:bg-purple-500 hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300">
        Join Us
      </button>
    </div>
  );
};

export default ClubProfileAboutUs;