import React, { useEffect, useState } from 'react'

type ViewportWrapperProps = {
    children: React.ReactNode;
    breakpoint: "large" | "mobile";
}

const viewportThreshold = 640;

const ViewportWrapper = ({ children, breakpoint }: ViewportWrapperProps) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth); // Update window width when the window is resized
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    if ((breakpoint === 'large' && windowWidth > viewportThreshold) || (breakpoint === 'mobile' && windowWidth <= viewportThreshold)) {
      return (
        <>{children}</>
      )
    } else {
      return null;
    }
}


export default ViewportWrapper;
