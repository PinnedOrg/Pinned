import ClubProfileItem from './ClubProfileItem';

const ClubProfileItemizedDescription = ({ hasScrolledFacts }) => {
  const items = [
    {
      number: '1',
      title: 'Game Change 2025',
      description: 'The 2020–2025 Strategic Plan of the National Society of Black Engineers (NSBE), reshapes the work of the Society’s mission to enable greater success in the coming era of social and economic transformation.',
    },
    {
      number: '2',
      title: 'We Shall Not Be Moved',
      description: 'Our community has experienced too many injustices that have been promoted by systemic racism and institutionalized oppression.',
    },
    {
      number: '3',
      title: 'Give Today',
      description: 'Even during this difficult time, NSBE is working hard to support our 20,000+ members.',
    },
    {
      number: '4',
      title: 'Become a Partner',
      description: 'Join us and take your seat at a table of forward-thinking organizations.',
    },
    {
      number: '5',
      title: 'Origins',
      description: 'In 1971, two Purdue undergraduates, Edward Barnette and Fred Cooper founded the Black Society of Engineers (BSE) with faculty advisor Arthur J. Bond.',
    },
    {
      number: '6',
      title: 'Facts',
      description: 'NSBE has more than 30,000 members worldwide, 18 regional conferences, an annual international conference, an annual national convention, and offers multiple scholarships.',
    },
  ];

  return (
    <div
      className={`relative z-10 -top-16 flex flex-col items-center justify-center mt-24 px-6 w-full max-w-6xl mx-auto transition-opacity duration-1000 ${
        hasScrolledFacts ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-3xl font-bold text-white mb-8 text-left w-full">What We Do</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        {items.map((item) => (
          <ClubProfileItem
            key={item.number}
            number={item.number}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ClubProfileItemizedDescription;
