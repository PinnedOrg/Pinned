import ClubProfilePhoto from './ClubProfilePhoto';

const ClubProfilePhotos = ({ hasScrolledPhotos }) => {
  const photos = [
    "https://mnemosyne.umd.edu/tomcat/newsengine/articleImg/article14730.large.png",
    "https://as1.ftcdn.net/v2/jpg/02/43/99/86/1000_F_243998653_CZRjwKqNwXpz2nSgz7kVZihJGliWk3Km.jpg",
    "https://img.freepik.com/premium-photo/abstract-world-blockchain-technology-cryptocurrency-fintech-square-cubes-dark-theme_5095-1261.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHLpBi-joogqMBRQmATcRIK074NY9SbwGiCw&s",
  ];

  return (
    <div
      className={`relative z-10 -top-4 flex flex-col items-center justify-center mt-24 px-6 w-full max-w-6xl mx-auto transition-opacity duration-1000 ${
        hasScrolledPhotos ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-3xl font-bold text-white mb-8 text-left w-full">Photos of Us</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {photos.map((src, index) => (
          <ClubProfilePhoto key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

export default ClubProfilePhotos;
