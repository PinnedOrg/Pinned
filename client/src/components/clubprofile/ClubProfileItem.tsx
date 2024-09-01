const ClubProfileItem = ({ number, title, description }) => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
          {number}
        </div>
        <h4 className="ml-4 text-xl font-semibold">{title}</h4>
      </div>
      <p>{description}</p>
    </div>
  );
};

  
  export default ClubProfileItem;
  