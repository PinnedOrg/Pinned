const ClubProfileHero = ({ isVisible }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full px-6 lg:px-16 pt-8 lg:pt-0 lg:min-h-screen">
      <div
        className={`w-full lg:w-1/2 mb-8 lg:mb-0 transition-transform duration-1000 ${
          isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}
      >
        <h1 className="text-lg font-medium">WELCOME TO OUR CLUB</h1>
        <h2 className="mt-2 text-5xl lg:text-7xl font-extrabold">JOIN THE NSBE</h2>
        <p className="mt-6 text-lg max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo adipiscing faucibus nunc amet convallis posuere diam nulla. Pellentesque vulputate dui posuere orci tellus dolor, semper convallis sed.
        </p>
        <button className="mt-6 w-48 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">
          Join Here
        </button>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            FB
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            IG
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            TW
          </a>
        </div>
      </div>
      <div
        className={`w-full lg:w-1/2 flex items-center justify-center lg:justify-end transition-transform duration-1000 py-12 lg:py-0 ${
          isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
      >
        <div className="lg:py-[50px]">
          <img
            src="https://images.pexels.com/photos/7658616/pexels-photo-7658616.jpeg?cs=srgb&dl=pexels-ekaterina-bolovtsova-7658616.jpg&fm=jpg"
            alt="Club"
            className="w-full lg:w-3/4 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ClubProfileHero;