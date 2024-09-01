const ClubProfilePhoto = ({ src }) => {
    return (
      <div className="flex flex-col items-center">
        <img
          src={src}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          alt="Club"
        />
      </div>
    );
  };
  
  export default ClubProfilePhoto;
  