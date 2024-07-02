const ClubProfileItemizedDescription = ({ hasScrolledFacts }) => {
    return (
      <div
        className={`relative z-10 -top-16 flex flex-col items-center justify-center mt-24 px-6 w-full max-w-6xl mx-auto transition-opacity duration-1000 ${
          hasScrolledFacts ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-3xl font-bold text-white mb-8 text-left w-full">What We Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          <div className="p-6 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">1</div>
              <h4 className="ml-4 text-xl font-semibold">Game Change 2025</h4>
            </div>
            <p>The 2020–2025 Strategic Plan of the National Society of Black Engineers (NSBE), reshapes the work of the Society’s mission to enable greater success in the coming era of social and economic transformation.</p>
          </div>
          <div className="p-6 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">2</div>
              <h4 className="ml-4 text-xl font-semibold">We Shall Not Be Moved</h4>
            </div>
            <p>Our community has experienced too many injustices that have been promoted by systemic racism and institutionalized oppression.</p>
          </div>
          <div className="p-6 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">3</div>
              <h4 className="ml-4 text-xl font-semibold">Give Today</h4>
            </div>
            <p>Even during this difficult time, NSBE is working hard to support our 20,000+ members.</p>
          </div>
          <div className="p-6 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">4</div>
              <h4 className="ml-4 text-xl font-semibold">Become a Partner</h4>
            </div>
            <p>Join us and take your seat at a table of forward-thinking organizations.</p>
          </div>
          <div className="p-6 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">5</div>
              <h4 className="ml-4 text-xl font-semibold">Origins</h4>
            </div>
            <p>In 1971, two Purdue undergraduates, Edward Barnette and Fred Cooper founded the Black Society of Engineers (BSE) with faculty advisor Arthur J. Bond.</p>
          </div>
          <div className="p-6 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">6</div>
              <h4 className="ml-4 text-xl font-semibold">Facts</h4>
            </div>
            <p>NSBE has more than 30,000 members worldwide, 18 regional conferences, an annual international conference, an annual national convention, and offers multiple scholarships.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ClubProfileItemizedDescription;
  