import ClubProfileItem from './ClubProfileItem';

type ClubProfileItemizedDescriptionProps = {
  clubData: IClub,
  hasScrolledFacts: boolean
}

const ClubProfileItemizedDescription = ({ hasScrolledFacts, clubData }: ClubProfileItemizedDescriptionProps) => {
  return (
    <>
    {(clubData.facts.length != 0) && <div
      className={`relative z-10 -top-16 flex flex-col items-center justify-center mt-24 px-6 w-full max-w-6xl mx-auto transition-opacity duration-1000 ${
        hasScrolledFacts ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-3xl font-bold text-white mb-8 text-left w-full">What We Do</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        {clubData.facts.map((item, index) => (
          <ClubProfileItem
            key={index}
            number={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>}
    </>
  );
};

export default ClubProfileItemizedDescription;
