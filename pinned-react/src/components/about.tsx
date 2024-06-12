export const About = () => {
  return (
    <section
      id="about"
      className="container pt-0 pb-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="src/components/shared/images/PinnedAppLogo.png"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Pinned
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              Pinned is the platform where students can find out about and get involved with new clubs and groups across campus (UwFlow but for clubs). Clubs can advertise themselves and interested members will be able to connect directly and get informed on all upcoming events in the club
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};