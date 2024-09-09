import Shadow from "./Shadow";

const GradientBackground = () => {
  const isMobile = window.innerWidth <= 768;

  const mobileScale = (value) => `${parseInt(value) % 175}px`;

  return (
    <>
      <Shadow
        className="shadow-primary"
        background="var(--secondary)"
        borderRadius={isMobile ? mobileScale("24px") : "24px"}
        rotate="29deg"
        width={isMobile ? mobileScale("200px") : "200px"}
        height={isMobile ? mobileScale("400px") : "400px"}
        left={isMobile ? mobileScale("250px") : "250px"}
        top={isMobile ? mobileScale("150px") : "150px"}
        filter="blur(150px)"
        animationName="shadow-slide-primary"
      />
      <Shadow
        className="shadow-secondary"
        background="var(--primary)"
        borderRadius={isMobile ? mobileScale("24px") : "24px"}
        rotate="93deg"
        width={isMobile ? mobileScale("100px") : "100px"}
        height={isMobile ? mobileScale("300px") : "300px"}
        right={isMobile ? mobileScale("0px") : "0px"}
        top={isMobile ? mobileScale("1px") : "1px"}
        filter="blur(100px)"
        animationName="shadow-slide-secondary"
      />
    </>
  );
};

export default GradientBackground;
