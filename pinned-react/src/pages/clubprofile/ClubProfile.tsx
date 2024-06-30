
const ClubProfile = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background Shadows */}
      <div className="absolute inset-0 z-0 shadow-blue"></div>
      <div className="absolute inset-0 z-0 shadow-purple"></div>
      <div className="absolute inset-0 z-0 shadow-blue-2"></div>
      <div className="absolute inset-0 z-0 shadow-purple-2"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-4xl font-bold">WELCOME TO THE PARTY</h1>
        <h2 className="mt-4 text-6xl font-extrabold">
          JOIN THE CLUB
        </h2>
        <p className="mt-6 text-lg text-center max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo adipiscing faucibus nunc amet convallis posuere diam nulla. Pellentesque vulputate dui posuere orci tellus dolor, semper convallis sed.
        </p>
        <button className="mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">Get in Touch</button>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">FB</a>
          <a href="#" className="text-gray-400 hover:text-white">INST</a>
          <a href="#" className="text-gray-400 hover:text-white">TW</a>
        </div>
      </div>

      {/* Image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3">
        <img src="https://images.pexels.com/photos/7658616/pexels-photo-7658616.jpeg?cs=srgb&dl=pexels-ekaterina-bolovtsova-7658616.jpg&fm=jpg" alt="Club" className="w-full h-full object-cover"/>
      </div>
    </div>
  );
}

export default ClubProfile;
