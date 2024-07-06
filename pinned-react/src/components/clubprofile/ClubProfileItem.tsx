const ClubProfileItem = ({ number, title, description }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
          {number}
        </div>
        <h4 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">{title}</h4>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default ClubProfileItem;