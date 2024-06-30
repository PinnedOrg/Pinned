import { useEffect, useState } from 'react';

const ClubProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledAboutUs, setHasScrolledAboutUs] = useState(false);
  const [hasScrolledPhotos, setHasScrolledPhotos] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setHasScrolledAboutUs(true);
      }
      if (scrollPosition > 600) {
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
        <div className="shadow-blue"></div>
        <div className="shadow-purple"></div>
        <div className="shadow-blue-2"></div>
        <div className="shadow-purple-2"></div>
        <div className="shadow-blue-3"></div>
        <div className="shadow-purple-3"></div>

        <div
          className={`relative -top-16 left-64 z-10 flex flex-col justify-center p-6 w-1/2 transition-transform duration-1000 ${
            isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <h1 className="text-lg font-medium">WELCOME TO OUR CLUB</h1>
          <h2 className="mt-2 text-7xl font-extrabold">JOIN THE NSBE</h2>
          <p className="mt-6 text-lg max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo adipiscing faucibus nunc amet convallis posuere diam nulla. Pellentesque vulputate dui posuere orci tellus dolor, semper convallis sed.
          </p>
          <button className="mt-6 w-48 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">
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

      <div
        className={`relative z-10 flex flex-col -top-32 items-center justify-center mt-24 px-6 w-full max-w-3xl mx-auto transition-opacity duration-1000 ${
          hasScrolledAboutUs ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-lg font-large text-purple-500">ABOUT US</h3>
        <p className="mt-4 text-center text-lg">
          The National Society of Black Engineers (NSBE) is a society that was founded in 1975 at Purdue University, located in West Lafayette, Indiana. It is one of the largest student-run organizations in the United States, with core activities centered on improving the recruitment and retention of Black and other minority engineers in both academia and industry.
        </p>
        <button className="mt-6 w-48 px-6 py-2 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300">
          Join Us
        </button>
      </div>

      <div
        className={`relative z-10 -top-16 flex flex-col items-center justify-center mt-24 px-6 w-full max-w-6xl mx-auto transition-opacity duration-1000 ${
          hasScrolledPhotos ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-3xl font-bold text-white mb-8 text-left w-full">Photos of Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/250"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/250"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/250"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/250"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
