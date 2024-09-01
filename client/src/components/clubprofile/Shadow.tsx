const Shadow = ({
    className,
    background,
    borderRadius,
    rotate,
    width,
    height,
    left,
    right,
    top,
    filter,
    animationName,
  }) => {
    const style = {
      background,
      borderRadius,
      rotate,
      width,
      height,
      left,
      right,
      top,
      filter,
      animation: `${animationName} infinite 4s linear alternate`,
    };
  
    return <div className={`absolute ${className}`} style={style}></div>;
  };
  
  export default Shadow;
  