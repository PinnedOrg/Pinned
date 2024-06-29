const About = () => {
return (
    <section id="about" className="container pb-10 "
    >
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
              <p className="mt-4 text-base text-center md:text-xl lg:px-20 text-muted-foreground">
                At Pinned, our mission is to empower students by connecting them with the vibrant campus community at UWaterloo. We want to help you build meaningful connections and enrich your university experience. We enable clubs, teams, and other student groups to create personalized profiles showcasing their upcoming events, activities, and highlights, making it easier for interested members to discover and engage. Our goal is to foster a thriving student community by putting the control in the hands of the clubs, enabling them to manage their presence and expand their communities’ further. 
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default About;