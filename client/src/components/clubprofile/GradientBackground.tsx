import Shadow from "./Shadow";

const GradientBackground = () => {
  return (
    <>
      <Shadow
        className="shadow-primary"
        background="var(--secondary)"
        borderRadius="24px"
        rotate="29deg"
        width="200px"
        height="400px"
        left="250px"
        top="150px"
        filter="blur(150px)"
        animationName="shadow-slide-primary"
      />
      <Shadow
        className="shadow-secondary"
        background="var(--primary)"
        borderRadius="24px"
        rotate="93deg"
        width="100px"
        height="300px"
        right="0px"
        top="1px"
        filter="blur(100px)"
        animationName="shadow-slide-secondary"
      />
    </>
  );
};

export default GradientBackground;
