const ClubProfileHero = ({ isVisible }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full px-6 lg:px-16 pt-8 lg:pt-0 lg:min-h-screen">
      <div
        className={`w-full lg:w-1/2 mb-8 lg:mb-0 transition-transform duration-1000 pl-4 -mt-32 lg:-mt-16 pt-4 lg:pl-64 ${
          isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}

      >
        <h1 className="text-lg font-medium text-gray-700 dark:text-gray-300">WELCOME TO OUR CLUB</h1>
        <h2 className="mt-2 text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white">JOIN THE NSBE</h2>
        <p className="mt-6 text-lg max-w-md text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo adipiscing faucibus nunc amet convallis posuere diam nulla. Pellentesque vulputate dui posuere orci tellus dolor, semper convallis sed.
        </p>
        <button className="mt-6 w-48 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">
          Join Here
        </button>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
            FB
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
            IG
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
            TW
          </a>
        </div>
      </div>
      <div
        className={`w-full lg:w-1/2 flex items-center justify-center lg:justify-end transition-transform duration-1000 ${
          isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/7658616/pexels-photo-7658616.jpeg?cs=srgb&dl=pexels-ekaterina-bolovtsova-7658616.jpg&fm=jpg"
            alt="Club"
            className="w-auto h-auto max-w-[55%] sm:max-h-[65vh] md:max-h-[70vh] lg:max-h-[75vh] xl:max-h-[80vh] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ClubProfileHero;