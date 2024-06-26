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
          <div className="flex flex-col justify-between w-full bg-green-0">
            <div className="pb-6">
              <h2 className="text-3xl font-bold text-center md:text-4xl">
                About Pinned
              </h2>
              <p className="mt-4 text-xl text-center lg:px-10 text-muted-foreground">
                skdafhkalhdfkl 
                
                Whether you're looking to 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;