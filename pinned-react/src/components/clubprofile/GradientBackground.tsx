import Shadow from "./Shadow";

const GradientBackground = () => {
  return (
    <>
      <Shadow
        className="shadow-blue"
        background="hsla(240, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="29deg"
        width="200px"
        height="500px"
        left="250px"
        top="150px"
        right=""
        filter="blur(150px)"
        animationName="shadow-slide-blue"
      />
      <Shadow
        className="shadow-purple"
        background="hsla(280, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="93deg"
        width="100px"
        height="300px"
        right="0px"
        top="1px"
        left=""
        filter="blur(100px)"
        animationName="shadow-slide-purple"
      />
      <Shadow
        className="shadow-blue-2"
        background="hsla(240, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="74deg"
        width="150px"
        height="500px"
        right="50px"
        top="800px"
        left=""
        filter="blur(150px)"
        animationName="shadow-slide-blue"
      />
      <Shadow
        className="shadow-purple-2"
        background="hsla(280, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="194deg"
        width="40px"
        height="300px"
        left="0px"
        top="800px"
        right=""
        filter="blur(100px)"
        animationName="shadow-slide-purple"
      />
      <Shadow
        className="shadow-blue-3"
        background="hsla(240, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="59deg"
        width="185px"
        height="419px"
        left="286px"
        top="1500px"
        right=""
        filter="blur(150px)"
        animationName="shadow-slide-blue"
      />
      <Shadow
        className="shadow-purple-3"
        background="hsla(280, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="16deg"
        width="119px"
        height="302px"
        right="0px"
        top="1700px"
        left=""
        filter="blur(100px)"
        animationName="shadow-slide-purple"
      />
      <Shadow
        className="shadow-blue-4"
        background="hsla(240, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="74deg"
        width="100px"
        height="300px"
        right="0px"
        top="2100px"
        left=""
        filter="blur(150px)"
        animationName="shadow-slide-blue"
      />
      <Shadow
        className="shadow-purple-4"
        background="hsla(280, 100%, 50%, 0%)"
        borderRadius="24px"
        rotate="13deg"
        width="40px"
        height="300px"
        left="500px"
        top="2200px"
        right=""
        filter="blur(100px)"
        animationName="shadow-slide-purple"
      />
    </>
  );
};

export default GradientBackground;
