const About = () => {
return (
    <section id="about" className="container pt-0 pb-24 sm:py-32"
    >
      <div className="py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          {/* <img
            src="/images/logos/PinnedAppLogo.png"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          /> */}
          <div className="flex flex-col justify-between bg-green-0">
            <div className="pb-6">
              <h2 className="text-3xl font-bold text-center md:text-4xl">
                About Pinned
              </h2>
              <p className="mt-4 text-xl text-center text-muted-foreground">
              Pinned is the platform where students can find out about and get involved with new clubs and groups across campus (UwFlow but for clubs). Clubs can advertise themselves and interested members will be able to connect directly and get informed on all upcoming events in the club
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
