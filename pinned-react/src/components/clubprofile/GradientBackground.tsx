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
        filter="blur(150px)"
        animationName="shadow-slide-blue"
      />

    </>
  );
};

export default GradientBackground;
